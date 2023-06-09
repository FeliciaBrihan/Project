import { expressModule } from 'src/core';
import { initEachActiveModule } from 'src/init';
import { Express } from 'express';

export function initExpressModule(app: Express) {
	const { getModules } = expressModule();

	const modules = getModules();
	initEachActiveModule(app, modules);
}
