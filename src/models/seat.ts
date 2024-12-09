import mongoose, { Document, Schema } from 'mongoose';

export interface ISeat extends Document {
  busId: string;
  seatNumber: string;
  status: 'free' | 'booked';
  color: 'green' | 'yellow' | 'red';
  createdAt: Date;
  updatedAt: Date;
}

const seatSchema = new Schema({
  busId: {
    type: String,
    required: true,
    index: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['free', 'booked'],
    default: 'free'
  },
  color: {
    type: String,
    enum: ['green', 'yellow', 'red'],
    default: 'green'
  }
}, {
  timestamps: true
});

// Compound index for busId and seatNumber
seatSchema.index({ busId: 1, seatNumber: 1 }, { unique: true });

export const Seat = mongoose.model<ISeat>('Seat', seatSchema);