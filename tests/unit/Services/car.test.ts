import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';

const InvalidMongoId = 'Invalid mongo id';

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
  
  it('Deveria criar um car com SUCESSO', async function () {
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

  it('Deveria lançar uma exceção quando o id não existe, para busca', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(allCars[0]);
    // Act
    const result = await service.findById('6348513f34c397abcad040XX');
    // Assert
    expect(result.message).to.deep.equal({ message: InvalidMongoId });
  });

  it('Deveria atualizar um car pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(allCars[0]);
    // Act
    const result = await service.update('6348513f34c397abcad040b2', carInput);
    // Assert
    expect(result.message).to.deep.equal(allCars[0]);
  });

  it('Deveria lançar uma exceção quando o id não existe, para atualizar', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(allCars[0]);
    // Act
    const result = await service.update('6421d2ad8482ffdb749e87XX', carInput);
    // Assert
    expect(result.message).to.deep.equal({ message: InvalidMongoId });
  });

  it('Deveria deletar um car pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(true);
    Sinon.stub(Model, 'findByIdAndDelete').resolves(true);
    // Act
    const result = await service.remove('6348513f34c397abcad040b2');
    // Assert
    expect(result.message).to.deep.equal('');
  });

  it('Deveria lançar uma exceção quando o id não existe, para deletar', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(allCars[0]);
    // Act
    const result = await service.remove('6348513f34c397abcad040XX');
    // Assert
    expect(result.message).to.deep.equal({ message: InvalidMongoId });
  });

  afterEach(function () {
    Sinon.restore();
  });
});
