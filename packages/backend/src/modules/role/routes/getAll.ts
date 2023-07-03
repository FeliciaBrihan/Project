import { sequelize } from 'src/global';
import { Request, Response } from 'express';
import { Models, ModelRole } from 'src/interface/models';
import { errorMessage } from 'src/helpers';

export async function getAll(
	req: Request<{}, {}, {}, {}>,
	res: Response<ModelRole | object>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const roles = await Role.findAll();

		if (roles.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			roles,
			results: roles.length,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
