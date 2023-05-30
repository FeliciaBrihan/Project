import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelBook, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function deleteBook(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelBook | object | string>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const book = await Book.findByPk(id);
		if (!book) return res.sendStatus(400).send('Invalid id');

		await book.destroy();
		return res.status(200).json(book);
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
