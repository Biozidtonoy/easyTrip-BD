import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../styles/adminApplications.css";

import type { HotelOwnerApplication } from "../types/hotelOwnerApplication";

import { getHotelOwnerApplications } from "../services/hotelOwnerApplicationService";

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<HotelOwnerApplication[]>([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getHotelOwnerApplications();

        setApplications(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.detail ?? "Failed to load applications.";

          setError(message);
          toast.error(message);
        } else {
          setError("Failed to load applications.");

          toast.error("Failed to load applications.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /*
   * Loading State
   */
  if (loading) {
    return (
      <main className="admin-applications">
        <div className="admin-applications-container">
          <div className="admin-applications-loading">
            Loading applications...
          </div>
        </div>
      </main>
    );
  }

  /*
   * Error State
   */
  if (error) {
    return (
      <main className="admin-applications">
        <div className="admin-applications-container">
          <header className="admin-applications-header">
            <div className="admin-applications-header-content">
              <span className="admin-dashboard-badge">Administrator</span>

              <h1>Hotel Owner Applications</h1>

              <p>
                Review applications submitted by travelers who want to become
                hotel owners.
              </p>
            </div>
          </header>

          <p className="admin-applications-error">{error}</p>
        </div>
      </main>
    );
  }

  /*
   * Main Page
   */
  return (
    <main className="admin-applications">
      <div className="admin-applications-container">
        {/* ---------- Header ---------- */}

        <header className="admin-applications-header">
          <div className="admin-applications-header-content">
            <span className="admin-dashboard-badge">Administrator</span>

            <h1>Hotel Owner Applications</h1>

            <p>
              Review applications submitted by travelers who want to become
              hotel owners.
            </p>
          </div>
        </header>

        {/* ---------- Summary ---------- */}

        <div className="admin-applications-summary">
          <div className="admin-application-summary-card">
            <span>Total Applications</span>

            <strong>{applications.length}</strong>
          </div>

          <div className="admin-application-summary-card">
            <span>Pending</span>

            <strong>
              {
                applications.filter(
                  (application) => application.status === "PENDING",
                ).length
              }
            </strong>
          </div>

          <div className="admin-application-summary-card">
            <span>Approved</span>

            <strong>
              {
                applications.filter(
                  (application) => application.status === "APPROVED",
                ).length
              }
            </strong>
          </div>

          <div className="admin-application-summary-card">
            <span>Rejected</span>

            <strong>
              {
                applications.filter(
                  (application) => application.status === "REJECTED",
                ).length
              }
            </strong>
          </div>
        </div>

        {/* ---------- Applications ---------- */}

        {applications.length === 0 ? (
          <div className="admin-applications-empty">
            <h2>No hotel owner applications found</h2>

            <p>There are currently no applications waiting for review.</p>
          </div>
        ) : (
          <section className="admin-applications-list">
            {applications.map((application) => (
              <article key={application.id} className="admin-application-card">
                {/* ---------- Card Header ---------- */}

                <div className="admin-application-card-header">
                  <div className="admin-application-hotel-info">
                    {application.logo ? (
                      <img
                        src={application.logo}
                        alt={`${application.hotel_name} logo`}
                        className="admin-application-logo"
                      />
                    ) : (
                      <div className="admin-application-logo-placeholder">
                        {application.hotel_name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h2>{application.hotel_name}</h2>

                      <p>Application #{application.id}</p>
                    </div>
                  </div>

                  <span
                    className={`admin-application-status ${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </span>
                </div>

                {/* ---------- Card Body ---------- */}

                <div className="admin-application-card-body">
                  <div className="admin-application-info">
                    <span className="admin-application-info-label">
                      Business Email
                    </span>

                    <p className="admin-application-info-value">
                      {application.business_email}
                    </p>
                  </div>

                  <div className="admin-application-info">
                    <span className="admin-application-info-label">Phone</span>

                    <p className="admin-application-info-value">
                      {application.phone}
                    </p>
                  </div>

                  <div className="admin-application-info">
                    <span className="admin-application-info-label">
                      District
                    </span>

                    <p className="admin-application-info-value">
                      {application.district}
                    </p>
                  </div>

                  <div className="admin-application-info">
                    <span className="admin-application-info-label">
                      Address
                    </span>

                    <p className="admin-application-info-value">
                      {application.address}
                    </p>
                  </div>

                  <div className="admin-application-info">
                    <span className="admin-application-info-label">
                      Trade License
                    </span>

                    <p className="admin-application-info-value">
                      {application.trade_license_number}
                    </p>
                  </div>

                  <div className="admin-application-info">
                    <span className="admin-application-info-label">
                      Website
                    </span>

                    <p className="admin-application-info-value">
                      {application.website ?? "Not provided"}
                    </p>
                  </div>
                </div>

                {/* ---------- Card Footer ---------- */}

                <div className="admin-application-card-footer">
                  <span className="admin-application-date">
                    Submitted{" "}
                    {new Date(application.created_at).toLocaleDateString()}
                  </span>

                  <button
                    type="button"
                    className="admin-application-review-button"
                    onClick={() =>
                      navigate(`/admin/applications/${application.id}`)
                    }
                  >
                    Review Application
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminApplicationsPage;
