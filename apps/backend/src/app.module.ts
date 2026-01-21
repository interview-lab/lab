import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import configuration from '@/config/configuration';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
		}),
		PrismaModule,
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
