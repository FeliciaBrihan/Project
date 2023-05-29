import { Dialect, Sequelize } from 'sequelize';
import { loggerOnlyGlobal } from 'src/logs';
import { join, relative } from 'path';
import { existsSync, readdirSync } from 'fs';
import { Router, Express } from 'express';

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

interface RouterProps {
	routeName: string;
	routes: Router;
}
export type ExpressModule = ReturnType<typeof expressModule>;
export type ModuleInstance = ReturnType<ExpressModule['getInstanceOfModule']>;

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
	function getModulePath(module: string) {
		return join(process.env.MODULES_PATH, module);
	}
	function getModules() {
		return readdirSync(process.env.MODULES_PATH, { withFileTypes: true })
			.filter((dir) => dir.isDirectory())
			.map((dir) => dir.name);
	}
	function getActiveModules() {
		return readdirSync(process.env.MODULES_PATH, { withFileTypes: true })
			.filter((dir) => dir.isDirectory())
			.map((dir) => dir.name)
			.filter(async (name) => await moduleIsActive(getModulePath(name)));
	}

	async function moduleIsActive(modulePath: string) {
		const index = await import(getRelativePath(join(modulePath, 'settings')));
		return index.isActive;
	}

	function getRelativePath(path: string) {
		return '../' + relative('src', path);
	}

	function addExpressRouterToApp(app: Express, router: RouterProps) {
		app.use(`/${router.routeName}`, router.routes);
	}
	function getInstanceOfModule(module: string) {
		const modulePath = join(process.env.MODULES_PATH, module);

		const modelsPath = join(modulePath, 'models');
		const cronPath = join(modulePath, 'cron');
		const expressRoutesPath = join(modulePath, 'routes');

		const haveModels = existsSync(modelsPath);
		const haveCrons = existsSync(cronPath);
		const haveExpressRoutes = existsSync(expressRoutesPath);

		async function getExpressRoutes() {
			return await import(getRelativePath(join(expressRoutesPath, 'index.ts')));
		}
		async function startCronSchedule() {
			await import(getRelativePath(cronPath));
		}
		return {
			modulePath,
			modelsPath,
			cronPath,
			expressRoutesPath,
			haveModels,
			haveCrons,
			haveExpressRoutes,
			getExpressRoutes,
			startCronSchedule,
		};
	}

	return {
		getDatabaseConfig,
		getDatabaseConnection,
		checkDatabaseConnection,
		getModules,
		getActiveModules,
		addExpressRouterToApp,
		getInstanceOfModule,
	};
}
