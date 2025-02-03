# Number Classification API

This API takes a number and returns interesting mathematical properties about it, along with a fun fact.

## Features

- Determines if a number is prime
- Determines if a number is perfect
- Calculates various number properties (armstrong, odd/even)
- Provides digit sum
- Fetches fun facts about numbers

## API Endpoint

```
GET /api/classify-number?number=371
```

### Success Response (200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request)

```json
{
  "number": "alphabet",
  "error": true
}
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Technologies Used

- Node.js
- Express
- TypeScript
- Axios (for external API calls)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
```

## License

ISC
