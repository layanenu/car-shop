import { Model, Schema, model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  async create(obj: T) {
    return this.model.create({ ...obj });
  }

  async findAll() {
    return this.model.find();
  }

  async findById(id: string) {
    try {
      const carById = await this.model.findById(id);
      return carById;
    } catch (e) {
      return null;
    }
  }

  async update(id: string, body: Partial<T>) {
    try {
      const carUpdate = await this.model.findByIdAndUpdate(id, body, { new: true });
      return carUpdate;
    } catch (error) {
      return null;
    }
  }

  async remove(id: string) {
    const carById = await this.findById(id);
    if (!carById) return null;
    await this.model.findByIdAndDelete(id);
    return true;
  }
}

export default AbstractODM;