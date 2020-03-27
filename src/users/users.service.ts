import { Injectable } from '@nestjs/common';

// Interfaces
import { NestAuthUser } from './users.interface';

// Services
import { NestAuthDatabaseService } from '../database/database.service';

// Entities
import { NestAuthUserEntity } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
	public constructor(
		private databaseService: NestAuthDatabaseService,
	) { }

	public async findOne(username: string): Promise<NestAuthUser | undefined> {
		return this.databaseService.database.getRepository(NestAuthUserEntity).findOne({ username });
	}
}
