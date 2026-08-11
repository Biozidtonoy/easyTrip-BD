import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaTimesCircle,
} from "react-icons/fa";

import LoadingSpinner from "../components/common/LoadingSpinner";

import {
  getMyHotelOwnerApplication,
} from "../services/hotelOwnerApplicationService";

import type {
  HotelOwnerApplication,
} from "../types/hotelOwnerApplication";

import "../styles/applicationStatus.css";


const ApplicationStatusPage = () => {
  const [application, setApplication] =
    useState<HotelOwnerApplication | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getMyHotelOwnerApplication();

        setApplication(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.detail ??
            "Failed to load your application.";

          setError(message);

          if (
            error.response?.status !== 404
          ) {
            toast.error(message);
          }
        } else {
          const message =
            "Failed to load your application.";

          setError(message);
          toast.error(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  /*
   * No application exists
   */
  if (
    error &&
    !application
  ) {
    return (
      <main className="application-status-page">
        <section className="application-status-container">
          <div className="application-empty-card">
            <FaFileAlt
              className="application-empty-icon"
            />

            <h1>
              No Application Found
            </h1>

            <p>
              You have not submitted a hotel
              owner application yet.
            </p>

            <a
              href="/partner"
              className="application-primary-btn"
            >
              Become a Partner
            </a>
          </div>
        </section>
      </main>
    );
  }

  if (!application) {
    return null;
  }

  const status =
    application.status.toUpperCase();

  const getStatusIcon = () => {
    if (status === "APPROVED") {
      return (
        <FaCheckCircle />
      );
    }

    if (status === "REJECTED") {
      return (
        <FaTimesCircle />
      );
    }

    return <FaClock />;
  };

  const getStatusMessage = () => {
    if (status === "APPROVED") {
      return (
        "Congratulations! Your hotel owner "
        + "application has been approved."
      );
    }

    if (status === "REJECTED") {
      return (
        "Your hotel owner application "
        + "was not approved."
      );
    }

    return (
      "Your application is currently being "
      + "reviewed by our admin team."
    );
  };

  return (
    <main className="application-status-page">
      <section className="application-status-container">

        {/* Page Header */}
        <div className="application-status-header">
          <h1>
            Application Status
          </h1>

          <p>
            Track the status of your hotel
            owner application.
          </p>
        </div>


        {/* Status Card */}
        <div
          className={`application-status-card ${status.toLowerCase()}`}
        >
          <div className="application-status-icon">
            {getStatusIcon()}
          </div>

          <div className="application-status-content">
            <span className="application-status-label">
              Application Status
            </span>

            <h2>
              {status}
            </h2>

            <p>
              {getStatusMessage()}
            </p>
          </div>
        </div>


        {/* Application Information */}
        <div className="application-card">

          <div className="application-card-header">
            <FaBuilding />

            <h2>
              Hotel Information
            </h2>
          </div>


          <div className="application-details-grid">

            <div className="application-detail">
              <span className="application-detail-label">
                Hotel Name
              </span>

              <span className="application-detail-value">
                {application.hotel_name}
              </span>
            </div>


            <div className="application-detail">
              <span className="application-detail-label">
                Business Email
              </span>

              <span className="application-detail-value">
                {application.business_email}
              </span>
            </div>


            <div className="application-detail">
              <span className="application-detail-label">
                Phone
              </span>

              <span className="application-detail-value">
                <FaPhone />
                {application.phone}
              </span>
            </div>


            <div className="application-detail">
              <span className="application-detail-label">
                District
              </span>

              <span className="application-detail-value">
                <FaMapMarkerAlt />
                {application.district}
              </span>
            </div>


            <div className="application-detail application-detail-full">
              <span className="application-detail-label">
                Address
              </span>

              <span className="application-detail-value">
                {application.address}
              </span>
            </div>


            {application.website && (
              <div className="application-detail">
                <span className="application-detail-label">
                  Website
                </span>

                <a
                  href={application.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="application-detail-link"
                >
                  <FaGlobe />
                  Visit Website
                </a>
              </div>
            )}

          </div>
        </div>


        {/* Business Information */}
        <div className="application-card">

          <div className="application-card-header">
            <FaFileAlt />

            <h2>
              Business Information
            </h2>
          </div>


          <div className="application-details-grid">

            <div className="application-detail">
              <span className="application-detail-label">
                Trade License Number
              </span>

              <span className="application-detail-value">
                {application.trade_license_number}
              </span>
            </div>


            <div className="application-detail">
              <span className="application-detail-label">
                Trade License Document
              </span>

              <a
                href={
                  application.trade_license_document ??
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="application-detail-link"
              >
                <FaFileAlt />
                View Document
              </a>
            </div>


            <div className="application-detail application-detail-full">
              <span className="application-detail-label">
                Hotel Description
              </span>

              <p className="application-description">
                {application.hotel_description}
              </p>
            </div>

          </div>
        </div>


        {/* Application Dates */}
        <div className="application-card">

          <div className="application-card-header">
            <FaCalendarAlt />

            <h2>
              Application Timeline
            </h2>
          </div>


          <div className="application-timeline">

            <div className="timeline-item">
              <span className="timeline-label">
                Submitted
              </span>

              <span className="timeline-value">
                {new Date(
                  application.created_at,
                ).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>
            </div>


            <div className="timeline-item">
              <span className="timeline-label">
                Last Updated
              </span>

              <span className="timeline-value">
                {new Date(
                  application.updated_at,
                ).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default ApplicationStatusPage;