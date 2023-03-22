interface ICar {
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean; // valor default false
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
}

export default ICar;