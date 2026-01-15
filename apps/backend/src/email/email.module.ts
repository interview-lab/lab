import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { EmailService } from './email.service';

@Module({
	imports: [PrismaModule],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
