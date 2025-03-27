# Calculator Microservice (Enhanced)

This is an enhanced calculator microservice built with Node.js and Express.js. It provides basic arithmetic operations (addition, subtraction, multiplication, division) and now includes exponentiation, square root, and modulo operations.

## Features

* **Basic Arithmetic:**
    * `/add`: Adds two numbers.
    * `/subtract`: Subtracts two numbers.
    * `/multiply`: Multiplies two numbers.
    * `/divide`: Divides two numbers.
* **Advanced Arithmetic:**
    * `/exponentiate`: Calculates the base raised to the power of the exponent.
    * `/sqrt`: Calculates the square root of a non-negative number.
    * `/modulo`: Calculates the remainder of a division.
* **Input Validation:** Each endpoint performs basic input validation and returns a `400 Bad Request` error for invalid input.
* **Logging:** Uses Winston for logging incoming requests, outgoing responses, performed operations, warnings, and errors to the console and log files (`logs/combined.log` and `logs/error.log`).

## Prerequisites

* [Node.js](https://nodejs.org/en/download/) installed on your system.
* [npm](https://www.npmjs.com/) (usually installed with Node.js).
* [Git](https://github.com) (for version control).
* [Visual Studio Code](https://code.visualstudio.com/) (for development).

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SaiPriyamvada21/sit737-2025-prac4c
    cd sit737-2025-prac4c
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    (This will install the `express` and `winston` packages)

3.  **Start the microservice:**
    ```bash
    node server.js
    ```

The service will start and listen on port `3000`.

## API Endpoints

| Operation      | Endpoint     | Method | Input Example                        | Response Example        |
|----------------|--------------|--------|--------------------------------------|-------------------------|
| Addition       | `/add`       | GET    | `/add?num1=5&num2=3`                 | `{"result":8}`          |
| Subtraction    | `/subtract`  | GET    | `/subtract?num1=10&num2=4`            | `{"result":6}`          |
| Multiplication | `/multiply` | GET    | `/multiply?num1=6&num2=7`             | `{"result":42}`         |
| Division       | `/divide`    | GET    | `/divide?num1=15&num2=3`              | `{"result":5}`          |
| Exponentiation | `/exponentiate`| GET    | `/exponentiate?base=2&exponent=3`   | `{"result":8}`          |
| Square Root    | `/sqrt`      | GET    | `/sqrt?num=16`                       | `{"result":4}`          |
| Modulo         | `/modulo`    | GET    | `/modulo?num1=10&num2=3`             | `{"result":1}`          |

## Error Handling

The microservice implements basic input validation for each endpoint. Invalid input will result in a `400 Bad Request` response with a descriptive error message in JSON format. The service also logs warnings and errors using Winston.

## Logging

The application uses Winston for logging information, warnings, and errors. Logs are written to the console and the following files in the `logs` directory:

* `error.log`: Contains only error-level logs.
* `combined.log`: Contains all logs (info, warn, error).

The `logs` directory will be created automatically if it doesn't exist.
