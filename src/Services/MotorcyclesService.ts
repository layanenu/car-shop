import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import { correctResponse } from '../utils/ResponseFunctions';

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
}

export default MotorcyclesService;