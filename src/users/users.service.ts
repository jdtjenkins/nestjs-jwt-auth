import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Interfaces
import { NestAuthUser } from './users.interface';

@Injectable()
export class UsersService {
	private readonly users: NestAuthUser[] = [
		{
			id: 1,
			username: 'john',
			password: '$2b$10$1jZZVBX9Jk4p90xEZJ7fVepfIV8kYGk8MvKSc7VneQ90bnl5X3yJi',
		},
		{
			id: 2,
			username: 'chris',
			password: '$2b$10$1jZZVBX9Jk4p90xEZJ7fVepfIV8kYGk8MvKSc7VneQ90bnl5X3yJi',
		},
		{
			id: 3,
			username: 'maria',
			password: '$2b$10$1jZZVBX9Jk4p90xEZJ7fVepfIV8kYGk8MvKSc7VneQ90bnl5X3yJi',
		},
	];

	findOne(username: string): NestAuthUser | undefined {
		return this.users.find(user => user.username === username);
	}
}
