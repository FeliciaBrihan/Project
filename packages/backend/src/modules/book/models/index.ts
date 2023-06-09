import { DataTypes, Sequelize } from 'sequelize';

export function getModelBook(sequelize: Sequelize) {
	sequelize.define(
		'Book',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: 'author_book',
			},
			author: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: 'author_book',
			},
			publishingHouse: DataTypes.STRING,
			publishedYear: DataTypes.INTEGER,
			coverImage: DataTypes.STRING,
			genre: DataTypes.STRING,
			description: DataTypes.STRING,
			pages: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			typeFormat: {
				type: DataTypes.ENUM('online', 'printed'),
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			stockNew: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			stockOld: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ tableName: 'book' }
	);
}
