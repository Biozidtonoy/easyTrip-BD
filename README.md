# EasyTrip BD

A full-stack Bangladesh tourism and hotel booking platform that connects travelers with hotels and provides hotel owners with tools to manage their hotels, rooms, room images, and bookings.

EasyTrip BD is designed as a role-based web application with three primary user roles:

- Traveler
- Hotel Owner
- Administrator

The platform allows travelers to discover destinations, explore hotels and rooms, make bookings, and manage their reservations. Hotel owners can manage their hotels, rooms, room images, and booking requests through a dedicated dashboard.

---

## Table of Contents

- [Overview]\(#overview)
- [Key Features]\(#key-features)
- [User Roles]\(#user-roles)
- [Application Workflow]\(#application-workflow)
- [Technology Stack]\(#technology-stack)
- [System Architecture]\(#system-architecture)
- [Project Structure]\(#project-structure)
- [Database Design]\(#database-design)
- [Authentication and Authorization]\(#authentication-and-authorization)
- [Booking Workflow]\(#booking-workflow)
- [Room Management]\(#room-management)
- [Room Image Management]\(#room-image-management)
- [API Documentation]\(#api-documentation)
- [Environment Variables]\(#environment-variables)
- [Local Development Setup]\(#local-development-setup)
- [Running the Backend]\(#running-the-backend)
- [Running the Frontend]\(#running-the-frontend)
- [Database Migrations]\(#database-migrations)
- [Testing the API]\(#testing-the-api)
- [Deployment]\(#deployment)
- [Git Workflow]\(#git-workflow)
- [Project Documentation]\(#project-documentation)
- [Current Status]\(#current-status)
- [Future Improvements]\(#future-improvements)
- [Contributing]\(#contributing)
- [License]\(#license)

---

# Overview

EasyTrip BD is a tourism-focused web application built for Bangladesh.

The main goal of the platform is to make it easier for travelers to:

- Discover destinations
- Explore hotels
- View available rooms
- View room images
- Make hotel room bookings
- Manage existing bookings
- Track booking status

At the same time, hotel owners can:

- Manage their hotels
- Create and manage rooms
- Upload room images
- Replace room images
- Delete room images
- View bookings for their hotels
- Confirm booking requests
- Reject booking requests

The application follows a REST API architecture where the React frontend communicates with a FastAPI backend.

---

# Key Features

## Traveler Features

- User registration and login
- JWT-based authentication
- Destination browsing
- Hotel browsing
- Room browsing
- Room availability information
- Room image viewing
- Room booking
- Automatic booking reference generation
- Automatic booking price calculation
- Booking date validation
- Booking conflict prevention
- View personal bookings
- Edit pending bookings
- Cancel bookings
- View booking status
- View cancellation reason
- View payment status

---

## Hotel Owner Features

- Hotel owner authentication
- Owner dashboard
- Hotel management
- Room management
- Create rooms
- Update rooms
- Delete rooms
- Control room availability
- Upload room images
- Replace room images
- Delete room images
- View bookings belonging to owned hotels
- Confirm pending bookings
- Reject pending bookings
- Provide cancellation/rejection reasons

---

## Administrator Features

The application includes an administrator role with administrative functionality and access to administrative areas.

The role-based architecture is designed so that administrative functionality can be expanded independently from traveler and hotel-owner functionality.

---

# User Roles

EasyTrip BD uses role-based access control.

\| Role | Main Responsibilities |
\|---|---|
\| Traveler | Browse hotels, book rooms, manage bookings |
\| Hotel Owner | Manage hotels, rooms, images and bookings |
\| Admin | Administrative management |

Roles are represented using an application-level enumeration and enforced through backend authorization.

---

# Application Workflow

## Traveler Workflow

\`\`\`text
Register / Login
|
v
Browse Destinations
|
v
Browse Hotels
|
v
View Hotel Rooms
|
v
Select Room
|
v
Create Booking
|
v
Booking Status = PENDING
|
v
Hotel Owner Reviews Booking
|
+----------------------+
|                      |
v                      v
CONFIRMED              CANCELLED
|                      |
v                      v
Traveler sees status    Traveler sees reason

---

## Hotel Owner Workflow

\`\`\`text
Login
|
v
Owner Dashboard
|
+---- Manage Hotels
|
+---- Manage Rooms
|       |
|       +---- Create Room
|       +---- Edit Room
|       +---- Delete Room
|       +---- Manage Images
|
+---- Manage Bookings
|
+---- View Booking
+---- Confirm
+---- Reject

# Technology Stack

## Frontend

React
TypeScript
React Router
Axios
React Icons
React Toastify
CSS
## Backend

Python
FastAPI
SQLAlchemy
Pydantic
JWT Authentication
Argon2 password hashing through pwdlib
Alembic
PostgreSQL
### Infrastructure / Services

PostgreSQL
Docker
## Cloudinary

Git
GitHub

# System Architecture

EasyTrip BD follows a frontend-backend architecture:

┌─────────────────────┐
│       Traveler      │
└──────────┬──────────┘
│
┌──────────▼──────────┐
│   React Frontend    │
│   TypeScript        │
└──────────┬──────────┘
│
REST API / HTTP
│
┌──────────▼──────────┐
│    FastAPI Backend  │
│                     │
│  Routers            │
│      ↓              │
│  Services           │
│      ↓              │
│  CRUD               │
│      ↓              │
│  SQLAlchemy         │
└──────────┬──────────┘
│
┌──────────▼──────────┐
│     PostgreSQL      │
└─────────────────────┘

│
│ Image Upload
▼
┌─────────────────────┐
│      Cloudinary     │
│    Image Storage    │
└─────────────────────┘

# Project Structure

The project is organized into separate frontend and backend applications.

easyTrip-BD/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── utils/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── crud/
│   │   ├── db/
│   │   ├── enums/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── alembic/
│   ├── alembic.ini
│   ├── requirements.txt
│   └── ...
│
├── docs/
│   └── ...
│
├── docker-compose.yml
├── .gitignore
└── README.md

# Backend Architecture

The backend follows a layered architecture.

API / Router
↓
## Service Layer

↓
## CRUD Layer

↓
SQLAlchemy Models
↓
PostgreSQL

## API Layer

Responsible for:

HTTP routes
Request handling
Dependency injection
Authentication dependencies
Response models
## Service Layer

Responsible for:

Business logic
Authorization rules
Validation
Booking calculations
Booking availability
Ownership checks
Status transitions
## CRUD Layer

Responsible for:

Database queries
Creating records
Updating records
Deleting records
Fetching records
## Models

SQLAlchemy models represent the database entities.

## Schemas

Pydantic schemas validate incoming requests and format API responses.

# Database Design

The project uses PostgreSQL as its relational database.

Major entities include:
User
|
+---- Hotel
|
+---- Booking

Destination
|
+---- Hotel

Hotel
|
+---- Room
|
+---- Review

Room
|
+---- RoomImage
|
+---- Booking

## Major database entities include:

Users
Hotels
Destinations
Rooms
Room Images
Bookings
Reviews

# Authentication and Authorization

EasyTrip BD uses JWT-based authentication.

The authentication flow is:

User Login
|
v
Validate Credentials
|
v
Generate JWT
|
v
Frontend Stores Token
|
v
Token Sent With API Requests
|
v
FastAPI Validates Token
|
v
Current User Identified
|
v
Role-Based Authorization

Protected endpoints use the authenticated user dependency.

Role-based access is enforced on the backend rather than relying only on frontend navigation.

## Password Security

Passwords are never stored as plain text.

The project uses pwdlib with the recommended password hashing algorithm.

## The authentication system provides:

Password hashing
Password verification
JWT generation
JWT validation
Protected routes
Role-based authorization

# Booking Workflow

When a traveler creates a booking:

- The system validates the check-in date.
- The system validates the check-out date.
- The system verifies that the user is a traveler.
- The requested room is retrieved.
- Existing bookings are checked.
- Date conflicts are prevented.
- The total price is calculated.
- A unique booking reference is generated.
- The booking is created with PENDING status.

Example:

Room price = ৳3,000/night

Check-in  = 01 Oct
Check-out = 04 Oct

Number of nights = 3

Total = ৳9,000

## Booking Status

Bookings currently support:

PENDING
CONFIRMED
CANCELLED
COMPLETED
PENDING

The booking has been submitted and is waiting for hotel-owner action.

CONFIRMED

The hotel owner has accepted the booking.

CANCELLED

The booking has been cancelled or rejected.

COMPLETED

The booking has been completed.

## Booking Rules

The backend prevents:

Check-in dates in the past
Check-out dates before check-in
Invalid date ranges
Double booking for overlapping dates

A room can have multiple bookings as long as their dates do not overlap.

Cancelled bookings do not block future availability.

## Payment

Payment integration is not currently implemented.

The booking system currently stores payment status:

PENDING

Payment processing can be implemented as a future feature.

This keeps the current booking workflow independent from external payment gateways.

# Room Management

Hotel owners can manage rooms belonging to their own hotels.

Supported operations:

Create Room
↓
View Room
↓
Update Room
↓
Delete Room

Each room contains information such as:

Room number
Room type
Price per night
Capacity
Availability
Hotel association
# Room Image Management

Room images are stored using Cloudinary.

Supported operations:

Upload Image
↓
Store Cloudinary URL
↓
Display Image
↓
Replace Image
↓
Delete Image

Supported image formats:

JPEG
PNG
WebP

Images are uploaded to a Cloudinary folder structure under:

easytrip/room_images

Only the image URL is stored in PostgreSQL.

# API Documentation

The backend is built with FastAPI and automatically provides OpenAPI documentation.

When the backend is running locally:

Swagger UI
http://127.0.0.1:8000/docs
ReDoc
http://127.0.0.1:8000/redoc

The API is organized into resources such as:

/auth
/users
/hotels
/destinations
/rooms
/bookings

Room image endpoints include:

POST   /rooms/{room_id}/images
PUT    /rooms/{room_id}/images/{image_id}
DELETE /rooms/{room_id}/images/{image_id}

Booking management includes:

POST   /bookings
GET    /bookings
GET    /bookings/{booking_id}
PATCH  /bookings/{booking_id}
DELETE /bookings/{booking_id}

GET    /bookings/owner
PATCH  /bookings/{booking_id}/confirm
PATCH  /bookings/{booking_id}/reject

A dedicated API documentation file can also be maintained under:

docs/API_DOCUMENTATION.md
# Environment Variables

The project uses environment variables for sensitive configuration.

## Backend

Create a .env file inside the backend directory.

Example:

DATABASE_URL=postgresql://username:password\@localhost:5432/easytrip

SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

Never commit the actual .env file to Git.

## Frontend

Depending on the frontend configuration, environment variables can be used for the API base URL.

Example:

VITE_API_BASE_URL=http://127.0.0.1:8000

The actual variable name should match the project's Axios configuration.

# Local Development Setup

## Prerequisites

- Make sure you have installed:

- Git
- Node.js
- npm
- Python 3.11+
- PostgreSQL
- Docker (optional but recommended)
- A Cloudinary account
## Clone the Repository

git clone https://github.com/Biozidtonoy/easyTrip-BD.git

Move into the project:

cd easyTrip-BD
## Backend Setup

## Move into the backend directory:

cd backend

Create a virtual environment:

Windows
python -m venv .venv

## Activate it:

.venv\Scripts\activate
macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

## Install dependencies:

pip install -r requirements.txt

Create your .env file and configure:

DATABASE_URL=...
SECRET_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
## Database Setup

You can run PostgreSQL locally or through Docker.

If using Docker, start the database:

docker compose up -d

Verify that PostgreSQL is running.

Then run the Alembic migrations:

alembic upgrade head
## Running the Backend

From the backend directory:

uvicorn app.main:app --reload

The backend should now be available at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs
## Frontend Setup

Open another terminal.

Move into the frontend directory:

cd frontend

Install dependencies:

npm install

Configure the frontend environment variables if required.

Start the development server:

npm run dev

The terminal will provide the local frontend URL, typically:

http://localhost:5173
# Database Migrations

Alembic is used for database schema migrations.

Create a migration:

alembic revision --autogenerate -m "describe migration"

Apply migrations:

alembic upgrade head

Rollback one migration:

alembic downgrade -1

Check the current migration:

alembic current

# Testing the API

FastAPI's Swagger UI can be used for manual API testing:

http://127.0.0.1:8000/docs

The project also uses Postman for API testing during development.

Recommended testing flow:

Register
↓
Login
↓
Get JWT
↓
Authorize
↓
Test protected endpoints
# API Security

Protected endpoints require authentication.

Hotel-owner operations additionally verify resource ownership.

For example, a hotel owner cannot manage another owner's rooms or bookings.

The backend verifies:

Authenticated User
↓
User Role
↓
Resource Ownership
↓
Allow / Deny

This prevents relying on frontend restrictions alone.

# Frontend Architecture

The frontend is organized around reusable components and service functions.

Example:

pages
↓
components
↓
services
↓
Axios API
↓
FastAPI

API calls are centralized in service files rather than being directly embedded throughout UI components.

For example:

services/
├── bookingService.ts
├── roomService.ts
├── hotelService.ts
└── ...

TypeScript interfaces are used to keep frontend API data strongly typed.

# Git Workflow

Development follows a feature/issue-based Git workflow.

Typical workflow:

main
|
+---- feature branch
|
+---- commits
|
+---- Pull Request
|
v
main

GitHub Issues are used to track individual features.

Examples include:

Hotel CRUD
Room CRUD
Booking management
Room image management
API documentation

Pull requests are used to merge completed work into the appropriate branch.

# Project Documentation

The project documentation was developed progressively before implementation.

Major documentation phases include:

Project Idea & Business Analysis
Product Requirements Document (PRD)
Software Requirements Specification (SRS)
Technical Design Document (TDD)

These documents describe:

Business goals
User personas
Requirements
User stories
Functional requirements
Non-functional requirements
Use cases
System architecture
Database design
Technical decisions
# Current Implementation Status

## Completed

- Authentication
- User registration
- User login
- Password hashing
- JWT authentication
- Current-user dependency
- Role-based authorization
- Hotels
- Hotel CRUD
- Hotel owner ownership checks
- Hotel owner dashboard
- Destinations
- Destination CRUD
- Hotel-destination relationship
- Rooms
- Room CRUD
- Room availability
- Room ownership validation
- Room Images
- Upload room images
- Cloudinary integration
- Display room images
- Replace room images
- Delete room images
- Bookings
- Create booking
- Booking date validation
- Availability checking
- Automatic total price calculation
- Booking reference generation
- Traveler booking list
- Update pending bookings
- Cancel bookings
- Hotel owner booking management
- Confirm booking
- Reject booking
- Cancellation reason
## Frontend

React + TypeScript architecture
Role-based navigation
Traveler booking interface
Hotel owner dashboard
Hotel management UI
Room management UI
Room image management UI
Booking management UI
Responsive layouts for major pages

# Deployment

The application is designed to be deployable as separate frontend and backend services.

A typical production architecture would be:

Internet
|
┌─────────┴─────────┐
│                   │
v                   v
Frontend             Backend API
React/Vite             FastAPI
│                   │
│                   v
│              PostgreSQL
│
│
└───────────────┐
v
## Cloudinary

## Frontend Deployment

The React application can be built using:

npm run build

The generated production files can be deployed to a static hosting provider.

Examples include:

Vercel
Netlify
Cloudflare Pages
## Backend Deployment

The FastAPI backend can be deployed using a Python-compatible hosting platform or containerized deployment environment.

The production server can be started using a production ASGI server configuration.

## Database

PostgreSQL should be hosted using a managed PostgreSQL service or a production database server.

## Cloudinary

Cloudinary is used for persistent image storage.

Production environment variables should be configured through the hosting platform rather than committed to the repository.

## Production Deployment Checklist

- Before deploying:

- Configure production PostgreSQL
- Configure production environment variables
- Generate a strong production SECRET_KEY
- Configure Cloudinary credentials
- Run Alembic migrations
- Configure CORS for the production frontend
- Build the frontend
- Configure production API URL
- Test authentication
- Test role-based access
- Test hotel ownership
- Test room management
- Test image upload
- Test booking workflow
- Test booking confirmation/rejection
- Verify sensitive files are not committed
- Verify HTTPS is enabled
- Verify production error handling
# Future Improvements

Potential future improvements include:

Payment gateway integration
Hotel approval workflow
Review and rating system
Advanced destination search
Hotel filtering
Room filtering
Booking notifications
Email notifications
Traveler profile management
Hotel owner analytics
Admin analytics dashboard
Booking history
Improved image galleries
Favorites/wishlist
Hotel availability calendar
Automated deployment
CI/CD pipeline
Automated testing
Production monitoring
# Development Philosophy

The project follows several software engineering principles:

Separation of concerns
RESTful API design
Layered backend architecture
Strong typing with TypeScript
Database migrations with Alembic
Role-based access control
Resource ownership validation
Reusable frontend components
Centralized API services
Environment-based configuration
GitHub Issue-based development
Pull-request-based collaboration
# Why EasyTrip BD?

Tourism in Bangladesh includes a large number of destinations, hotels, resorts, and travel experiences, but discovering and managing these services can be fragmented.

EasyTrip BD aims to provide a centralized platform where:

Travelers
↓
Discover
↓
Explore
↓
Book
↓
Manage Trips

Hotel Owners
↓
Manage Hotels
↓
Manage Rooms
↓
Manage Images
↓
Manage Bookings

The project also demonstrates the implementation of a real-world full-stack system using modern web technologies.

# Author

Mahfuz Ahmmad Ifte

Computer Science & Engineering

Built as a full-stack web application project using React, TypeScript, FastAPI and PostgreSQL.

## Repository

Source code:

EasyTrip BD — GitHub Repository
