import { Module } from '@nestjs/common';

// Services
import { NestAuthDatabaseService } from './database.service';

@Module({
	providers: [
		NestAuthDatabaseService,
	],
	exports: [NestAuthDatabaseService],
})
export class NestAuthDatabaseModule { }
