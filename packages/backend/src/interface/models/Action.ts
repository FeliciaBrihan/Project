import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from 'src/interface/models/DefaultParanoidAttributes';

interface Action extends DefaultParanoidAttributes {
	name: string;
}

export interface ActionAttributes extends Action {
	dataValues?: Action;
}

export type ModelActione = Model<ActionAttributes, ActionAttributes> &
	ActionAttributes;
