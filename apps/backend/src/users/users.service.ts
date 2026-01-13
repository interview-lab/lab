import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(
		data: Pick<
			Prisma.UserCreateInput,
			'email' | 'username' | 'password' | 'githubId' | 'googleId'
		>,
	) {
		await this.checkDuplicateUser(data);

		return this.prisma.user.create({
			data,
		});
	}

	async getUsersList() {
		return this.prisma.user.findMany({
			omit: {
				password: true,
			},
		});
	}

	async getUserById(userId: number) {
		return this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			omit: {
				password: true,
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
}
