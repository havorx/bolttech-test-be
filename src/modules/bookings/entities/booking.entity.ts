import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Booking {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Car' })
  car: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  drivingLicense: string;

  @Prop({ required: true })
  drivingLicenseExpiry: Date;

  @Prop({ required: true, index: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.Decimal128, min: 0 })
  totalPrice: number;
}

export type BookingDocument = Booking & Document;

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.index({ startDate: 1, endDate: 1 });
