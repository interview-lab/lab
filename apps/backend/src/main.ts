import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from '@/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle('Interview lab API')
		.setDescription('인터뷰랩 API 문서')
		.setVersion('1.0')
		.addCookieAuth('accessToken')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		yamlDocumentUrl: 'api/yaml',
		jsonDocumentUrl: 'api/json',
	});

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
