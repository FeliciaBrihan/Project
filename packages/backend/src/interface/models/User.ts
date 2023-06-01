import { DefaultParanoidAttributes } from 'src/interface/models/DefaultParanoidAttributes';
import { Model } from 'sequelize';

export interface User extends DefaultParanoidAttributes {
	firstName: string;
	lastName: string;
	password: string;
	username: string;
	email: string;
	subscriptionId: number;
	subscriptionDate: Date;
	subscriptionExpirationDate: Date;
	roleId: number;
	budget: number;
	booksReadThisMonth: number;
	addressId: number;
}
export interface UserAttributes extends User {
	dataValues?: User;
}

export type ModelUser = Model<UserAttributes, UserAttributes> & UserAttributes;
