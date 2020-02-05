import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) { }

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(username: string, password: string) {
		const payload = { username };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
