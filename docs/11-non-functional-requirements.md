# Bangladesh Tourism Platform – Non-Functional Requirements

| NFR ID  | Category        | Requirement (Measurable Target)                                                                                                                |
| ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-001 | Performance     | System shall support at least **1,000 concurrent users** without significant performance degradation.                                          |
| NFR-002 | Performance     | P95 response time for destination search and hotel listing APIs shall be **≤ 500 ms** under normal load.                                       |
| NFR-003 | Performance     | Booking confirmation requests shall be processed within **3 seconds** for 95% of transactions.                                                 |
| NFR-004 | Availability    | Monthly system availability shall be **≥ 99%**.                                                                                                |
| NFR-005 | Availability    | Planned maintenance downtime shall not exceed **4 hours per month**.                                                                           |
| NFR-006 | Reliability     | Failed booking or notification operations shall automatically retry up to **3 times** before reporting failure.                                |
| NFR-007 | Reliability     | Confirmed bookings shall never be lost after successful database commits (**RPO = 0**).                                                        |
| NFR-008 | Reliability     | System backups shall be performed daily and restoration shall be tested at least once every month.                                             |
| NFR-009 | Scalability     | The platform shall support horizontal scaling to accommodate at least **3×** the normal workload.                                              |
| NFR-010 | Security        | Protected APIs shall require valid JWT authentication.                                                                                         |
| NFR-011 | Security        | Access tokens shall expire within **15 minutes**, and refresh tokens within **7 days**.                                                        |
| NFR-012 | Security        | Passwords shall be securely hashed using **bcrypt** or an equivalent algorithm, and all network communication shall use **TLS 1.2 or higher**. |
| NFR-013 | Security        | Authentication failures, authorization failures, and administrative actions shall be logged with timestamps.                                   |
| NFR-014 | Security        | Critical security vulnerabilities shall be resolved before each production release.                                                            |
| NFR-015 | Usability       | The platform shall provide a responsive user interface that functions correctly on desktop, tablet, and mobile devices.                        |
| NFR-016 | Accessibility   | Core user interactions shall comply with **WCAG 2.1 AA** accessibility guidelines.                                                             |
| NFR-017 | Maintainability | Backend source code shall maintain at least **80% unit test coverage** for critical business logic.                                            |
| NFR-018 | Maintainability | APIs shall follow RESTful design principles and maintain backward compatibility within minor releases.                                         |
| NFR-019 | Maintainability | Static code analysis shall report **no blocker or critical issues** before deployment.                                                         |
| NFR-020 | Observability   | System logs, application metrics, and error traces shall be collected for all critical services.                                               |
| NFR-021 | Observability   | Critical application failures shall trigger alerts within **2 minutes** of detection.                                                          |
| NFR-022 | Portability     | The application shall run consistently in **Docker** across development, testing, and production environments.                                 |
| NFR-023 | Portability     | Deployment shall be reproducible using containerized infrastructure and automated deployment scripts.                                          |
| NFR-024 | Data Integrity  | All user input shall be validated before being stored in the database to ensure data consistency.                                              |
| NFR-025 | Usability       | A first-time traveler shall be able to complete registration and make their first hotel booking within **5 minutes** during usability testing. |

---

## NFR Verification Approach

| Category                   | Verification Method                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| Performance & Scalability  | Load testing, stress testing, and response time analysis                                            |
| Availability & Reliability | Backup restoration tests, failover testing, and monitoring reports                                  |
| Security                   | Authentication testing, penetration testing, vulnerability scanning, and authorization verification |
| Accessibility              | Automated accessibility scans and manual keyboard/screen-reader testing                             |
| Maintainability            | Code reviews, CI/CD quality gates, unit testing, and static code analysis                           |
| Observability              | Log inspection, monitoring dashboards, telemetry validation, and alert testing                      |
| Portability                | Docker deployment verification across development, staging, and production environments             |
