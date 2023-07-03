export const routeName = 'role';

import { Router } from 'express';
import { create } from 'src/modules/role/routes/create';
import { getAll } from 'src/modules/role/routes/getAll';
import { getById } from 'src/modules/role/routes/getById';
import { deleteRole } from 'src/modules/role/routes/delete';
import { update } from 'src/modules/role/routes/update';

const router = Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', deleteRole);
router.put('/:id', update);

export const routes = router;
