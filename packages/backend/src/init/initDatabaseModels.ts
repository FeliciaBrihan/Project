import { Sequelize } from 'sequelize';
// import { Models } from 'src/interface';

export async function initDatabaseModels(sequelize: Sequelize) {
	await addModels(sequelize);

	async function addModels(sequelize: Sequelize) {
		const { getModelBook } = await import('src/modules/book/models');
		const { getModelUser } = await import('src/modules/user/models');

		getModelBook(sequelize);
		getModelUser(sequelize);

		await sequelize.sync({ force: true });
	}
}
