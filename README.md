# Bus Tech — Seat Service

The seat management microservice of **Bus Tech**, an automated bus scheduling and operations
platform that won **Smart India Hackathon 2024**. It tracks every seat on every bus and whether
it is free or booked.

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-4-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)

## Part of the Bus Tech platform

| Repository | Role |
| --- | --- |
| [Bus-tech-bus](https://github.com/naksh1414/Bus-tech-bus) | Bus fleet, capacity and route assignment |
| **Bus-tech-seat** (this repo) | Seat inventory and booking status |
| [Bus-tech-user](https://github.com/naksh1414/Bus-tech-user) | Users, authentication and roles |
| [Bus-tech-Admin](https://github.com/naksh1414/Bus-tech-Admin) | Admin dashboard |

## API

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/seats` | Create a seat |
| `POST` | `/seats/bulk` | Create many seats for a bus in one request |
| `GET` | `/seats/bus/:busId` | All seats for a bus |
| `PUT` | `/seats/status` | Mark a seat as `FREE` or `BOOKED` |

## Data model

Each seat stores `busId`, `seatNumber`, a `status` of `FREE` or `BOOKED`, and a `color`
(`GREEN`, `YELLOW`, `RED`) used by the UI to show availability at a glance.

A **compound unique index on `(busId, seatNumber)`** means a bus can never have two seats with
the same number, even if two requests arrive at once. The database enforces it, not just the
application.

## Structure

```
src/
├── app.ts            # Express app and startup
├── routes/           # HTTP routes
├── controllers/      # request/response handling
├── services/         # business logic
├── models/           # Mongoose schema and indexes
├── middlewares/      # JWT authentication middleware
└── config/           # database connection
```

## Run it locally

Requires Node.js 18+ and MongoDB (local or Docker).

```bash
git clone https://github.com/naksh1414/Bus-tech-seat.git
cd Bus-tech-seat
npm install

# optional: a local MongoDB
docker run -d -p 27017:27017 --name mongo mongo

npm run dev        # development with auto-reload
# or
npm run build && npm start
```

The service listens on `http://localhost:8000` by default.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `8000` | HTTP port |
| `MONGODB_URI` | `mongodb://localhost:27017/seat-management` | MongoDB connection string |
| `JWT_SECRET` | none (set this) | Secret used to verify access tokens |

## Author

Nakshatra Manglik · [nakshatramanglik14@gmail.com](mailto:nakshatramanglik14@gmail.com) ·
[GitHub](https://github.com/naksh1414)
