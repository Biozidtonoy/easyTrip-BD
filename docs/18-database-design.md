# Bangladesh Tourism Platform – Database Design

## Database Overview

**Engine:** PostgreSQL

**Model:** Relational Database Management System (RDBMS)

**Normalization:** Third Normal Form (3NF)

**Primary Key Strategy:** Auto-incrementing BIGINT (Identity)

**Time Handling:** UTC timestamps (`TIMESTAMP WITH TIME ZONE`), timezone conversion handled by the application layer.

---

# Database Tables

| Table        | Purpose                                                  |
| ------------ | -------------------------------------------------------- |
| Users        | Stores traveler, hotel owner, and administrator accounts |
| Destinations | Stores tourist destination information                   |
| Hotels       | Stores hotel information managed by hotel owners         |
| Rooms        | Stores room details, pricing, and availability           |
| Bookings     | Stores hotel reservation records                         |
| Reviews      | Stores traveler ratings and reviews                      |

---

# Table Design

## Users

| Column        | Type         | Constraints      |
| ------------- | ------------ | ---------------- |
| id            | BIGINT       | Primary Key      |
| full_name     | VARCHAR(100) | NOT NULL         |
| email         | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | TEXT         | NOT NULL         |
| role          | VARCHAR(20)  | NOT NULL         |
| phone         | VARCHAR(20)  | NULL             |
| profile_image | TEXT         | NULL             |
| is_active     | BOOLEAN      | DEFAULT TRUE     |
| created_at    | TIMESTAMP    | NOT NULL         |
| updated_at    | TIMESTAMP    | NOT NULL         |

---

## Destinations

| Column         | Type         | Constraints |
| -------------- | ------------ | ----------- |
| id             | BIGINT       | Primary Key |
| name           | VARCHAR(150) | NOT NULL    |
| description    | TEXT         | NOT NULL    |
| location       | VARCHAR(150) | NOT NULL    |
| district       | VARCHAR(100) | NOT NULL    |
| category       | VARCHAR(100) | NOT NULL    |
| featured_image | TEXT         | NULL        |
| created_at     | TIMESTAMP    | NOT NULL    |
| updated_at     | TIMESTAMP    | NOT NULL    |

---

## Hotels

| Column          | Type         | Constraints                    |
| --------------- | ------------ | ------------------------------ |
| id              | BIGINT       | Primary Key                    |
| owner_id        | BIGINT       | Foreign Key → Users(id)        |
| destination_id  | BIGINT       | Foreign Key → Destinations(id) |
| name            | VARCHAR(150) | NOT NULL                       |
| description     | TEXT         | NOT NULL                       |
| address         | TEXT         | NOT NULL                       |
| contact_number  | VARCHAR(20)  | NOT NULL                       |
| approval_status | VARCHAR(20)  | DEFAULT 'Pending'              |
| created_at      | TIMESTAMP    | NOT NULL                       |
| updated_at      | TIMESTAMP    | NOT NULL                       |

---

## Rooms

| Column              | Type          | Constraints              |
| ------------------- | ------------- | ------------------------ |
| id                  | BIGINT        | Primary Key              |
| hotel_id            | BIGINT        | Foreign Key → Hotels(id) |
| room_number         | VARCHAR(20)   | NOT NULL                 |
| room_type           | VARCHAR(50)   | NOT NULL                 |
| price_per_night     | DECIMAL(10,2) | NOT NULL                 |
| capacity            | INTEGER       | NOT NULL                 |
| availability_status | BOOLEAN       | DEFAULT TRUE             |
| created_at          | TIMESTAMP     | NOT NULL                 |
| updated_at          | TIMESTAMP     | NOT NULL                 |

---

## Bookings

| Column         | Type          | Constraints             |
| -------------- | ------------- | ----------------------- |
| id             | BIGINT        | Primary Key             |
| traveler_id    | BIGINT        | Foreign Key → Users(id) |
| room_id        | BIGINT        | Foreign Key → Rooms(id) |
| check_in_date  | DATE          | NOT NULL                |
| check_out_date | DATE          | NOT NULL                |
| total_price    | DECIMAL(10,2) | NOT NULL                |
| booking_status | VARCHAR(20)   | NOT NULL                |
| created_at     | TIMESTAMP     | NOT NULL                |
| updated_at     | TIMESTAMP     | NOT NULL                |

---

## Reviews

| Column         | Type      | Constraints                          |
| -------------- | --------- | ------------------------------------ |
| id             | BIGINT    | Primary Key                          |
| traveler_id    | BIGINT    | Foreign Key → Users(id)              |
| destination_id | BIGINT    | Foreign Key → Destinations(id), NULL |
| hotel_id       | BIGINT    | Foreign Key → Hotels(id), NULL       |
| rating         | INTEGER   | CHECK (rating BETWEEN 1 AND 5)       |
| review_text    | TEXT      | NOT NULL                             |
| created_at     | TIMESTAMP | NOT NULL                             |
| updated_at     | TIMESTAMP | NOT NULL                             |

---

# Relationship Summary

| Parent Table | Child Table | Relationship |
| ------------ | ----------- | ------------ |
| Users        | Hotels      | One-to-Many  |
| Users        | Bookings    | One-to-Many  |
| Users        | Reviews     | One-to-Many  |
| Destinations | Hotels      | One-to-Many  |
| Destinations | Reviews     | One-to-Many  |
| Hotels       | Rooms       | One-to-Many  |
| Hotels       | Reviews     | One-to-Many  |
| Rooms        | Bookings    | One-to-Many  |

---

# Data Integrity Strategy

* Primary keys uniquely identify every record.
* Foreign key constraints enforce referential integrity.
* Unique constraints prevent duplicate email addresses.
* Check constraints validate values such as review ratings.
* Database transactions guarantee consistency during booking operations.
* Cascading updates and restricted deletes preserve relational integrity.
* Role-Based Access Control (RBAC) is enforced at the application layer.

---

# Indexing Strategy

| Index                   | Purpose                        |
| ----------------------- | ------------------------------ |
| Users(email)            | Fast authentication lookups    |
| Hotels(destination_id)  | Retrieve hotels by destination |
| Hotels(owner_id)        | Hotel owner dashboard          |
| Rooms(hotel_id)         | Retrieve rooms for a hotel     |
| Bookings(traveler_id)   | Booking history                |
| Bookings(room_id)       | Room reservation lookup        |
| Reviews(destination_id) | Destination reviews            |
| Reviews(hotel_id)       | Hotel reviews                  |

---

# Sample Record (Hotel)

```json
{
  "id": 15,
  "owner_id": 3,
  "destination_id": 8,
  "name": "Sea Breeze Resort",
  "description": "Luxury beachfront resort located near Cox's Bazar.",
  "address": "Marine Drive, Cox's Bazar",
  "contact_number": "+8801712345678",
  "approval_status": "Approved",
  "created_at": "2026-07-17T10:30:00Z",
  "updated_at": "2026-07-17T10:30:00Z"
}
```

---

# Database Performance Strategy

| Area                  | Strategy                                           |
| --------------------- | -------------------------------------------------- |
| Query Performance     | Proper indexing on frequently searched columns     |
| Pagination            | LIMIT and OFFSET pagination                        |
| Joins                 | Optimized foreign key relationships                |
| Transactions          | ACID-compliant transactions for booking operations |
| Connection Management | Database connection pooling                        |

---

# Backup, Recovery, and Security

| Control           | Approach                                               |
| ----------------- | ------------------------------------------------------ |
| Backup            | Automated PostgreSQL backups                           |
| Disaster Recovery | Scheduled backup restoration procedures                |
| Encryption        | TLS for data in transit and encrypted database storage |
| Access Control    | Database roles with least-privilege permissions        |
| Auditing          | Application logs and PostgreSQL activity logging       |

---

# Relational Database Design Discussion

The Bangladesh Tourism Platform follows a normalized relational database design to minimize redundancy and maintain data consistency. Entity relationships are enforced through foreign key constraints, enabling efficient joins between users, destinations, hotels, rooms, bookings, and reviews.

This design supports secure transaction processing, reliable booking management, scalable querying, and straightforward maintenance while providing a solid foundation for future enhancements such as payment integration, transportation services, and personalized travel recommendations.
