import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '@/prisma/prisma.service';

/**
 * 이메일 발송 및 인증 관련 서비스
 *
 * @description 이메일 인증번호 발송, 검증, 인증 상태 확인 기능을 제공합니다.
 */
@Injectable()
export class EmailService {
	private transporter: nodemailer.Transporter;

	constructor(private readonly prisma: PrismaService) {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_APP_PASSWORD,
			},
		});
	}

	/**
	 * 6자리 인증번호를 생성합니다.
	 *
	 * @returns 6자리 숫자 문자열
	 */
	private generateVerificationCode(): string {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	/**
	 * 인증 이메일을 발송합니다.
	 *
	 * @param email - 인증 이메일을 받을 이메일 주소
	 * @throws 이메일 발송 실패 시 예외 발생
	 */
	async sendVerificationEmail(email: string): Promise<void> {
		// 기존 미인증 레코드 삭제
		await this.prisma.emailVerification.deleteMany({
			where: { email, verified: false },
		});

		const code = this.generateVerificationCode();
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분

		// DB에 저장
		await this.prisma.emailVerification.create({
			data: { email, code, expiresAt },
		});

		// 이메일 발송
		await this.transporter.sendMail({
			from: process.env.GMAIL_USER,
			to: email,
			subject: '[Interview Lab] 이메일 인증번호',
			html: this.getEmailTemplate(code),
		});
	}

	/**
	 * 인증번호를 검증합니다.
	 *
	 * @param email - 인증 요청한 이메일 주소
	 * @param code - 사용자가 입력한 인증번호
	 * @returns 인증 성공 시 true
	 * @throws {BadRequestException} 유효하지 않거나 만료된 인증 요청인 경우
	 * @throws {BadRequestException} 인증 시도 횟수 초과 시
	 * @throws {BadRequestException} 인증번호 불일치 시
	 */
	async verifyCode(email: string, code: string): Promise<boolean> {
		const verification = await this.prisma.emailVerification.findFirst({
			where: {
				email,
				verified: false,
				expiresAt: { gt: new Date() },
			},
			orderBy: { createdAt: 'desc' },
		});

		if (!verification) {
			throw new BadRequestException('유효하지 않거나 만료된 인증 요청입니다.');
		}

		if (verification.attempts >= 5) {
			throw new BadRequestException('인증 시도 횟수를 초과했습니다.');
		}

		if (verification.code !== code) {
			// 시도 횟수 증가
			await this.prisma.emailVerification.update({
				where: { id: verification.id },
				data: { attempts: verification.attempts + 1 },
			});
			throw new BadRequestException('인증번호가 일치하지 않습니다.');
		}

		// 인증 완료 처리
		await this.prisma.emailVerification.update({
			where: { id: verification.id },
			data: { verified: true },
		});

		return true;
	}

	/**
	 * 이메일 인증 완료 여부를 확인합니다.
	 *
	 * @param email - 확인할 이메일 주소
	 * @returns 인증 완료 시 true, 미완료 시 false
	 */
	async isEmailVerified(email: string): Promise<boolean> {
		const verification = await this.prisma.emailVerification.findFirst({
			where: {
				email,
				verified: true,
				// 인증 완료 후 30분 이내만 유효
				expiresAt: { gt: new Date(Date.now() - 30 * 60 * 1000) },
			},
		});
		return !!verification;
	}

	/**
	 * 인증 이메일 HTML 템플릿을 생성합니다.
	 *
	 * @param code - 인증번호
	 * @returns HTML 문자열
	 */
	private getEmailTemplate(code: string): string {
		return `
			<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
				<h2>이메일 인증</h2>
				<p>아래 인증번호를 입력해주세요.</p>
				<div style="font-size: 32px; font-weight: bold;
								background: #f5f5f5; padding: 20px;
								text-align: center; letter-spacing: 8px;">
					${code}
				</div>
				<p style="color: #666;">이 인증번호는 5분간 유효합니다.</p>
			</div>
		`;
	}
}
