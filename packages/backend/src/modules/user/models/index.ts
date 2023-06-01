import { DataTypes, Sequelize } from 'sequelize';

export function getModelUser(sequelize: Sequelize) {
	sequelize.define(
		'User',
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true },
			},
			roleId: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
			},
			budget: DataTypes.INTEGER,
			subscriptionId: DataTypes.INTEGER,
			subscriptionDate: DataTypes.DATE,
			subscriptionExpirationDate: DataTypes.DATE,
			booksReadThisMonth: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			addressId: DataTypes.INTEGER,
		},
		{ tableName: 'user' }
	);
}
