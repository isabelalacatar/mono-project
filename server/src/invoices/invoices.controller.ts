import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  // Get all invoices
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoicesService.findOne(id);
  }
}
