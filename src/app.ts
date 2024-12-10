import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import seatRoutes from "./routes/seat.routes";
import { Response } from "express";

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", seatRoutes);


app.listen(PORT, () => {
  console.log(`Seat Management Service running on port ${PORT}`);
});
