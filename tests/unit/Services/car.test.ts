import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';

describe('Testando car service', function () {
  const service = new CarService(new CarODM());

  const allCars = [
    new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    }),
  ];
  
  it('Deveria criar um car com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
  
    const carOutput = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
  
    // Arrange
    Sinon.stub(Model, 'create').resolves(carOutput);
    // Act
    const result = await service.create(carInput);
    // Assert
    expect(result.message).to.be.deep.equal(carOutput);
  });

  it('Deveria buscar todos os carros cadastrados', async function () {
    // Arrange
    Sinon.stub(Model, 'find').resolves(allCars);
    // Act
    const result = await service.findAll();
    // Assert
    expect(result.message).to.deep.equal(allCars);
  });

  it('Deveria buscar um carro pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(allCars[0]);
    // Act
    const result = await service.findById('6348513f34c397abcad040b2');
    // Assert
    expect(result.message).to.deep.equal(allCars[0]);
  });

  it('Deveria lançar uma exceção quando o id não existe', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(allCars[0]);
    // Act
    const result = await service.findById('6348513f34c397abcad040XX');
    // Assert
    expect(result.message).to.deep.equal({ message: 'Invalid mongo id' });
  });

  afterEach(function () {
    Sinon.restore();
  });
});
