import mongoose, { Document, Schema } from 'mongoose';

export interface ISeat extends Document {
  busId: string;
  seatNumber: string;
  status: 'FREE' | 'BOOKED';
  color: 'GREEN' | 'YELLOW' | 'RED';
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
    enum: ['FREE', 'BOOKED'],
    default: 'FREE'
  },
  color: {
    type: String,
    enum: ['GREEN', 'YELLOW', 'RED'],
    default: 'GREEN'
  }
}, {
  timestamps: true
});

// Compound index for busId and seatNumber
seatSchema.index({ busId: 1, seatNumber: 1 }, { unique: true });

export const Seat = mongoose.model<ISeat>('Seat', seatSchema);