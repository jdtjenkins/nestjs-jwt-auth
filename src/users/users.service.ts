import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Interfaces
import { NestAuthUser } from './users.interface';

// Services
import { NestAuthDatabaseService } from '../database/database.service';

// Entities
import { NestAuthUserEntity as UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
	public constructor(
		private databaseService: NestAuthDatabaseService,
	) { }

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

	public async findOne(username: string): Promise<NestAuthUser | undefined> {
		return this.databaseService.database.getRepository(UserEntity).findOne({ username });
	}
}
