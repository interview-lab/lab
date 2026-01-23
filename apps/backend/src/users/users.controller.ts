import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '@/auth/guards/token.guard';
import type { User as UserType } from '@/generated/prisma/client';
import MESSAGE from '@/users/consts/message.const';
import { User } from '@/users/decorators/user.decorator';
import { UserResponseDto } from '@/users/dtos/user.dto';
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
	async getUsers(): Promise<UserResponseDto[]> {
		const users = await this.usersService.getUsersList();
		return users.map(UserResponseDto.fromUser);
	}

	@Get('profile')
	@UseGuards(AccessTokenGuard)
	@ApiOperation({
		summary: '내 프로필 조회 API',
		description: '로그인한 사용자의 프로필 정보를 조회합니다.',
	})
	@ApiCookieAuth('accessToken')
	getUserProfile(@User() user: UserType) {
		return UserResponseDto.fromUser(user);
	}

	@Get(':id')
	@ApiOperation({
		summary: '특정 사용자 조회 API',
		description: '특정 사용자의 정보를 조회합니다.',
	})
	async getUserInfo(
		@Param('id', ParseIntPipe) id: number,
	): Promise<UserResponseDto> {
		const user = await this.usersService.getUserById(id);

		if (!user) {
			throw new NotFoundException(MESSAGE.ERROR_USER_NOT_FOUND);
		}

		return UserResponseDto.fromUser(user);
	}
}
