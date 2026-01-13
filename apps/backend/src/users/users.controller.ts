import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Request,
	UseGuards,
} from '@nestjs/common';
import { TokenGuard } from '../auth/guard/token.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers() {
		return this.usersService.getUsersList();
	}

	@Get('profile')
	@UseGuards(TokenGuard)
	getUserProfile(@Request() request) {
		return request.user;
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
