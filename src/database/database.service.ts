import { Inject } from '@nestjs/common';
import {
	createConnection,
	Connection,
} from 'typeorm';

// Entities
import { NestAuthUserEntity } from './entities/user.entity';

export class NestAuthDatabaseService {

	public constructor(
		@Inject(Connection)
		private connection: Connection,
	) {
		connection.options.entities.push(NestAuthUserEntity);

		(async () => {
			await connection.close();
			await connection.connect();
		})();
	}

	public get database(): Connection {
		try {
			return this.connection;
		} catch (e) {
			throw e;
		}
	}

	private createConnection(): Promise<Connection> {
		return createConnection({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'example',
			database: 'test',
			entities: [
				NestAuthUserEntity,
			],
			synchronize: true,
		});
	}
}
