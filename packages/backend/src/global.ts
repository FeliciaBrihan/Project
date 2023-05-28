import { Sequelize } from 'sequelize';

export let sequelize: Sequelize;

export function setSequelize(val: Sequelize) {
	sequelize = val;
}
