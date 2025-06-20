import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Pricing {
  @Prop({ required: true, enum: ['peak', 'mid', 'off'] })
  pricingName: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Decimal128, min: 0 })
  value: mongoose.Types.Decimal128;
}

export const PricingSchema = SchemaFactory.createForClass(Pricing);
