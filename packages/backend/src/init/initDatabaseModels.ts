import { Sequelize } from 'sequelize';
// import { Models } from 'src/interface';

export async function initDatabaseModels(sequelize: Sequelize) {
	await addModels(sequelize);

	async function addModels(sequelize: Sequelize) {
		const { getModelProduct } = await import('src/modules/product/models/');
		getModelProduct(sequelize);

		await sequelize.sync();
	}
}
