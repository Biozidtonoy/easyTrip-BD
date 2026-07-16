# Bangladesh Tourism Platform – Use Cases

## UC-01 Register

| Field                | Details                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Actor**            | Guest User                                                                                                                                                                 |
| **Preconditions**    | User is not authenticated and email is not already registered                                                                                                              |
| **Primary Flow**     | 1) User opens registration page 2) Enters personal information 3) Submits registration form 4) System validates input and creates account 5) Success response is displayed |
| **Alternative Flow** | A1: Email already exists → validation error displayed. A2: Invalid input or weak password → validation message returned.                                                   |
| **Post Conditions**  | User account is created and available for login                                                                                                                            |
| **Related FR**       | FR-001, FR-002, FR-003                                                                                                                                                     |

---

## UC-02 Login

| Field                | Details                                                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Actor**            | Registered User                                                                                                                                                         |
| **Preconditions**    | Valid user account exists                                                                                                                                               |
| **Primary Flow**     | 1) User enters email and password 2) System authenticates credentials 3) JWT access token is generated 4) User is redirected to the appropriate dashboard based on role |
| **Alternative Flow** | A1: Invalid credentials → authentication error. A2: Suspended account → access denied.                                                                                  |
| **Post Conditions**  | Authenticated user session is established                                                                                                                               |
| **Related FR**       | FR-004, FR-005, FR-006                                                                                                                                                  |

---

## UC-03 Browse Destinations

| Field                | Details                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Actor**            | Traveler                                                                                                  |
| **Preconditions**    | Destination information is available                                                                      |
| **Primary Flow**     | 1) User opens destination page 2) System displays available destinations 3) User browses destination list |
| **Alternative Flow** | A1: No destinations available → empty state message displayed.                                            |
| **Post Conditions**  | Traveler can explore available destinations                                                               |
| **Related FR**       | FR-009, FR-010                                                                                            |

---

## UC-04 Search & Filter Destinations

| Field                | Details                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Actor**            | Traveler                                                                                                                |
| **Preconditions**    | Destinations exist in the system                                                                                        |
| **Primary Flow**     | 1) User enters search keyword or selects filters 2) System searches destinations 3) Matching destinations are displayed |
| **Alternative Flow** | A1: No matching destinations found → informative message displayed.                                                     |
| **Post Conditions**  | Filtered destination list is displayed                                                                                  |
| **Related FR**       | FR-011, FR-012, FR-036                                                                                                  |

---

## UC-05 Book Hotel

| Field                | Details                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Actor**            | Authenticated Traveler                                                                                                           |
| **Preconditions**    | Traveler is logged in and rooms are available                                                                                    |
| **Primary Flow**     | 1) Traveler selects hotel 2) Chooses room and booking dates 3) Confirms booking 4) System creates booking and sends confirmation |
| **Alternative Flow** | A1: Room unavailable → booking rejected. A2: Invalid booking information → validation error displayed.                           |
| **Post Conditions**  | Booking is successfully stored                                                                                                   |
| **Related FR**       | FR-014, FR-015, FR-016, FR-033                                                                                                   |

---

## UC-06 Manage Hotel

| Field                | Details                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Actor**            | Hotel Owner                                                                                                                 |
| **Preconditions**    | Hotel owner is authenticated                                                                                                |
| **Primary Flow**     | 1) Hotel owner opens dashboard 2) Adds or edits hotel information 3) Updates room availability and pricing 4) Saves changes |
| **Alternative Flow** | A1: Invalid hotel information → validation error displayed.                                                                 |
| **Post Conditions**  | Hotel information is saved or updated                                                                                       |
| **Related FR**       | FR-019, FR-020, FR-021, FR-022                                                                                              |

---

## UC-07 Manage Bookings

| Field                | Details                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------- |
| **Actor**            | Hotel Owner                                                                                  |
| **Preconditions**    | Hotel has active bookings                                                                    |
| **Primary Flow**     | 1) Hotel owner opens booking dashboard 2) Reviews booking requests 3) Updates booking status |
| **Alternative Flow** | A1: Booking not found → error message displayed.                                             |
| **Post Conditions**  | Booking status is updated                                                                    |
| **Related FR**       | FR-023, FR-024                                                                               |

---

## UC-08 Submit Review

| Field                | Details                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Actor**            | Traveler                                                                                                  |
| **Preconditions**    | Traveler has completed a booking                                                                          |
| **Primary Flow**     | 1) Traveler opens completed booking 2) Writes review and rating 3) Submits review 4) System stores review |
| **Alternative Flow** | A1: User has not completed booking → review submission denied.                                            |
| **Post Conditions**  | Review becomes available for other travelers                                                              |
| **Related FR**       | FR-025, FR-026, FR-027                                                                                    |

---

## UC-09 Manage Platform

| Field                | Details                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Actor**            | Administrator                                                                                                                                 |
| **Preconditions**    | Administrator is authenticated                                                                                                                |
| **Primary Flow**     | 1) Administrator opens admin dashboard 2) Reviews hotel submissions 3) Approves or rejects hotels 4) Manages users, destinations, and reviews |
| **Alternative Flow** | A1: Unauthorized access attempt → access denied.                                                                                              |
| **Post Conditions**  | Platform information and user activities are successfully managed                                                                             |
| **Related FR**       | FR-028, FR-029, FR-030, FR-031, FR-032, FR-037, FR-038                                                                                        |
