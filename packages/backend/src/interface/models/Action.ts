import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from 'src/interface/models/DefaultParanoidAttributes';

export interface Action extends DefaultParanoidAttributes {
	name: string;
}

export interface ActionAttributes extends Action {
	dataValues?: Action;
}

export type ModelAction = Model<ActionAttributes, ActionAttributes> &
	ActionAttributes;
