import { sequelize } from 'src/global';
import { Request, Response } from 'express';
import { Models, ModelAction } from 'src/interface';
import { errorMessage } from 'src/helpers';

interface ReqParam {
	id: number;
}

export async function getById(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelAction | object | string>
) {
	const { Action } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const action = await Action.findByPk(id);

		if (!action) return res.status(400).send('Invalid id');

		return res.status(200).json(action);
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
