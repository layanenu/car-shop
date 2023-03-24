import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const car: ICar = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status,
      buyValue: req.body.buyValue,
      doorsQty: req.body.doorsQty,
      seatsQty: req.body.seatsQty,
    };

    try {
      const { status, message } = await this.service.create(car);
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.findAll();
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.findById(id);
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.update(id, req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.remove(id);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}
  
export default CarController;