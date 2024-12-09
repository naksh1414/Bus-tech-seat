import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Authentication token required" });
    return; // Ensure the function doesn't proceed
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jaimahakal");
    // req.user = decoded; // Ensure this is properly typed (see previous step)
    console.log(decoded);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
