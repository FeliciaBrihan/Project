import { Request, Response } from 'express';
import { ModelUser, Models } from 'src/interface';
import { errorMessage } from 'src/helpers';
import { sequelize } from 'src/global';

export async function getAll(
	req: Request,
	res: Response<ModelUser[] | object>
) {
	const { User } = sequelize.models as unknown as Models;

	try {
		const users = await User.findAll();
		if (users.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: users.length,
			users,
		});
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
