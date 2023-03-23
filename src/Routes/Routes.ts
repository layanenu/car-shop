import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarODM from '../Models/CarODM';
import CarService from '../Services/CarService';

const routes = Router();

const carService = new CarService(new CarODM());
const carController = new CarController(carService);

routes.post(
  '/cars',
  (req, res, next) => carController.create(req, res, next),
);

routes.get(
  '/cars',
  (req, res, next) => carController.findAll(req, res, next),
);

routes.get(
  '/cars/:id',
  (req, res, next) => carController.findById(req, res, next),
);

export default routes;
