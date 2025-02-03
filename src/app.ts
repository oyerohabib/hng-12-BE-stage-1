import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { isPrime, isPerfect, getProperties, digitSum } from "./utils";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "alive",
    message: "Number Classification API is running",
  });
});

// Main classification endpoint
app.get(
  "/api/classify-number",
  (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const numberStr = req.query.number;

        // Input validation
        if (!numberStr) {
          return res.status(400).json({
            number: null,
            error: true,
            message: "Number parameter is required",
          });
        }

        const number = parseInt(numberStr as string);

        // Check if the input is a valid integer
        if (isNaN(number) || !Number.isInteger(number)) {
          return res.status(400).json({
            number: numberStr,
            error: true,
            message: "Invalid number provided",
          });
        }

        try {
          // Fetch fun fact from numbersapi.com
          const funFactResponse = await axios.get(
            `http://numbersapi.com/${number}/math`
          );
          const funFact = funFactResponse.data;

          // Calculate all properties
          const response = {
            number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            properties: getProperties(number),
            digit_sum: digitSum(number),
            fun_fact: funFact,
          };

          res.json(response);
        } catch (error) {
          // If numbers API fails, still return the mathematical properties
          const response = {
            number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            properties: getProperties(number),
            digit_sum: digitSum(number),
            fun_fact: `${number} is a number`, // fallback fun fact
          };

          res.json(response);
        }
      } catch (error) {
        next(error);
      }
    })();
  }
);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
