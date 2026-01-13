import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers() {
		return this.usersService.getUsersList();
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
