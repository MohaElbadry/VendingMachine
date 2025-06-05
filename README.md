# Vending Machine Application

A modern, full-stack vending machine application built with Node.js backend API and React TypeScript frontend, featuring real-time balance updates, product management, and transaction handling with optimal change calculation.

## 🏗️ Architecture Overview

### System Architecture

```mermaid
graph TD
    subgraph Frontend
        UI[React UI Components]
        API[API Service]
        State[State Management]
        UI --> API
        API --> State
        State --> UI
    end

    subgraph Backend
        Router[Express Router]
        Controller[Controller Layer]
        Service[Service Layer]
        Model[Model Layer]
        Router --> Controller
        Controller --> Service
        Service --> Model
    end

    API --> Router
```

### Class Diagram

```mermaid
classDiagram
    class VendingMachine {
        +Array~Product~ products
        +number balance
        +Array~Product~ selectedProducts
        +insertCoin(value)
        +selectProduct(productId)
        +completeTransaction()
        +cancelTransaction()
    }

    class Product {
        +string id
        +string name
        +number price
        +boolean purchasable
    }

    class Coin {
        +number value
        +boolean isValid()
    }

    VendingMachine --> "0..*" Product
    VendingMachine --> "0..*" Coin
```


## 🔧 Technical Stack

### Backend

- **Node.js** with Express.js
- **RESTful API** design
- **Jest** for unit testing
- **Modular architecture** with clear separation

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Modern React patterns** (hooks, functional components)
- **Axios** for API requests
  
## 🚀 Features

### Backend API

- **RESTful API Design**: Clean, intuitive endpoints following REST principles
- **Modular Architecture**: Clear separation of concerns with MVC pattern
- **Design Patterns**: Singleton, Factory, and Service Layer patterns
- **Transaction Management**: Atomic transactions with optimal change calculation
- **Comprehensive Testing**: Unit tests with high coverage
- **Input Validation**: Robust validation for all inputs

### Frontend

- **Modern React with TypeScript**: Type-safe development with latest React features
- **Real-time Updates**: Live balance and product availability updates
- **Interactive UI**: Intuitive product selection and shopping cart
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 📁 Project Structure

```

├── backend/
│   ├── src/
│   │   ├── controllers/     # HTTP request handlers
│   │   ├── models/          # Core business logic and data models
│   │   ├── routes/          # API endpoint definitions
│   │   ├── services/        # Business logic layer
│   │   ├── tests/           # Unit tests
│   │   └── app.js           # Application entry point
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Cart.tsx     # Shopping cart component
│   │   │   ├── CoinInserter.tsx # Coin insertion interface
│   │   │   └── ProductList.tsx  # Product display grid
│   │   ├── services/
│   │   │   └── api.ts       # API integration service
│   │   └── App.tsx          # Main application component
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🛠️ Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Quick Start

1. **Clone and install dependencies:**

```bash
git clone https://github.com/MohaElbadry/VendingMachine
cd vending-machine
npm install
```

2. **Start the application:**

```bash
# Start both frontend and backend
npm start

# Or start them separately:
npm run start:api     # Start backend only (port 3000)
npm run start:front   # Start frontend only (port 5173)
```

3. **Access the application:**

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
# Backend tests
cd vending-machine-API
npm test
```

## 🔗 API Documentation

### Available Endpoints

| Method | Endpoint                          | Description                                 |
| ------ | --------------------------------- | ------------------------------------------- |
| GET    | `/api/products`                   | Get all products with purchasability status |
| POST   | `/api/coins`                      | Insert a coin into the machine              |
| GET    | `/api/balance`                    | Get current balance in the machine          |
| POST   | `/api/products/:productId/select` | Select a product by ID                      |
| POST   | `/api/transaction/complete`       | Complete transaction and dispense products  |
| POST   | `/api/transaction/cancel`         | Cancel transaction and refund money         |

### API Testing with cURL

#### 1. Get all products

```bash
curl http://localhost:3000/api/products

```

![](https://private-user-images.githubusercontent.com/92531732/451726813-87cf583f-1b69-436b-998a-8efaebc458d0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMDU1MzksIm5iZiI6MTc0OTEwNTIzOSwicGF0aCI6Ii85MjUzMTczMi80NTE3MjY4MTMtODdjZjU4M2YtMWI2OS00MzZiLTk5OGEtOGVmYWViYzQ1OGQwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA1VDA2MzM1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM2OWQ5OTg4YzI1NjNiODM3ZDgzNjAzYjhmMWMyZDkxN2EyNjcyNTRlYTVlNmQ0M2Q3MDU5YzE1NjY1MDdkNmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.45E9DlZNaySPJMTqx0UuVkzou4ldwh1hzWpKJkUvFMc)

#### 2. Insert a coin (5 MAD)

```bash
curl -X POST http://localhost:3000/api/coins \
  -H "Content-Type: application/json" \
  -d '{"value": 5}'
```

![](https://private-user-images.githubusercontent.com/92531732/451727075-0b546a75-9de8-4673-b33d-c81bf27845db.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMDU1NzAsIm5iZiI6MTc0OTEwNTI3MCwicGF0aCI6Ii85MjUzMTczMi80NTE3MjcwNzUtMGI1NDZhNzUtOWRlOC00NjczLWIzM2QtYzgxYmYyNzg0NWRiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA1VDA2MzQzMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM3ZTRlOGNkZmU0ZGFjMjdiMGY1NDM0NjFhYTY5MGRlM2QzMWM0Nzg0ZGZlNWM4MzY0Yzg2YjIyOWY2M2ZkZDEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.vrqMVWOlVBgImOef5Kz1m0xlzk2eFb9T_F0DRXmd7Tw)

#### 4. Select a product

```bash
curl -X POST http://localhost:3000/api/products/1/select \
  -H "Content-Type: application/json"
```

![](https://private-user-images.githubusercontent.com/92531732/451727256-b18cd479-4d49-436a-9e24-bf97d15a6e39.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMDU1OTgsIm5iZiI6MTc0OTEwNTI5OCwicGF0aCI6Ii85MjUzMTczMi80NTE3MjcyNTYtYjE4Y2Q0NzktNGQ0OS00MzZhLTllMjQtYmY5N2QxNWE2ZTM5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA1VDA2MzQ1OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVlZmQ4NTM3NTRlNjE2MDkzZjMzMGI0NGE3ZTJmN2U1ZmFjNjViNDcyZjA4ZWJhZjA0Yzc5OTBjMTU1YzRlZGEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.luWVGdDc9_heXKxoxZ-r1kwENjFZDNQy7f3QAISELpA)

#### 5. Complete transaction

```bash
curl -X POST http://localhost:3000/api/transaction/complete \
  -H "Content-Type: application/json"
```

![](https://private-user-images.githubusercontent.com/92531732/451727647-4e415632-483b-498a-ad7e-bd4b00f21afc.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMDUzNjYsIm5iZiI6MTc0OTEwNTA2NiwicGF0aCI6Ii85MjUzMTczMi80NTE3Mjc2NDctNGU0MTU2MzItNDgzYi00OThhLWFkN2UtYmQ0YjAwZjIxYWZjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA1VDA2MzEwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRkMmU5Yzk4ZGQ3NWUyM2JlNWM0Nzc4YWE1YjNkMTdiMTAzYmQ3Y2U1YWZmNmUyNzAzZTk5NGExNTUzMzFjZDEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.A4HGwm-RXi7544GYQythqnbFdF-aEe2UOOf6jBO8ztM)

#### 6. Cancel transaction

```bash
curl -X POST http://localhost:3000/api/transaction/cancel \
  -H "Content-Type: application/json"
```

![Main Ve](https://private-user-images.githubusercontent.com/92531732/451727876-9d668ef2-d354-4cdc-8690-fb7b6bf80790.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMDUzNjUsIm5iZiI6MTc0OTEwNTA2NSwicGF0aCI6Ii85MjUzMTczMi80NTE3Mjc4NzYtOWQ2NjhlZjItZDM1NC00Y2RjLTg2OTAtZmI3YjZiZjgwNzkwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA1VDA2MzEwNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI2YzllNmI1Y2RhMWY0ZDA3ZTU5YmFlZWNjY2U3ZDdjNDJjMjgzYzcxMWM0MGFhMDU1MTU3YzdhOGY0ZjM2YjYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.kZ350Bz84MexWGfSZDRDeT0JJajLO_KnJwsGAdbI5nA)

## 🎯 Usage Examples

### Scenario 1: Buy a single product

1. **Insert 5 MAD:**

   ```bash
   POST /api/coins
   { "value": 5 }
   ```

2. **Select a soda (3.5 MAD):**

   ```bash
   POST /api/products/1/select
   ```

3. **Complete the transaction:**
   ```bash
   POST /api/transaction/complete
   ```
   **Response:** Soda dispensed, 1.5 MAD change returned

### Scenario 2: Buy multiple products

1. **Insert 5 MAD + 2 MAD (total: 7 MAD)**
2. **Select soda (3.5 MAD) + TikTak (2 MAD)**
3. **Complete transaction**
4. **Result:** Both products dispensed, 1.5 MAD change returned

## 🖼️ Frontend Interface

### Main Interface & Product Selection and Cart

![Main Vending Machine Interface](https://private-user-images.githubusercontent.com/92531732/451723860-d6a45fce-9be5-4440-a96b-4be700fdacb2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMDQxODAsIm5iZiI6MTc0OTEwMzg4MCwicGF0aCI6Ii85MjUzMTczMi80NTE3MjM4NjAtZDZhNDVmY2UtOWJlNS00NDQwLWE5NmItNGJlNzAwZmRhY2IyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA1VDA2MTEyMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA5YTJmMWFkZWExMWVlZTVjNjg1ZTZiZDAyY2I1OTEyNTk0ZDdiNTQyOThhZjM3MTk1ZWQ2MmJjMDkyNzRhOWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ZYoHVVHsMNCLMAkOQI_7ahhcSq6n2P213qU_xq5hhJY)

### Transaction Completion

![Product Selection Interface](https://private-user-images.githubusercontent.com/92531732/451723983-26eec1dd-3902-41c6-87f0-be3d5895b6c5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMDQyNzksIm5iZiI6MTc0OTEwMzk3OSwicGF0aCI6Ii85MjUzMTczMi80NTE3MjM5ODMtMjZlZWMxZGQtMzkwMi00MWM2LTg3ZjAtYmUzZDU4OTViNmM1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA1VDA2MTI1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRlNTc0N2RlMTE2MWIzMzZjM2E0NjFmY2Q3ZDUwYjEzNzQxMWJhNDFjMmFhNmRhOTYwZTI4YjMyZjQ1ZTZlMTQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.MI5wVE8LPvSY8lZwqimV8hdM61WH4tkTNpCsrVwUXRU)

## 🧠 Design Decisions and Patterns

### 1. **Coin Management**

- **Valid denominations:** 0.5, 1, 2, 5, 10 MAD
- **Optimal change calculation:** Greedy algorithm for minimal coin count
- **Real-time balance updates:** Immediate UI feedback

### 2. **Product Management**

- **Dynamic availability:** Real-time purchase validation based on balance
- **Price-based validation:** Prevent selection of unaffordable items
- **Stock simulation:** Realistic vending machine behavior

### 3. **Transaction Flow**

- **Multi-product support:** Shopping cart functionality
- **Atomic transactions:** All-or-nothing transaction processing
- **Automatic change calculation:** Optimal coin distribution

### 4. **Error Handling**

- **Input validation:** Comprehensive validation for all user inputs
- **Clear error messages:** User-friendly error descriptions
- **Graceful failure recovery:** Robust error handling without crashes

### 5. **Architecture Patterns**

- **Singleton Pattern:** VendingMachineService ensures single instance
- **MVC Architecture:** Clean separation of concerns
- **Service Layer Pattern:** Business logic abstraction
- **Factory Pattern:** Product creation and management

## 🎯 Key Features Implemented

### Core Functionality

- ✅ Coin insertion with validation
- ✅ Product selection with balance checking
- ✅ Multi-product shopping cart
- ✅ Transaction completion with change calculation
- ✅ Transaction cancellation with full refund
- ✅ Real-time balance updates

### Additional Features

- ✅ Responsive design for all devices
- ✅ Comprehensive error handling
- ✅ Unit tests with good coverage
- ✅ Clean, maintainable code structure
- ✅ RESTful API design
- ✅ Modern React patterns

## 🚀 Future Enhancements

- History tracking of transactions
- User authentication and profiles
- admin interface for product management
- Payment integration (credit cards, mobile payments)
- Product inventory management
- Sales reporting and analytics
- Admin dashboard for configuration
- Multi-language support
- Advanced product recommendations

## 📄 License

This project is developed as part of a technical assessment and is available for review and evaluation purposes.

---

**Developed by Mohammed** | **Zenika  Technical Assessment**
