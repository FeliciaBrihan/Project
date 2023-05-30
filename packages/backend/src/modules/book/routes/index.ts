export const routeName = 'book';

import { Router } from 'express';
import { create } from 'src/modules/book/routes/create';
import { getAll } from 'src/modules/book/routes/getAll';
import { getById } from 'src/modules/book/routes/getById';
import { deleteBook } from 'src/modules/book/routes/delete';
import { update } from 'src/modules/book/routes/update';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.delete('/:id', deleteBook);
router.put('/:id:', update);

export const routes = router;
