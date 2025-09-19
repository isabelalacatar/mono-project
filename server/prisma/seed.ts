import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; 

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const hashed = await bcrypt.hash('Password123!', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      password: hashed,
      name: 'Admin User',
    },
  });

  await prisma.invoice.createMany({
    data: [
      { vendorName: 'Acme Inc', amount: 1200, dueDate: new Date(), description: 'Web services', paid: false, userId: user.id },
      { vendorName: 'Stationery Co', amount: 200, dueDate: new Date(), description: 'Office supplies', paid: true, userId: user.id },
    ],
    skipDuplicates: true,
  });

  console.log('Seed complete.');
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
