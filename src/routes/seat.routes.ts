import { Router } from "express";
import { SeatController } from "../controllers/seat.controller";
import { authenticateToken } from "../middlewares/auth";

const router = Router();
const seatController = new SeatController();

// router.use(authenticateToken);

router.post("/seats", (req, res) => seatController.createSeat(req, res));

router.get("/seats/bus/:busId",(req, res) =>
  seatController.getSeatsByBusId(req, res)
);
router.put("/seats/status", (req, res) =>
  seatController.updateSeatStatus(req, res)
);
router.post("/seats/bulk", (req, res) =>
  seatController.bulkCreateSeats(req, res)
);

export default router;
