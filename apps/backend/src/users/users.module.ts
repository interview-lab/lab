import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';

@Module({
	imports: [PrismaModule, forwardRef(() => AuthModule)],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
