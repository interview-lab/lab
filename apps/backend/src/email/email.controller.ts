import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	SendVerificationDto,
	VerificationResponseDto,
} from '@/email/dtos/email-verify.dto';
import { EmailService } from '@/email/email.service';

@Controller('email')
@ApiTags('이메일')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	/**
	 * 인증 이메일을 발송합니다.
	 */
	@Post('send-verification')
	@ApiOperation({
		summary: '인증 이메일 발송 API',
		description: '인증 이메일을 발송합니다.',
	})
	@ApiCreatedResponse({
		type: VerificationResponseDto,
	})
	async sendVerification(
		@Body() dto: SendVerificationDto,
	): Promise<VerificationResponseDto> {
		const prevVerification = await this.emailService.getVerificationInfo(
			dto.email,
		);

		const date = new Date();

		if (
			prevVerification &&
			prevVerification.expiresAt.getTime() > date.getTime()
		) {
			return {
				message: '이미 인증 이메일이 발송되었습니다.',
				remainingTime: Math.floor(
					(prevVerification.expiresAt.getTime() - date.getTime()) / 1000,
				),
			};
		}

		const newVerification = await this.emailService.sendVerificationEmail(
			dto.email,
		);
		return {
			message: '인증 이메일이 발송되었습니다.',
			remainingTime: Math.floor(
				(newVerification.expiresAt.getTime() - date.getTime()) / 1000,
			),
		};
	}
}
