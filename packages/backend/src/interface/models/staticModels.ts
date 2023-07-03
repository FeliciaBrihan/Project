import { ModelStatic } from 'sequelize';
import { ModelBook } from './Book';
import { ModelUser } from './User';
import { ModelRole } from './Role';

export interface Models {
	Book: ModelStatic<ModelBook>;
	User: ModelStatic<ModelUser>;
	Role: ModelStatic<ModelRole>;
}
