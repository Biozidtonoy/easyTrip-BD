# Bangladesh Tourism Platform – API Design

# API Standards

| Item           | Standard                                       |
| -------------- | ---------------------------------------------- |
| Base URL       | `/api/v1`                                      |
| Format         | JSON                                           |
| Authentication | Bearer JWT                                     |
| Error Model    | `error_code`, `message`, `trace_id`, `details` |
| Time Format    | ISO-8601 UTC                                   |

> **Path Convention:** All endpoints are relative to `/api/v1`.
>
> Example:
>
> `POST /auth/register` → `POST /api/v1/auth/register`

---

# Authentication APIs

| Endpoint                       | Method | Description                     | Auth   |
| ------------------------------ | ------ | ------------------------------- | ------ |
| `/auth/register`               | POST   | Register a new user             | Public |
| `/auth/login`                  | POST   | Authenticate user and issue JWT | Public |
| `/auth/logout`                 | POST   | Logout current user             | Bearer |
| `/auth/password-reset/request` | POST   | Request password reset          | Public |
| `/auth/password-reset/confirm` | POST   | Reset password                  | Public |

---

## Example: POST `/auth/register`

### Request

```json
{
  "full_name": "Mahfuz Antor",
  "email": "mahfuz@example.com",
  "password": "StrongPassword123!",
  "role": "traveler"
}
```

### Response 201

```json
{
  "id": 1,
  "email": "mahfuz@example.com",
  "message": "User registered successfully."
}
```

---

# User APIs

| Endpoint             | Method | Description              | Auth   |
| -------------------- | ------ | ------------------------ | ------ |
| `/users/me`          | GET    | Get current user profile | Bearer |
| `/users/me`          | PATCH  | Update profile           | Bearer |
| `/users/me/password` | PATCH  | Change password          | Bearer |

---

# Destination APIs

| Endpoint             | Method | Description           | Auth           |
| -------------------- | ------ | --------------------- | -------------- |
| `/destinations`      | GET    | List all destinations | Public         |
| `/destinations/{id}` | GET    | Destination details   | Public         |
| `/destinations`      | POST   | Create destination    | Bearer (Admin) |
| `/destinations/{id}` | PATCH  | Update destination    | Bearer (Admin) |
| `/destinations/{id}` | DELETE | Delete destination    | Bearer (Admin) |

---

## Destination Query Parameters

```
search
category
district
page
page_size
sort
```

---

# Hotel APIs

| Endpoint               | Method | Description    | Auth                 |
| ---------------------- | ------ | -------------- | -------------------- |
| `/hotels`              | GET    | List hotels    | Public               |
| `/hotels/{id}`         | GET    | Hotel details  | Public               |
| `/hotels`              | POST   | Register hotel | Bearer (Hotel Owner) |
| `/hotels/{id}`         | PATCH  | Update hotel   | Bearer (Owner)       |
| `/hotels/{id}`         | DELETE | Remove hotel   | Bearer (Owner)       |
| `/hotels/{id}/approve` | PATCH  | Approve hotel  | Bearer (Admin)       |

---

## Example: POST `/hotels`

### Request

```json
{
  "name": "Sea Breeze Resort",
  "destination_id": 5,
  "address": "Marine Drive, Cox's Bazar",
  "contact_number": "+8801712345678"
}
```

### Response 201

```json
{
  "id": 15,
  "approval_status": "Pending"
}
```

---

# Room APIs

| Endpoint                   | Method | Description      | Auth                 |
| -------------------------- | ------ | ---------------- | -------------------- |
| `/hotels/{hotel_id}/rooms` | GET    | List hotel rooms | Public               |
| `/hotels/{hotel_id}/rooms` | POST   | Add room         | Bearer (Hotel Owner) |
| `/rooms/{room_id}`         | PATCH  | Update room      | Bearer (Hotel Owner) |
| `/rooms/{room_id}`         | DELETE | Delete room      | Bearer (Hotel Owner) |

---

# Booking APIs

| Endpoint          | Method | Description                  | Auth                 |
| ----------------- | ------ | ---------------------------- | -------------------- |
| `/bookings`       | POST   | Create booking               | Bearer (Traveler)    |
| `/bookings`       | GET    | List current user's bookings | Bearer               |
| `/bookings/{id}`  | GET    | Booking details              | Bearer               |
| `/bookings/{id}`  | PATCH  | Cancel booking               | Bearer               |
| `/owner/bookings` | GET    | View hotel bookings          | Bearer (Hotel Owner) |

---

## Example: POST `/bookings`

### Request

```json
{
  "room_id": 10,
  "check_in_date": "2026-08-10",
  "check_out_date": "2026-08-13"
}
```

### Response 201

```json
{
  "booking_id": 120,
  "booking_status": "Confirmed"
}
```

---

# Review APIs

| Endpoint                     | Method | Description         | Auth   |
| ---------------------------- | ------ | ------------------- | ------ |
| `/reviews`                   | POST   | Submit review       | Bearer |
| `/reviews/{id}`              | PATCH  | Update review       | Bearer |
| `/reviews/{id}`              | DELETE | Delete review       | Bearer |
| `/destinations/{id}/reviews` | GET    | Destination reviews | Public |
| `/hotels/{id}/reviews`       | GET    | Hotel reviews       | Public |

---

# Administration APIs

| Endpoint                | Method | Description              | Auth           |
| ----------------------- | ------ | ------------------------ | -------------- |
| `/admin/users`          | GET    | List users               | Bearer (Admin) |
| `/admin/users/{id}`     | PATCH  | Suspend or activate user | Bearer (Admin) |
| `/admin/hotels/pending` | GET    | Pending hotel approvals  | Bearer (Admin) |
| `/admin/dashboard`      | GET    | Dashboard analytics      | Bearer (Admin) |

---

# Validation Rules

| Area           | Rule                                                |
| -------------- | --------------------------------------------------- |
| Authentication | Valid email format and password complexity          |
| Destination    | Name and location are required                      |
| Hotel          | Valid destination, address, and contact information |
| Room           | Positive room price and valid capacity              |
| Booking        | Check-out date must be later than check-in date     |
| Review         | Rating must be between 1 and 5                      |
| Pagination     | `page >= 1`, `1 <= page_size <= 100`                |

---

# Status Codes

| Code | Meaning               | Typical Usage                       |
| ---- | --------------------- | ----------------------------------- |
| 200  | OK                    | Successful request                  |
| 201  | Created               | Resource successfully created       |
| 204  | No Content            | Resource deleted                    |
| 400  | Bad Request           | Validation failed                   |
| 401  | Unauthorized          | Authentication required             |
| 403  | Forbidden             | Insufficient permissions            |
| 404  | Not Found             | Resource does not exist             |
| 409  | Conflict              | Duplicate resource or invalid state |
| 422  | Unprocessable Entity  | Semantic validation failure         |
| 500  | Internal Server Error | Unexpected server error             |

---

# Error Response Contract

```json
{
  "error_code": "VALIDATION_ERROR",
  "message": "Input validation failed.",
  "trace_id": "f5c89e4d-85d7-4d66-b8bc-6a3d0e6b1f14",
  "details": [
    {
      "field": "email",
      "issue": "Email already exists."
    }
  ]
}
```

---

# API-to-Requirement Mapping

| API Domain              | Requirement Coverage             |
| ----------------------- | -------------------------------- |
| Authentication          | FR-001 – FR-008                  |
| Destination Management  | FR-009 – FR-013                  |
| Hotel & Room Management | FR-014 – FR-024                  |
| Booking Management      | FR-016 – FR-024, FR-033 – FR-035 |
| Review Management       | FR-025 – FR-027                  |
| Administration          | FR-028 – FR-032, FR-037          |
| Security & Validation   | FR-038 – FR-040                  |
| Platform Quality        | NFR-001 – NFR-025                |
