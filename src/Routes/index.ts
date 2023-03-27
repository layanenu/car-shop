import { Router } from 'express';
import CarRoutes from './car.routes';
import MotorcyclesRoutes from './motorcycles.routes';

const router = Router();

router.use(CarRoutes);
router.use(MotorcyclesRoutes);

export default router;