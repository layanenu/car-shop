import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import { correctResponse, errorResponse } from '../utils/ResponseFunctions';

class CarService {
  private carODM: CarODM;

  constructor(carODM: CarODM) {
    this.carODM = carODM;
  }

  private createCarDomain(car: ICar): Car | null {
    if (car) {
      const newCar = new Car(car);
      return newCar;
    }
    return null;
  }

  public async create(car: ICar) {
    const newCar = await this.carODM.create(car);
    return correctResponse(201, this.createCarDomain(newCar));
  }

  public async findAll() {
    const allCars = await this.carODM.findAll();
    const carDomain = allCars.map((e: ICar) => this.createCarDomain(e));
    return correctResponse(200, carDomain);
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) return errorResponse(422, 'Invalid mongo id');
    const carById = await this.carODM.findById(id);

    if (!carById) return errorResponse(404, 'Car not found');
    return correctResponse(200, this.createCarDomain(carById));
  }
}

export default CarService;