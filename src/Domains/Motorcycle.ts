import IMotorcycle from '../Interfaces/IMotorcycle';

class Motorcycle {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;

  constructor(
    motorcycle: IMotorcycle,
  ) {
    this.id = motorcycle.id;
    this.model = motorcycle.model;
    this.year = motorcycle.year;
    this.color = motorcycle.color;
    this.status = motorcycle.status;
    this.buyValue = motorcycle.buyValue;
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(value: string) {
    this.category = value;
  }

  public getEngineCapacity(): number {
    return this.engineCapacity;
  }

  public setEngineCapacity(value: number) {
    this.engineCapacity = value;
  }
}

export default Motorcycle;