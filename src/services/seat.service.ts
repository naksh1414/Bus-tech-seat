import { Seat, ISeat } from '../models/seat';

export class SeatService {
  async createSeat(seatData: Partial<ISeat>): Promise<ISeat> {
    const seat = new Seat(seatData);
    return await seat.save();
  }

  async getSeatsByBusId(busId: string): Promise<ISeat[]> {
    return await Seat.find({ busId });
  }

  async updateSeatStatus(
    busId: string,
    seatNumber: string,
    status: 'free' | 'booked',
    color: 'green' | 'yellow' | 'red'
  ): Promise<ISeat | null> {
    return await Seat.findOneAndUpdate(
      { busId, seatNumber },
      { status, color },
      { new: true }
    );
  }

  async bulkCreateSeats(busId: string, seatCount: number): Promise<ISeat[]> {
    const seats = Array.from({ length: seatCount }, (_, index) => ({
      busId,
      seatNumber: (index + 1).toString(),
      status: 'free',
      color: 'green'
    }));

    return await Seat.insertMany(seats);
  }
}