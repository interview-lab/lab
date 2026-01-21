import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '@/auth/guards/token.guard';
import { User } from '@/users/decorators/user.decorator';
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
	getUsers() {
		return this.usersService.getUsersList();
	}

	@Get('profile')
	@UseGuards(AccessTokenGuard)
	@ApiOperation({
		summary: '내 프로필 조회 API',
		description: '로그인한 사용자의 프로필 정보를 조회합니다.',
	})
	getUserProfile(@User() user) {
		return user;
	}

	@Get(':id')
	@ApiOperation({
		summary: '특정 사용자 조회 API',
		description: '특정 사용자의 정보를 조회합니다.',
	})
	getUserInfo(@Param('id', ParseIntPipe) id: number) {
		const user = this.usersService.getUserById(id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}
}
