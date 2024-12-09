import { Request, Response } from "express";
import { SeatService } from "../services/seat.service";

const seatService = new SeatService();

export class SeatController {
  async createSeat(req: Request, res: Response): Promise<void> {
    try {
      const seat = await seatService.createSeat(req.body);
      res.status(201).json(seat);
    } catch (error) {
      res.status(400).json({ message: "Error creating seat", error });
    }
  }

  async getSeatsByBusId(req: Request, res: Response): Promise<void> {
    try {
      const seats = await seatService.getSeatsByBusId(req.params.busId);
      res.json(seats);
    } catch (error) {
      res.status(400).json({ message: "Error fetching seats", error });
    }
  }

  async updateSeatStatus(req: Request, res: Response): Promise<void> {
    try {
      const { busId, seatNumber, status, color } = req.body;
      const updatedSeat = await seatService.updateSeatStatus(
        busId,
        seatNumber,
        status,
        color
      );
      if (!updatedSeat) {
        res.status(404).json({ message: "Seat not found" });
      }
      res.json(updatedSeat);
    } catch (error) {
      res.status(400).json({ message: "Error updating seat status", error });
    }
  }

  async bulkCreateSeats(req: Request, res: Response): Promise<void> {
    try {
      const { busId, seatCount } = req.body;
      const seats = await seatService.bulkCreateSeats(busId, seatCount);
      res.status(201).json(seats);
    } catch (error) {
      res.status(400).json({ message: "Error creating seats", error });
    }
  }
}
