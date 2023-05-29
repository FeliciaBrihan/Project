import { Model } from 'sequelize';

export interface Product {
	name: string;
	price: number;
}

export type ModelProduct = Model<Product>;
