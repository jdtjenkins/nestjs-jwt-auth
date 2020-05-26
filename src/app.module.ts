import { DynamicModule } from '@nestjs/common';

// Modules
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { LoginModule } from '@login/login.module';
import { NestAuthDatabaseModule } from '@database/database.module';

// Interfaces
import { AppModuleInstantiationOptions } from '@core/interfaces/config-options.interface';

export class AppModule {
	public static forRoot(options: AppModuleInstantiationOptions = {
		jwtSecret: 'super-secret-jwt-secret',
	}): DynamicModule {
		return {
			module: AppModule,
			imports: [
				AuthModule.forRoot(options),
				UsersModule,
				LoginModule,
				NestAuthDatabaseModule,
			],
		}
	}
}
