import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;

  constructor(
    vehicle: IVehicle,
  ) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status;
    this.buyValue = vehicle.buyValue;
  }

  public getId() {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getModel() {
    return this.model;
  }

  public setModel(value: string) {
    this.model = value;
  }

  public getYear() {
    return this.year;
  }

  public setYear(value: number) {
    this.year = value;
  }

  public getColor() {
    return this.color;
  }

  public setColor(value: string) {
    this.color = value;
  }

  public getStatus() {
    return this.status;
  }

  public setStatus(value: boolean) {
    this.status = value;
  }

  public getBuyValue() {
    return this.buyValue;
  }

  public setBuyValue(value: number) {
    this.buyValue = value;
  }
}

export default Vehicle;