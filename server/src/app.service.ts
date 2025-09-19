import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';  // ✅ correct path
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
