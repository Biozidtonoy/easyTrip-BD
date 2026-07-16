# Bangladesh Tourism Platform – Acceptance Criteria

## Feature-Level Gherkin Acceptance Criteria

### AC-01 Registration & Authentication

**Given** a new user is on the registration page, **when** valid personal information is submitted, **then** the system creates the account successfully and displays a confirmation message.

**Given** an email address already exists, **when** a user attempts to register with the same email, **then** the system rejects the request and displays an appropriate validation message.

**Given** valid login credentials, **when** the user logs in, **then** the system authenticates the user and redirects them to the appropriate dashboard based on their role.

**Given** invalid login credentials, **when** the user attempts to log in, **then** the system denies access and displays an informative error message.

---

### AC-02 Destination Discovery

**Given** available tourist destinations exist, **when** a traveler browses the destination page, **then** the system displays all published destinations.

**Given** a search keyword is entered, **when** the traveler performs a search, **then** only matching destinations are displayed.

**Given** destination filters are selected, **when** the traveler applies the filters, **then** the system displays only destinations matching the selected criteria.

**Given** a destination is selected, **when** the traveler opens the destination details page, **then** complete destination information, images, and available hotels are displayed.

---

### AC-03 Hotel Listings & Booking

**Given** hotels are available for a destination, **when** the traveler views hotel listings, **then** the system displays available accommodations with pricing, ratings, and amenities.

**Given** room availability exists, **when** the traveler confirms a booking, **then** the booking is successfully created and a confirmation is displayed.

**Given** a traveler has existing bookings, **when** they open their booking history, **then** all previous and upcoming bookings are displayed.

**Given** a booking exists, **when** the traveler cancels the reservation according to platform rules, **then** the booking status is updated successfully.

---

### AC-04 Hotel Owner Management

**Given** an authenticated hotel owner, **when** hotel information is submitted, **then** the system stores the hotel with a **Pending Approval** status.

**Given** an existing hotel listing, **when** the hotel owner updates hotel details or room information, **then** the changes are saved successfully.

**Given** customer bookings exist, **when** the hotel owner views the booking dashboard, **then** all booking requests and statuses are displayed.

**Given** booking availability changes, **when** the hotel owner updates room availability, **then** future travelers see the updated availability.

---

### AC-05 Reviews & Ratings

**Given** a traveler has completed a booking, **when** they submit a review and rating, **then** the review is saved and associated with the corresponding destination or hotel.

**Given** existing reviews are available, **when** another traveler views a destination or hotel, **then** all published reviews and ratings are displayed.

**Given** a review violates platform guidelines, **when** it is reported, **then** the administrator can review and remove the inappropriate content.

---

### AC-06 Administration

**Given** a hotel is awaiting approval, **when** the administrator approves the submission, **then** the hotel becomes publicly visible on the platform.

**Given** the administrator rejects a hotel submission, **when** the decision is confirmed, **then** the hotel remains unavailable to travelers.

**Given** inappropriate content exists, **when** the administrator removes the content, **then** it is no longer visible to platform users.

**Given** user management privileges, **when** the administrator suspends or restores a user account, **then** the account status is updated accordingly.

---

### AC-07 Role-Based Access Control

**Given** a traveler logs in, **when** authentication succeeds, **then** only traveler features are accessible.

**Given** a hotel owner logs in, **when** authentication succeeds, **then** only hotel management features are available.

**Given** an administrator logs in, **when** authentication succeeds, **then** full administrative functionality is accessible.

**Given** an unauthorized user attempts to access a restricted resource, **when** authorization is checked, **then** the system denies access and returns an appropriate error.

---

### AC-08 Platform Reliability & Security

**Given** an authenticated session, **when** protected resources are requested, **then** only authorized users can access the requested data.

**Given** invalid or expired authentication credentials, **when** a protected endpoint is accessed, **then** the system returns an authentication error.

**Given** invalid form input is submitted, **when** validation occurs, **then** descriptive validation messages are displayed and invalid data is not stored.

**Given** a successful operation is completed, **when** the transaction finishes, **then** the system persists the data and reflects the changes immediately throughout the platform.
