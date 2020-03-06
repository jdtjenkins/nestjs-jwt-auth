import {
	createConnection,
	Connection,
	getConnection,
} from 'typeorm';

// Entities
import { NestAuthUserEntity } from './entities/user.entity';

export class NestAuthDatabaseService {
	private _databaseConnection: Connection;

	public constructor() {
		(async () => {
			try {
				// Default connection found
				this.setDatabase(getConnection());
			} catch {
				// Need to connect to the db ourselves
				this.setDatabase(await this.createConnection());
			}
		})();
	}

	public get database(): Connection {
		return this._databaseConnection;
	}

	private setDatabase(connection: Connection) {
		this._databaseConnection = connection;
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