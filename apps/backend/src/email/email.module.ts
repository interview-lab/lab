import { Module } from '@nestjs/common';
import { EmailController } from '@/email/email.controller';
import { EmailService } from '@/email/email.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [EmailController],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
