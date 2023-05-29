import { DataTypes, Sequelize } from 'sequelize';

export function getModelProduct(sequelize: Sequelize) {
	sequelize.define(
		'Product',
		{
			name: DataTypes.STRING,
			price: DataTypes.INTEGER,
		},
		{ tableName: 'product' }
	);
}
