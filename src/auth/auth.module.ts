import { Module } from '@nestjs/common';

// Services
import { AuthService } from './auth.service';

// Modules
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

// Strategies
import { BasicStrategy } from './basic.strategy';
import { JwtStrategy } from './jwt.strategy';

// Constants
import { jwtConstants } from './constants';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' },
		}),
	],
	providers: [
		AuthService,
		BasicStrategy,
		JwtStrategy,
	],
	exports: [AuthService],
})
export class AuthModule { }
