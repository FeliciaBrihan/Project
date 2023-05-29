import { ModelStatic } from 'sequelize';
import { ModelProduct } from './Product';

export interface Models {
	Product: ModelStatic<ModelProduct>;
}
