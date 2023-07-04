import { Request, Response } from 'express';
import { ModelAction, Action, Models } from 'src/interface';
import { errorMessage } from 'src/helpers';
import { sequelize } from 'src/global';

type ReqBody = Action;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelAction | object>
) {
	const { Action } = sequelize.models as unknown as Models;

	try {
		const action = await Action.create(req.body);
		return res.status(201).json({ action });
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
