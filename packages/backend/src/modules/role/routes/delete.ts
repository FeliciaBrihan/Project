import { Request, Response } from 'express';
import { Models, ModelRole } from 'src/interface/models';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';

interface ReqParam {
	id: number;
}

export async function deleteRole(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelRole | object | string>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const role = await Role.findByPk(id);
		if (!role) return res.sendStatus(400).send('Invalid id');

		await role.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
