import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Pricing, PricingSchema } from './price.entity';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false })
export class Car {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  modelName: string;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true, type: [PricingSchema] })
  prices: Pricing[];
}

export const CarSchema = SchemaFactory.createForClass(Car);

export type CarDocumentOverride = {
  prices: Types.DocumentArray<Pricing>;
};

export type CarDocument = HydratedDocument<Car, CarDocumentOverride>;
