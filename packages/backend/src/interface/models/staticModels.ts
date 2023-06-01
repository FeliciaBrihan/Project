import { ModelStatic } from 'sequelize';
import { ModelProduct } from './Product';
import { ModelBook } from './Book';
import { ModelUser } from './User';

export interface Models {
	Product: ModelStatic<ModelProduct>;
	Book: ModelStatic<ModelBook>;
	User: ModelStatic<ModelUser>;
}
