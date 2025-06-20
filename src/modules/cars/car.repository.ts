import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { carSeedData } from './seeds/car.seed';
import { GetCarsQueryDto } from './dto/get-cars.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarRepository implements OnModuleInit {
  constructor(
    @InjectModel(Car.name)
    private readonly carModel: Model<Car>,
  ) { }

  async onModuleInit() {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const count = await this.carModel.estimatedDocumentCount();
    if (count === 0) {
      await this.carModel.insertMany(carSeedData);
      console.log('Seeded car data into DB');
    } else {
      console.log('Car collection already contains data, skipping seed.');
    }
  }

  async findAll(dto: GetCarsQueryDto) {
    const filter: Record<string, unknown> = {};

    if (dto.availableOnly) {
      filter.stock = { $gt: 0 };
    }
    return await this.carModel.find(filter).lean().exec();
  }

  async findById(id: string) {
    return await this.carModel
      .findById(new mongoose.Types.ObjectId(id))
      .lean()
      .exec();
  }

  async updateOneById(
    carId: string,
    updateFields: Partial<Pick<Car, 'brand' | 'modelName' | 'stock'>>,
  ): Promise<void> {
    await this.carModel.updateOne(
      { _id: new mongoose.Types.ObjectId(carId) },
      { $set: updateFields },
    );
  }

  async decrementStock(carId: string): Promise<void> {
    await this.carModel.updateOne(
      { _id: new mongoose.Types.ObjectId(carId), stock: { $gt: 0 } },
      { $inc: { stock: -1 } },
    );
  }
}
