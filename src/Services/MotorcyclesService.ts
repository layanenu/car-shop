import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import { correctResponse, errorResponse } from '../utils/ResponseFunctions';

const InvalidMongoId = 'Invalid mongo id';
const motorcycleNotFound = 'Motorcycle not found';

class MotorcyclesService {
  private motorcycleODM: MotorcyclesODM;

  constructor(motorcycleODM: MotorcyclesODM) {
    this.motorcycleODM = motorcycleODM;
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle | null) {
    if (motorcycle) {
      const newMotorcycle = new Motorcycle(motorcycle);
      return newMotorcycle;
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return correctResponse(201, this.createMotorcycleDomain(newMotorcycle));
  }

  public async findAll() {
    const allMotorcycles = await this.motorcycleODM.findAll();
    const motorcycleDomain = allMotorcycles.map((e: IMotorcycle) => this.createMotorcycleDomain(e));
    return correctResponse(200, motorcycleDomain);
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) return errorResponse(422, InvalidMongoId);
    const motorcycleById = await this.motorcycleODM.findById(id);

    if (!motorcycleById) return errorResponse(404, motorcycleNotFound);
    return correctResponse(200, this.createMotorcycleDomain(motorcycleById));
  }

  async update(id: string, motorcycle: Partial<IMotorcycle>) {
    if (!isValidObjectId(id)) return errorResponse(422, InvalidMongoId);
    const motorcycleUpdate = await this.motorcycleODM.update(id, motorcycle);

    if (!motorcycleUpdate) return errorResponse(404, motorcycleNotFound);
    return correctResponse(200, this.createMotorcycleDomain(motorcycleUpdate));
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) return errorResponse(422, InvalidMongoId);
    const removed = await this.motorcycleODM.remove(id);

    if (!removed) return errorResponse(404, motorcycleNotFound);
    return correctResponse(204, '');
  }
}

export default MotorcyclesService;