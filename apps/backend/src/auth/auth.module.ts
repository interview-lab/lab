import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { GoogleOAuthGuard } from '@/auth/guards/google-oauth.guard';
import { TokenGuard } from '@/auth/guards/token.guard';
import { GoogleStrategy } from '@/auth/strategies/google.strategy';
import { EmailModule } from '@/email/email.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({}),
		PrismaModule,
		EmailModule,
		forwardRef(() => UsersModule),
	],
	controllers: [AuthController],
	providers: [AuthService, TokenGuard, GoogleStrategy, GoogleOAuthGuard],
	exports: [AuthService, TokenGuard],
})
export class AuthModule {}
