import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import MotorcyclesService from '../../../src/Services/MotorcyclesService';
import MotorcyclesODM from '../../../src/Models/MotorcyclesODM';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

const hondaCb = 'Honda Cb 600f Hornet';
const InvalidMongoId = 'Invalid mongo id';

describe('Testando motorcycle service', function () {
  const service = new MotorcyclesService(new MotorcyclesODM());

  const allMotorcycles = [
    new Motorcycle({
      id: '6421d2ad8482ffdb749e8736',
      model: hondaCb,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    }),
  ];

  const motorcycleInput: IMotorcycle = {
    model: hondaCb,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const motorcycleOutput = new Motorcycle({
    id: '6421d2ad8482ffdb749e8736',
    model: hondaCb,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  });
  
  it('Deveria criar uma motorcycle com SUCESSO', async function () {  
    // Arrange
    Sinon.stub(Model, 'create').resolves(motorcycleOutput);
    // Act
    const result = await service.create(motorcycleInput);
    // Assert
    expect(result.message).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria buscar todos as motorcycles cadastradas', async function () {
    // Arrange
    Sinon.stub(Model, 'find').resolves(allMotorcycles);
    // Act
    const result = await service.findAll();
    // Assert
    expect(result.message).to.deep.equal(allMotorcycles);
  });

  it('Deveria buscar uma motorcycle pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(allMotorcycles[0]);
    // Act
    const result = await service.findById('6421d2ad8482ffdb749e8736');
    // Assert
    expect(result.message).to.deep.equal(allMotorcycles[0]);
  });

  it('Deveria lançar uma exceção quando o id não existe, para buscar', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(allMotorcycles[0]);
    // Act
    const result = await service.findById('6421d2ad8482ffdb749e87XX');
    // Assert
    expect(result.message).to.deep.equal({ message: InvalidMongoId });
  });

  it('Deveria atualizar uma motorcycle pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(allMotorcycles[0]);
    // Act
    const result = await service.update('6421d2ad8482ffdb749e8736', motorcycleInput);
    // Assert
    expect(result.message).to.deep.equal(allMotorcycles[0]);
  });

  it('Deveria lançar uma exceção quando o id não existe, para atualizar', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(allMotorcycles[0]);
    // Act
    const result = await service.update('6421d2ad8482ffdb749e87XX', motorcycleInput);
    // Assert
    expect(result.message).to.deep.equal({ message: InvalidMongoId });
  });

  it('Deveria deletar uma motorcycle pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(true);
    Sinon.stub(Model, 'findByIdAndDelete').resolves(true);
    // Act
    const result = await service.remove('6421d2ad8482ffdb749e8736');
    // Assert
    expect(result.message).to.deep.equal('');
  });

  it('Deveria lançar uma exceção quando o id não existe, para deletar', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(allMotorcycles[0]);
    // Act
    const result = await service.remove('6421d2ad8482ffdb749e8736');
    // Assert
    expect(result.message).to.deep.equal({ message: InvalidMongoId });
  });

  afterEach(function () {
    Sinon.restore();
  });
});
