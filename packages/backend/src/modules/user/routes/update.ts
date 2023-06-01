import { Request, Response } from 'express';
import { errorMessage } from 'src/helpers';
import { sequelize } from 'src/global';
import { User, ModelUser, Models } from 'src/interface';
import md5 from 'md5';

interface ReqParams {
	id: number;
}
type ReqBody = User;

export async function update(
	req: Request<ReqParams, {}, ReqBody, {}>,
	res: Response<ModelUser | object | string>
) {
	const { User } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const user = await User.findByPk(id);

		if (!user) return res.status(400).send('Invalid id!');

		await user.update({ ...req.body, password: md5(user.password) });

		return res.status(200).json(user);
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
