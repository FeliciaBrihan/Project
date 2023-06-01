import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelUser, Models } from 'src/interface';

interface ReqParams {
	id: number;
}

export async function getById(
	req: Request<ReqParams, {}, {}, {}>,
	res: Response<ModelUser | object | string>
) {
	const { User } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (!user) return res.status(400).send('Invalid id!');

		return res.status(200).json(user);
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
