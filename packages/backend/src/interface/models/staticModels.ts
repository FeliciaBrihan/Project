import { ModelStatic } from 'sequelize';
import { ModelProduct } from './Product';
import { ModelBook } from './Book';

export interface Models {
	Product: ModelStatic<ModelProduct>;
	Book: ModelStatic<ModelBook>;
}
