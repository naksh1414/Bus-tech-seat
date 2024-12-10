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
    status: 'FREE' | 'BOOKED',
    color: 'GREEN' | 'YELLOW' | 'RED'
  ): Promise<ISeat | null> {
    return await Seat.findOneAndUpdate(
      { busId, seatNumber },
      { status, color },
      { new: true }
    );
  }

  async bulkCreateSeats(busId: string, seatCount: number): Promise<ISeat[]> {
    const existingSeats = await Seat.find({ busId });
    const existingSeatCount = existingSeats.length;
    
    const newSeats = Array.from({ length: seatCount }, (_, index) => ({
      busId,
      seatNumber: (existingSeatCount + index + 1).toString(),
      status: 'BOOKED',
      color: 'RED'
    }));

    return await Seat.insertMany(newSeats);
  }
}