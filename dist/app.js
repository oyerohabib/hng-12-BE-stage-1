"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get("/", (_req, res) => {
    res.json({
        status: "alive",
        message: "Number Classification API is running",
    });
});
// Main classification endpoint
app.get("/api/classify-number", (req, res, next) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
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
            if (!(0, utils_1.isValidInteger)(numberStr)) {
                return res.status(400).json({
                    number: numberStr,
                    error: true,
                    message: "Invalid number format. Please provide a valid integer.",
                });
            }
            const number = parseInt(numberStr);
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
                const funFactResponse = yield axios_1.default.get(`http://numbersapi.com/${Math.abs(number)}/math`);
                let funFact = funFactResponse.data;
                // If it's a negative number, modify the fun fact
                if (number < 0) {
                    funFact = funFact.replace(Math.abs(number).toString(), number.toString());
                }
                // Calculate all properties
                const response = {
                    number,
                    is_prime: (0, utils_1.isPrime)(number),
                    is_perfect: (0, utils_1.isPerfect)(number),
                    properties: (0, utils_1.getProperties)(number),
                    digit_sum: (0, utils_1.digitSum)(number),
                    fun_fact: funFact,
                };
                res.json(response);
            }
            catch (error) {
                // If numbers API fails, still return the mathematical properties
                const response = {
                    number,
                    is_prime: (0, utils_1.isPrime)(number),
                    is_perfect: (0, utils_1.isPerfect)(number),
                    properties: (0, utils_1.getProperties)(number),
                    digit_sum: (0, utils_1.digitSum)(number),
                    fun_fact: number < 0
                        ? `${number} is the negative of ${Math.abs(number)}`
                        : `${number} is a number`,
                };
                res.json(response);
            }
        }
        catch (error) {
            next(error);
        }
    }))();
});
// Error handling middleware
app.use((err, _req, res, _next) => {
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
