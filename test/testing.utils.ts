import { createConnection, ConnectionOptions } from 'typeorm';
import * as getPort from 'get-port';
import { Docker } from 'docker-cli-js';
import { join } from 'path';

const checkConnection = async (databaseOptions: ConnectionOptions): Promise<boolean> => {
	return new Promise(async resolve => {
		try {
			const connection = await createConnection(databaseOptions);
			await connection.close();
			resolve(true);
		} catch (e) {
			setTimeout(async () => {
				resolve(await checkConnection(databaseOptions));
			}, 500);
		}
	});
}

const startDockerContainer = async (): Promise<{ containerId: string, databasePort: number }> => {
	const docker = new Docker();
	let databasePort: number = await getPort();
	let containerId: string;
	const sqlVolumePath: string = join(__dirname, 'sql');

	const dockerCommandOutput = await docker.command(`run --name "nestjs-jwt-auth_mysql_${ databasePort }" --rm -e "MYSQL_ROOT_PASSWORD=example" -e "MYSQL_DATABASE=test" -p ${ databasePort }:3306 -v ${ sqlVolumePath }:/docker-entrypoint-initdb.d -d mysql --default-authentication-plugin=mysql_native_password`);
	containerId = dockerCommandOutput.containerId;

	await checkConnection({
		type: 'mysql',
		host: 'localhost',
		port: databasePort,
		username: 'root',
		password: 'example',
		database: 'test',
	});

	return {
		databasePort,
		containerId,
	};
}

export const stopDockerContainer = async (containerId: string): Promise<void> => {
	const docker = new Docker();

	try {
		await docker.command(`stop ${ containerId }`);
	} catch (e) {
		console.log(e);
	}
}

export const startTestingDatabase = async (): Promise<{ containerId: string, databasePort: number }> => {
	const container = await startDockerContainer();

	return container;
}
