import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { NestAuthDatabaseModule } from './database/database.module';

@Module({
	imports: [
		// TypeOrmModule.forRoot({
		// 	type: 'mysql',
		// 	host: 'localhost',
		// 	port: 3306,
		// 	username: 'root',
		// 	password: 'example',
		// }),
		AuthModule,
		UsersModule,
		LoginModule,
		NestAuthDatabaseModule,
	],
})
export class AppModule { }
