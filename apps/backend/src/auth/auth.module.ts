import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenGuard } from './guards/token.guard';

@Module({
	imports: [JwtModule.register({}), forwardRef(() => UsersModule)],
	controllers: [AuthController],
	providers: [AuthService, TokenGuard],
	exports: [AuthService, TokenGuard],
})
export class AuthModule {}
