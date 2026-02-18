import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from '@/users/users.module';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';

@Module({
	controllers: [InterviewController],
	providers: [InterviewService],
	imports: [PrismaModule, AuthModule, UsersModule],
})
export class InterviewModule {}
