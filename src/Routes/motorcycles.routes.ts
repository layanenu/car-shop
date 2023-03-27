import { Router } from 'express';
import MotorcyclesController from '../Controllers/motorcyclesController';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import MotorcyclesService from '../Services/MotorcyclesService';

const routes = Router();

const motorcyclesService = new MotorcyclesService(new MotorcyclesODM());
const motorcyclesController = new MotorcyclesController(motorcyclesService);

routes.post(
  '/motorcycles',
  (req, res, next) => motorcyclesController.create(req, res, next),
);

routes.get(
  '/motorcycles',
  (req, res, next) => motorcyclesController.findAll(req, res, next),
);

routes.get(
  '/motorcycles/:id',
  (req, res, next) => motorcyclesController.findById(req, res, next),
);

export default routes;
