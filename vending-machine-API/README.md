# Vending Machine API

A modular and testable API for a vending machine system, implementing good software architecture practices and object-oriented design principles.

## Features

- Insert valid coins (0.5, 1, 2, 5, 10 MAD)
- View available products with purchase availability based on current balance
- Select products if sufficient funds are available
- Complete transactions with optimal change calculation
- Cancel transactions with full refund

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
vending-machine-api/
├── src/
│   ├── controllers/     # HTTP request handlers
│   ├── models/          # Core business logic and data models
│   ├── routes/          # API endpoint definitions
│   ├── services/        # Business logic layer
│   ├── tests/           # Unit tests
│   └── app.js           # Application entry point
├── package.json
└── README.md
```

## Design Patterns Used

- **Singleton Pattern**: Used in the VendingMachineService to ensure only one instance exists
- **MVC Architecture**: Clear separation between Models, Controllers, and Routes
- **Service Layer Pattern**: Abstraction between controllers and models
- **Factory Pattern**: Product creation in the VendingMachine model

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd vending-machine-api
npm install
```

### Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on port 3000 by default (http://localhost:3000).

### Running Tests

```bash
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vending-machine/products` | Get all products with purchasability status |
| POST | `/api/vending-machine/coins` | Insert a coin into the machine |
| GET | `/api/vending-machine/balance` | Get current balance in the machine |
| POST | `/api/vending-machine/products/:productId/select` | Select a product by ID |
| POST | `/api/vending-machine/transaction/complete` | Complete transaction and dispense products |
| POST | `/api/vending-machine/transaction/cancel` | Cancel transaction and refund money |

## Example Usage

### Scenario 1: Buy a single product

1. Insert 5 MAD:
   ```
   POST /api/vending-machine/coins
   { "value": 5 }
   ```

2. Select a soda (3.5 MAD):
   ```
   POST /api/vending-machine/products/1/select
   ```

3. Complete the transaction:
   ```
   POST /api/vending-machine/transaction/complete
   ```
   Response: Soda dispensed, 1.5 MAD change returned

### Scenario 2: Buy multiple products

1. Insert 5 MAD:
   ```
   POST /api/vending-machine/coins
   { "value": 5 }
   ```

2. Insert 2 MAD:
   ```
   POST /api/vending-machine/coins
   { "value": 2 }
   ```

3. Select a soda (3.5 MAD):
   ```
   POST /api/vending-machine/products/1/select
   ```

4. Select TikTak (2 MAD):
   ```
   POST /api/vending-machine/products/3/select
   ```

5. Complete the transaction:
   ```
   POST /api/vending-machine/transaction/complete
   ```
   Response: Soda and TikTak dispensed, 0.5 MAD change returned
