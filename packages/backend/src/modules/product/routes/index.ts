export const routeName = 'product';

import { Router } from 'express';

const router = Router();
router.get('/', () => console.log('test'));

export const routes = router;
