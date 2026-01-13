import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guard/token.guard';
import { User } from './decorators/user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers() {
		return this.usersService.getUsersList();
	}

	@Get('profile')
	@UseGuards(AccessTokenGuard)
	getUserProfile(@User() user) {
		return user;
	}

	@Get(':id')
	getUserInfo(@Param('id', ParseIntPipe) id: number) {
		const user = this.usersService.getUserById(id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}
}
