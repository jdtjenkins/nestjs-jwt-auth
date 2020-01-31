import { Controller, Request, Post, UseGuards, Get, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller()
export class LoginController {
	constructor(private readonly authService: AuthService) { }

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Headers('authorization') auth: string) {
		const encodedToken = auth.split('Basic ')[1];
		const [username, password] = Buffer.from(encodedToken, 'base64').toString().split(':');

		return this.authService.login(username, password);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
