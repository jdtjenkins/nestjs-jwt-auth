import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { startTestingDatabase, stopDockerContainer } from '@test/testing.utils';

// Modules
import { AppModule } from './app.module';

// Services
import { NestAuthDatabaseService } from '@database/database.service';

jest.setTimeout(25000);

describe('AppController', () => {
	let app: INestApplication;
	let databaseService: NestAuthDatabaseService;
	let container: { containerId: string, databasePort: number };

	beforeAll(async done => {
		try {
			container = await startTestingDatabase();
		} catch (e) {
			console.log(e);
			return;
		}

		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule.forRoot(),
				TypeOrmModule.forRoot({
					type: 'mysql',
					host: 'localhost',
					port: container.databasePort,
					username: 'root',
					password: 'example',
					database: 'test',
				}),
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		databaseService = app.get(NestAuthDatabaseService);

		await app.init();
		done();
	});

	afterAll(async () => {
		try {
			await databaseService.closeConnection();
		} catch {}

		try {
			await stopDockerContainer(container.containerId);
		} catch (e) {
			console.log(e);
		}

		await app.close();
	});

	describe('init', () => {
		it('Should be defined', () => {
			expect(app).toBeDefined();
		});
	});
});
