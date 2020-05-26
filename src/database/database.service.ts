import { Inject, Optional } from '@nestjs/common';
import {
	createConnection,
	Connection,
} from 'typeorm';

export class NestAuthDatabaseService {

	public constructor(
		@Optional()
		@Inject(Connection)
		private connection: Connection,
	) {}

	public get database(): Connection {
		try {
			if (this.connection) {
				return this.connection;
			}

			throw new Error('No connection found');
		} catch (e) {
			throw e;
		}
	}

	public closeConnection(): Promise<void> {
		return this.connection.close();
	}
}
