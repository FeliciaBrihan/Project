import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelBook, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function getById(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelBook | object | string>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const book = await Book.findByPk(id);
		if (!book) return res.status(400).send('Invalid id');

		return res.status(200).json(book);
	} catch (error) {
		const message = errorMessage(error);
		res.sendStatus(400).send(message);
	}
}
