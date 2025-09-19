import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET') || 'secretKey', 
    signOptions: { expiresIn: '1h' },
  }),
}),

  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
