import { BadRequestException, Injectable } from '@nestjs/common';
import AUTH_MESSAGE from '@/auth/consts/message.const';
import { AuthProvider, Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(
		data: Pick<
			Prisma.UserCreateInput,
			'email' | 'username' | 'password' | 'profileImage'
		>,
		registration?: { type: AuthProvider; value: string },
	) {
		await this.checkDuplicateUser(data, registration);

		const regAuthProvider = registration ?? {
			type: AuthProvider.EMAIL,
			value: data.email as string,
		};

		return this.prisma.user.create({
			data: {
				...data,
				registrationTypes: {
					create: {
						type: regAuthProvider.type,
						value: regAuthProvider.value,
						isDefault: true,
					},
				},
			},
		});
	}

	async getUsersList() {
		return this.prisma.user.findMany({
			include: { registrationTypes: true },
		});
	}

	async getUserById(userId: number) {
		return this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: { registrationTypes: true },
		});
	}

	async deleteUserById(userId: number) {
		return this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}

	private async checkDuplicateUser(
		data: Pick<Prisma.UserCreateInput, 'email' | 'username'>,
		registration?: { type: AuthProvider; value: string },
	) {
		const existingUser = await this.prisma.user.findFirst({
			where: {
				OR: [{ email: data.email }, { username: data.username }],
			},
		});

		if (existingUser) {
			if (existingUser.email === data.email) {
				throw new BadRequestException('이미 사용 중인 이메일입니다');
			}
			if (existingUser.username === data.username) {
				throw new BadRequestException('이미 사용 중인 닉네임입니다');
			}
		}

		if (registration) {
			const existingRegistration =
				await this.prisma.registrationType.findUnique({
					where: {
						type_value: {
							type: registration.type,
							value: registration.value,
						},
					},
				});

			if (existingRegistration) {
				const providerName =
					registration.type === AuthProvider.GOOGLE ? 'Google' : 'GitHub';
				throw new BadRequestException(`이미 연결된 ${providerName} 계정입니다`);
			}
		}
	}

	async getUserByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	/**
	 * OAuth ID로 사용자를 조회합니다.
	 *
	 * @param provider - OAuth 제공자 ('google' | 'github')
	 * @param providerId - OAuth 제공자의 사용자 ID
	 * @returns 사용자 정보 또는 null
	 */
	async getUserByOAuthId(provider: AuthProvider, providerId: string) {
		const registration = await this.prisma.registrationType.findUnique({
			where: {
				type_value: { type: provider, value: providerId },
			},
			include: { user: true },
		});

		return registration?.user ?? null;
	}

	/**
	 * 기존 계정에 OAuth를 연동합니다.
	 *
	 * @param userId - 사용자 ID
	 * @param provider - OAuth 제공자 ('google' | 'github')
	 * @param providerId - OAuth 제공자의 사용자 ID
	 */
	async linkOAuthAccount(
		userId: number,
		provider: AuthProvider,
		providerId: string,
	): Promise<void> {
		await this.prisma.registrationType.create({
			data: {
				userId,
				type: provider,
				value: providerId,
				isDefault: false,
			},
		});
	}

	/**
	 * OAuth 연동을 해제합니다.
	 *
	 * @param userId - 사용자 ID
	 * @param provider - OAuth 제공자 ('google' | 'github')
	 * @throws {BadRequestException} 최초 가입 수단이거나 최소 하나의 로그인 방법이 필요한 경우
	 */
	async unlinkOAuthAccount(
		userId: number,
		provider: Exclude<AuthProvider, 'EMAIL'>,
	): Promise<void> {
		const registration = await this.prisma.registrationType.findUnique({
			where: {
				userId_type: { userId, type: provider },
			},
		});

		if (!registration) {
			throw new BadRequestException(AUTH_MESSAGE.ERROR_OAUTH_NOT_LINKED);
		}

		if (registration.isDefault) {
			throw new BadRequestException(AUTH_MESSAGE.ERROR_INITIAL_METHOD_UNLINK);
		}

		const remainingCount = await this.prisma.registrationType.count({
			where: { userId },
		});

		if (remainingCount <= 1) {
			throw new BadRequestException('최소 하나의 로그인 방법이 필요합니다.');
		}

		await this.prisma.registrationType.delete({
			where: {
				userId_type: { userId, type: provider },
			},
		});
	}
}
