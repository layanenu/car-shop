import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcyclesService';

class MotorcyclesController {
  private service: MotorcycleService;

  constructor(service: MotorcycleService) {
    this.service = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const motorcycles: IMotorcycle = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status,
      buyValue: req.body.buyValue,
      category: req.body.category,
      engineCapacity: req.body.engineCapacity,
    };

    try {
      const { status, message } = await this.service.create(motorcycles);
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcyclesController;