import { Sequelize } from 'sequelize';
// import { Models } from 'src/interface';

export async function initDatabaseModels(sequelize: Sequelize) {
	await addModels(sequelize);

	async function addModels(sequelize: Sequelize) {
		const { getModelBook } = await import('src/modules/book/models');
		const { getModelUser } = await import('src/modules/user/models');
		const { getModelRole } = await import('src/modules/role/models');
		const { getModelAction } = await import('src/modules/action/models');

		getModelBook(sequelize);
		getModelUser(sequelize);
		getModelRole(sequelize);
		getModelAction(sequelize);

		await sequelize.sync();
	}
}
