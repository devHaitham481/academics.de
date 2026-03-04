import { Router } from 'express';
import { getSunHours } from '@controllers/sun.controller';

const router = Router();

router.get('/sun-hours', getSunHours);

export default router;
