import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import {
  isPrime,
  isPerfect,
  getProperties,
  digitSum,
  isValidInteger,
} from "./utils";

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

        // Validate if it's a proper integer
        if (!isValidInteger(numberStr as string)) {
          return res.status(400).json({
            number: numberStr,
            error: true,
            message: "Invalid number format. Please provide a valid integer.",
          });
        }

        const number = parseInt(numberStr as string);

        // Check for integer overflow
        if (!Number.isSafeInteger(number)) {
          return res.status(400).json({
            number: numberStr,
            error: true,
            message: "Number is outside the safe integer range",
          });
        }

        try {
          // Fetch fun fact from numbersapi.com
          const funFactResponse = await axios.get(
            `http://numbersapi.com/${Math.abs(number)}/math`
          );
          let funFact = funFactResponse.data;

          // If it's a negative number, modify the fun fact
          if (number < 0) {
            funFact = funFact.replace(
              Math.abs(number).toString(),
              number.toString()
            );
          }

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
            fun_fact:
              number < 0
                ? `${number} is the negative of ${Math.abs(number)}`
                : `${number} is a number`,
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
