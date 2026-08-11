import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getHotelOwnerApplications } from "../services/hotelOwnerApplicationService";

import type { HotelOwnerApplication } from "../types/hotelOwnerApplication";

import "../styles/adminDashboard.css";

const AdminDashboardPage = () => {
  const [applications, setApplications] = useState<HotelOwnerApplication[]>([]);

  const [loadingApplications, setLoadingApplications] = useState(true);

  const [applicationError, setApplicationError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getHotelOwnerApplications();

        setApplications(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setApplicationError(
            error.response?.data?.detail ?? "Failed to load applications.",
          );
        } else {
          setApplicationError("Failed to load applications.");
        }
      } finally {
        setLoadingApplications(false);
      }
    };

    fetchApplications();
  }, []);

  const pendingApplications = applications.filter(
    (application) => application.status === "PENDING",
  );

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard-container">
        {/* Header */}

        <header className="admin-dashboard-header">
          <span className="admin-dashboard-badge">Administrator</span>

          <h1>Admin Dashboard</h1>

          <p>Manage EasyTrip BD platform activities from one place.</p>
        </header>

        {/* Overview */}

        <section className="admin-dashboard-stats">
          <div className="admin-stat-card">
            <h3>Hotel Owner Applications</h3>

            <p className="stat-value">
              {loadingApplications ? "..." : pendingApplications.length}
            </p>

            <p className="stat-description">Applications awaiting review</p>
          </div>
        </section>

        {/* Management Sections */}

        <section className="admin-dashboard-sections">
          {/* Applications */}

          <div className="admin-dashboard-card">
            <h2>Hotel Owner Applications</h2>

            <p>
              Review applications submitted by travelers who want to become
              hotel owners on EasyTrip BD.
            </p>

            {applicationError && (
              <p className="admin-dashboard-error">{applicationError}</p>
            )}

            {!loadingApplications &&
              !applicationError &&
              pendingApplications.length === 0 && (
                <p>There are no pending applications.</p>
              )}

            {!loadingApplications && pendingApplications.length > 0 && (
              <div className="admin-application-list">
                {pendingApplications.map((application) => (
                  <div key={application.id} className="admin-application-item">
                    <div>
                      <h3>{application.hotel_name}</h3>

                      <p>{application.business_email}</p>

                      <span>{application.district}</span>
                    </div>

                    <span className="admin-application-status">
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="admin-dashboard-card-actions">
              <Link to="/admin/applications" className="admin-dashboard-button">
                Review Applications
              </Link>
            </div>
          </div>

          {/* Destinations */}

          <div className="admin-dashboard-card">
            <h2>Destination Management</h2>

            <p>
              Create and manage destinations available on the EasyTrip BD
              platform.
            </p>

            <div className="admin-dashboard-card-actions">
              <Link to="/admin/destinations" className="admin-dashboard-button">
                Manage Destinations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboardPage;
