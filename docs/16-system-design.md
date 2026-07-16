# Bangladesh Tourism Platform – System Design

## High-Level Design

The Bangladesh Tourism Platform follows a modern layered architecture that separates user interaction, business logic, and data persistence to improve scalability, maintainability, and security.

* **Presentation Layer:** React (TypeScript) Single Page Application (SPA)
* **Application Layer:** FastAPI backend providing RESTful APIs, authentication, booking management, and business logic
* **Data Layer:** PostgreSQL relational database for persistent storage
* **Platform Layer:** Dockerized deployment with monitoring and logging support

---

# Architecture Diagram

```mermaid
flowchart LR

    U[Traveler / Hotel Owner / Administrator]

    FE[React TypeScript Frontend]

    API[FastAPI Backend]

    DB[(PostgreSQL)]

    AUTH[JWT Authentication]

    EMAIL[Email Service]

    LOG[Logging & Monitoring]

    U --> FE
    FE --> API

    API --> AUTH
    API --> DB
    API --> EMAIL
    API --> LOG
```

---

# Component Diagram

```mermaid
flowchart TD

subgraph Frontend

C1[Authentication Module]

C2[Destination Module]

C3[Hotel Module]

C4[Booking Module]

C5[User Dashboard]

C6[Admin Dashboard]

end

subgraph Backend_FastAPI

B1[Authentication Controller]

B2[Destination Controller]

B3[Hotel Controller]

B4[Booking Controller]

B5[Review Controller]

B6[Admin Controller]

S1[Authentication Service]

S2[Destination Service]

S3[Hotel Service]

S4[Booking Service]

S5[Review Service]

S6[Admin Service]

R1[Repository Layer]

end

C1 --> B1

C2 --> B2

C3 --> B3

C4 --> B4

C5 --> B5

C6 --> B6

B1 --> S1 --> R1

B2 --> S2 --> R1

B3 --> S3 --> R1

B4 --> S4 --> R1

B5 --> S5 --> R1

B6 --> S6 --> R1
```

---

# Booking Data Flow

```mermaid
sequenceDiagram

participant Traveler

participant UI as React UI

participant API as FastAPI

participant DB as PostgreSQL

participant Email as Email Service

Traveler->>UI: Book Hotel

UI->>API: POST /api/bookings

API->>DB: Validate room availability

DB-->>API: Room available

API->>DB: Save booking

DB-->>API: Booking ID

API->>Email: Send booking confirmation

Email-->>Traveler: Confirmation Email

API-->>UI: 201 Created
```

---

# Security Architecture

| Layer    | Control                                                               |
| -------- | --------------------------------------------------------------------- |
| Identity | JWT Authentication with role-based access control (RBAC)              |
| API      | Protected endpoints, request validation, and authorization middleware |
| Data     | Password hashing (bcrypt), TLS encryption, input validation           |
| Database | Foreign key constraints, transactions, and referential integrity      |
| Audit    | Administrative activity logging and security event recording          |

---

# Deployment Architecture

```mermaid
flowchart TD

Client[Web Browser]

subgraph Docker Environment

Frontend[React Application]

Backend[FastAPI Application]

Postgres[(PostgreSQL)]

end

Email[Email Service]

Logs[Logging & Monitoring]

Client --> Frontend

Frontend --> Backend

Backend --> Postgres

Backend --> Email

Backend --> Logs
```

---

# Technology Stack

| Layer             | Technology                      |
| ----------------- | ------------------------------- |
| Frontend          | React, TypeScript, Tailwind CSS |
| Backend           | Python FastAPI                  |
| Authentication    | JWT                             |
| Database          | PostgreSQL                      |
| ORM               | SQLAlchemy                      |
| API Documentation | Swagger UI / OpenAPI            |
| Containerization  | Docker                          |
| Version Control   | Git & GitHub                    |

---

# Design Principles

* Layered architecture with clear separation of concerns.
* RESTful API design following standard HTTP conventions.
* Role-Based Access Control (Traveler, Hotel Owner, Administrator).
* Modular backend structure using controllers, services, repositories, and models.
* Normalized relational database design.
* Secure authentication and authorization using JWT.
* Containerized deployment for portability and consistency.
* Scalable architecture that supports future enhancements such as payment integration and transportation booking.
