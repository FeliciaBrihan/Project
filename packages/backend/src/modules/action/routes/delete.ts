import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { Models, ModelAction } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function deleteAction(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelAction | object | string>
) {
	const { Action } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;

		const action = await Action.findByPk(id);
		if (!action) return res.status(400).send('Invalid id');
		await action.destroy();
		return res.status(200).json({ action });
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
