import { Dialect, Sequelize } from 'sequelize';
import { loggerOnlyGlobal } from 'src/logs';

interface DatabaseConfigOptions {
	development: {
		username: string;
		password: string;
		database: string;
		host: string;
		port: number;
		dialect: Dialect;
	};
}
export type ExpressModule = ReturnType<typeof expressModule>;

const logger = loggerOnlyGlobal(__filename);

export function expressModule() {
	function getDatabaseConfig(): DatabaseConfigOptions {
		return {
			development: {
				username: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				host: process.env.DATABASE_HOST,
				port: Number(process.env.DATABASE_PORT),
				dialect: 'postgres',
			},
		};
	}

	function getDatabaseConnection(username?: string) {
		const config = getDatabaseConfig().development;
		return new Sequelize(
			config.database,
			username ? username : config.username,
			config.password,
			{
				host: config.host,
				port: config.port,
				dialect: config.dialect,
				logging: false,
			}
		);
	}

	async function checkDatabaseConnection(sequelizeConnection: Sequelize) {
		try {
			await sequelizeConnection.authenticate();
			logger.info('Connection has been established successfully');
		} catch (error) {
			logger.error('Unable to connect to database', error);
		}
	}

	return {
		getDatabaseConfig,
		getDatabaseConnection,
		checkDatabaseConnection,
	};
}
