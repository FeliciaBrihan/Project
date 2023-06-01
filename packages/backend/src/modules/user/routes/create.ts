import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { User, ModelUser, Models } from 'src/interface/models';
import { errorMessage } from 'src/helpers/errorMessage';
import md5 from 'md5';

type ReqBody = User;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelUser | object>
) {
	const { User } = sequelize.models as unknown as Models;

	try {
		const newUser = await User.create(req.body);

		await newUser.update({ password: md5(newUser.password) });

		return res.status(200).json(newUser);
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
