import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import { correctResponse, errorResponse } from '../utils/ResponseFunctions';

const InvalidMongoId = 'Invalid mongo id';
const carNotFound = 'Car not found';

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
    if (!isValidObjectId(id)) return errorResponse(422, InvalidMongoId);
    const carById = await this.carODM.findById(id);

    if (!carById) return errorResponse(404, carNotFound);
    return correctResponse(200, this.createCarDomain(carById));
  }

  async update(id: string, car: Partial<ICar>) {
    if (!isValidObjectId(id)) return errorResponse(422, InvalidMongoId);
    const carUpdate = await this.carODM.update(id, car);

    if (!carUpdate) return errorResponse(404, carNotFound);
    return correctResponse(200, this.createCarDomain(carUpdate));
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) return errorResponse(422, InvalidMongoId);
    const removed = await this.carODM.remove(id);

    if (!removed) return errorResponse(404, carNotFound);
    return correctResponse(204, '');
  }
}

export default CarService;