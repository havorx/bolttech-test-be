import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { Booking, BookingDocument } from './entities/booking.entity';
import { CarDocument } from '../cars/entities/car.entity';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<Booking>,
  ) { }

  async create(
    data: Omit<Booking, 'car'> & { car: string },
  ): Promise<BookingDocument> {
    const created = new this.bookingModel({
      ...data,
      car: new mongoose.Types.ObjectId(data.car),
    });
    return await created.save();
  }

  async findOne(filter: FilterQuery<BookingDocument>): Promise<Booking | null> {
    const query = this.bookingModel.findOne(filter);
    return await query.lean().exec();
  }

  async findById(id: string) {
    const booking = await this.bookingModel
      .findById(new mongoose.Types.ObjectId(id))
      .populate<{ car: CarDocument }>('car')
      .lean()
      .exec();

    if (!booking) {
      return;
    }

    return {
      email: booking.email,
      id: booking._id,
      car: {
        id: booking.car._id.toString(),
        brand: booking.car.brand,
        modelName: booking.car.modelName,
      },
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalPrice: booking.totalPrice.toString(),
    };
  }
}
