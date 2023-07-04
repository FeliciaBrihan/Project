export const routeName = 'action';
import { Router } from 'express';
import { create } from 'src/modules/action/routes/create';
import { deleteAction } from 'src/modules/action/routes/delete';
import { getAll } from 'src/modules/action/routes/getAll';
import { getById } from 'src/modules/action/routes/getById';
import { update } from 'src/modules/action/routes/update';

const router = Router();

router.post('/', create);
router.delete('/:id', deleteAction);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);

export const routes = router;
