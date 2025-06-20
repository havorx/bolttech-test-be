# Bolt Car Rental – Backend

This is the backend service for the **Bolt Car Rental** system. It is built using [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/). The backend provides APIs to manage cars, seasonal pricing, and customer bookings.

---

## Features

- Fetch available cars with seasonal pricing logic:
  - Peak: June 1 – September 14
  - Mid: March 1 – May 31 and September 15 – October 31
  - Off: November 1 – February 29
- Book a car with:
  - Date range validation
  - Driving license expiry check
  - Stock decrement per booking
- Fetch booking details by ID

---

## Booking Validation Rules

- Prevents bookings with expired driving licenses (must be valid through the booking period)
- Prevents overbooking based on car stock
- Allows duplicate bookings (by same user/date)

---

## Technologies Used

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/havorx/bolttech-test-backend.git
cd bolt-car-rental-backend
```

### 2. Run with Docker Compose

Make sure you have Docker and Docker Compose installed.

```bash
docker-compose up -d
```

This will:

- Build the backend using the existing `Dockerfile`
- Start MongoDB on `mongodb://localhost:27017/
- Start the NestJS backend on `http://localhost:3000`

### 3. Install dependencies (if running locally without Docker)

```bash
yarn install
```

### 4. Run the development server

```bash
yarn start:dev
```

---

## Scripts

- `yarn start:dev` – Start the server in watch mode
- `yarn build` – Build the project
- `yarn start` – Run the compiled app
- `yarn test` – Run unit tests
- `yarn lint` – Lint the codebase
- `yarn format` – Format code using Prettier

---

## Testing

- Unit tests are written with **Jest**
- Service and repository layers use **mocks**
- Run tests with:

```bash
yarn test
```

---

## Docker Notes

This project includes a working `Dockerfile` and a `docker-compose.yml` for local development.

Services included:

- `backend`: Runs the NestJS app (built from the local `Dockerfile`)
- `mongo`: Runs MongoDB with volume persistence

Example MongoDB connection URI inside containers:

```
MONGODB_CONNECTION_STRING=mongodb://mongo:27017/
```

For local development with tools like Compass or Postman, use:

```
mongodb://localhost:27017/
```
