import { Request, Response } from 'express';
import { ModelUser, Models } from 'src/interface';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';

type ReqParams = {
	id: number;
};

export async function deleteUser(
	req: Request<ReqParams, {}, {}, {}>,
	res: Response<ModelUser | object | string>
) {
	const { User } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (!user) return res.status(400).send('Invalid id!');

		await user.destroy();

		return res.status(200).json(null);
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
