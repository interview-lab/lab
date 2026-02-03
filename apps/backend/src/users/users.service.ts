import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(
		data: Pick<
			Prisma.UserCreateInput,
			| 'email'
			| 'username'
			| 'password'
			| 'githubId'
			| 'googleId'
			| 'profileImage'
		>,
	) {
		await this.checkDuplicateUser(data);

		return this.prisma.user.create({
			data,
		});
	}

	async getUsersList(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getUserById(userId: number): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
	}

	async deleteUserById(userId: number) {
		return this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}

	private async checkDuplicateUser(data: Prisma.UserCreateInput) {
		const orConditions: Prisma.UserWhereInput[] = [
			{ email: data.email },
			{ username: data.username },
		];

		if (data.googleId) {
			orConditions.push({ googleId: data.googleId });
		}
		if (data.githubId) {
			orConditions.push({ githubId: data.githubId });
		}

		const existingUser = await this.prisma.user.findFirst({
			where: { OR: orConditions },
		});

		if (existingUser) {
			if (existingUser.email === data.email) {
				throw new BadRequestException('이미 사용 중인 이메일입니다');
			}
			if (existingUser.username === data.username) {
				throw new BadRequestException('이미 사용 중인 닉네임입니다');
			}
			if (data.googleId && existingUser.googleId === data.googleId) {
				throw new BadRequestException('이미 연결된 Google 계정입니다');
			}
			if (data.githubId && existingUser.githubId === data.githubId) {
				throw new BadRequestException('이미 연결된 GitHub 계정입니다');
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
	async getUserByOAuthId(provider: 'google' | 'github', providerId: string) {
		if (provider === 'google') {
			return this.prisma.user.findUnique({
				where: { googleId: providerId },
			});
		}
		return this.prisma.user.findUnique({
			where: { githubId: providerId },
		});
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
		provider: 'google' | 'github',
		providerId: string,
	): Promise<void> {
		const data =
			provider === 'google'
				? { googleId: providerId }
				: { githubId: providerId };

		await this.prisma.user.update({
			where: { id: userId },
			data,
		});
	}

	/**
	 * OAuth 연동을 해제합니다.
	 *
	 * @param userId - 사용자 ID
	 * @param provider - OAuth 제공자 ('google' | 'github')
	 * @throws {BadRequestException} 최소 하나의 로그인 방법이 필요한 경우
	 */
	async unlinkOAuthAccount(
		userId: number,
		provider: 'google' | 'github',
	): Promise<void> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new BadRequestException('사용자를 찾을 수 없습니다.');
		}

		// 비밀번호가 없고, 다른 OAuth도 연동 안되어 있으면 해제 불가
		if (!user.password) {
			const hasOtherOAuth =
				provider === 'google' ? user.githubId : user.googleId;
			if (!hasOtherOAuth) {
				throw new BadRequestException('최소 하나의 로그인 방법이 필요합니다.');
			}
		}

		const data =
			provider === 'google' ? { googleId: null } : { githubId: null };

		await this.prisma.user.update({
			where: { id: userId },
			data,
		});
	}
}
