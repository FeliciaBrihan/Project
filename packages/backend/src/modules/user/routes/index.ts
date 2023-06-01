export const routeName = 'user';

import { create } from 'src/modules/user/routes/create';
import { deleteUser } from 'src/modules/user/routes/delete';
import { getAll } from 'src/modules/user/routes/getAll';
import { update } from 'src/modules/user/routes/update';
import { getById } from 'src/modules/user/routes/getById';

import { Router } from 'express';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', deleteUser);
router.put('/:id', update);

export const routes = router;
