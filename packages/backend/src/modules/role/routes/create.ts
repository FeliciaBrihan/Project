import { Request, Response } from 'express';
import { Role, ModelRole, Models } from 'src/interface/models';
import { errorMessage } from 'src/helpers/errorMessage';
import { sequelize } from 'src/global';

type ReqBody = Role;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelRole | object>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const role = await Role.create(req.body);

		return res.status(201).json({ role });
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
