import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Role extends DefaultParanoidAttributes {
	name: string;
	allowedActions: number[];
}

export interface RoleAttributes extends Role {
	dataValues?: Role;
}

export type ModelRole = Model<RoleAttributes, RoleAttributes> & RoleAttributes;
