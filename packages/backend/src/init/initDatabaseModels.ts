import { Sequelize } from 'sequelize';
// import { Models } from 'src/interface';

export async function initDatabaseModels(sequelize: Sequelize) {
	await addModels(sequelize);

	async function addModels(sequelize: Sequelize) {
		const { getModelProduct } = await import('src/modules/product/models/');
		const { getModelBook } = await import('src/modules/book/models');

		getModelProduct(sequelize);
		getModelBook(sequelize)

		await sequelize.sync();
	}
}
