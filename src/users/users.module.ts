import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Modules
import { NestAuthDatabaseModule } from '../database/database.module';

@Module({
	imports: [
		NestAuthDatabaseModule,
	],
	providers: [
		UsersService,
	],
	exports: [
		UsersService,
	],
})
export class UsersModule { }
