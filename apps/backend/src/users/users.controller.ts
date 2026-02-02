import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import {
	ApiCookieAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '@/auth/guards/token.guard';
import type { User as UserModel } from '@/generated/prisma/client';
import MESSAGE from '@/users/consts/message.const';
import { User } from '@/users/decorators/user.decorator';
import { ProfileDto } from '@/users/dtos/user.dto';
import { UsersService } from '@/users/users.service';

@Controller('users')
@ApiTags('사용자')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({
		summary: '전체 사용자 목록 조회 API',
		description: '전체 사용자 목록을 조회합니다.',
	})
	@ApiOkResponse({ type: [ProfileDto] })
	async getUsers(): Promise<ProfileDto[]> {
		const users = await this.usersService.getUsersList();
		return plainToInstance(ProfileDto, users, {
			excludeExtraneousValues: true,
		});
	}

	@Get('profile')
	@UseGuards(AccessTokenGuard)
	@ApiCookieAuth('accessToken')
	@ApiOperation({
		summary: '내 프로필 조회 API',
		description: '로그인한 사용자의 프로필 정보를 조회합니다.',
	})
	@ApiOkResponse({ type: ProfileDto })
	getUserProfile(@User() user: Omit<UserModel, 'password'>): ProfileDto {
		return plainToInstance(ProfileDto, user, {
			excludeExtraneousValues: true,
		});
	}

	@Get(':id')
	@ApiOperation({
		summary: '특정 사용자 조회 API',
		description: '특정 사용자의 정보를 조회합니다.',
	})
	@ApiOkResponse({ type: ProfileDto })
	async getUserInfo(
		@Param('id', ParseIntPipe) id: number,
	): Promise<ProfileDto> {
		const user = await this.usersService.getUserById(id);

		if (!user) {
			throw new NotFoundException(MESSAGE.ERROR_USER_NOT_FOUND);
		}

		return plainToInstance(ProfileDto, user, {
			excludeExtraneousValues: true,
		});
	}
}
