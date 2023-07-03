import { Request, Response } from 'express';
import { errorMessage } from 'src/helpers';
import { sequelize } from 'src/global';
import { Models, ModelRole, Role } from 'src/interface/models';

type ReqBody = Role;
interface ReqParam {
	id: number;
}

export async function update(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelRole | object | string>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const role = await Role.findByPk(id);

		if (!role) return res.status(400).send('Invalid id');
		await role.update(req.body);

		return res.status(200).json({ role });
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
