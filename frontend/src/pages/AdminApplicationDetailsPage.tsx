import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";

import "../styles/adminApplicationDetails.css";

import type { HotelOwnerApplication } from "../types/hotelOwnerApplication";

import {
  getHotelOwnerApplicationById,
  approveHotelOwnerApplication,
  rejectHotelOwnerApplication,
} from "../services/hotelOwnerApplicationService";

const AdminApplicationDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [application, setApplication] = useState<HotelOwnerApplication | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [approving, setApproving] = useState(false);

  const [rejecting, setRejecting] = useState(false);

  const [showRejectForm, setShowRejectForm] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) {
        setError("Application ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getHotelOwnerApplicationById(Number(id));

        setApplication(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.detail ?? "Failed to load application.";

          setError(message);
          toast.error(message);
        } else {
          setError("Failed to load application.");
          toast.error("Failed to load application.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleApproveApplication = async () => {
    if (!application) {
      return;
    }

    try {
      setApproving(true);

      const updatedApplication = await approveHotelOwnerApplication(
        application.id,
      );

      setApplication(updatedApplication);

      toast.success(
        "Application approved successfully. The applicant is now a hotel owner.",
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ?? "Failed to approve application.",
        );
      } else {
        toast.error("Failed to approve application.");
      }
    } finally {
      setApproving(false);
    }
  };

  const handleRejectApplication = async () => {
    if (!application) {
      return;
    }

    const trimmedReason = rejectionReason.trim();

    if (!trimmedReason) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    try {
      setRejecting(true);

      const updatedApplication = await rejectHotelOwnerApplication(
        application.id,
        trimmedReason,
      );

      setApplication(updatedApplication);

      setShowRejectForm(false);

      setRejectionReason("");

      toast.success("Application rejected successfully.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ?? "Failed to reject application.",
        );
      } else {
        toast.error("Failed to reject application.");
      }
    } finally {
      setRejecting(false);
    }
  };

  const handleCancelReject = () => {
    setShowRejectForm(false);
    setRejectionReason("");
  };

  if (loading) {
    return (
      <main className="admin-application-details">
        <div className="admin-application-details-container">
          <div className="admin-application-details-loading">
            Loading application...
          </div>
        </div>
      </main>
    );
  }

  if (error || !application) {
    return (
      <main className="admin-application-details">
        <div className="admin-application-details-container">
          <button
            type="button"
            className="admin-application-back-button"
            onClick={() => navigate("/admin/applications")}
          >
            <ArrowLeft size={18} />
            Back to Applications
          </button>

          <div className="admin-application-details-error">
            <h1>Application Not Found</h1>

            <p>{error || "The requested application could not be found."}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-application-details">
      <div className="admin-application-details-container">
        {/* ---------- Header ---------- */}

        <header className="admin-application-details-header">
          <button
            type="button"
            className="admin-application-back-button"
            onClick={() => navigate("/admin/applications")}
          >
            <ArrowLeft size={18} />
            Back to Applications
          </button>

          <div className="admin-application-details-title">
            <div>
              <span className="admin-dashboard-badge">Administrator</span>

              <h1>Application Review</h1>

              <p>Application #{application.id}</p>
            </div>

            <span
              className={`admin-application-status ${application.status.toLowerCase()}`}
            >
              {application.status}
            </span>
          </div>
        </header>

        {/* ---------- Hotel Information ---------- */}

        <section className="admin-details-card">
          <div className="admin-details-card-header">
            <Building2 size={22} />

            <h2>Hotel Information</h2>
          </div>

          <div className="admin-details-hotel">
            {application.logo ? (
              <img
                src={application.logo}
                alt={`${application.hotel_name} logo`}
                className="admin-details-logo"
              />
            ) : (
              <div className="admin-details-logo-placeholder">
                {application.hotel_name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h3>{application.hotel_name}</h3>

              <p>{application.hotel_description}</p>
            </div>
          </div>

          <div className="admin-details-grid">
            <div className="admin-details-item">
              <span>
                <Mail size={16} />
                Business Email
              </span>

              <p>{application.business_email}</p>
            </div>

            <div className="admin-details-item">
              <span>
                <Phone size={16} />
                Phone
              </span>

              <p>{application.phone}</p>
            </div>

            <div className="admin-details-item">
              <span>
                <MapPin size={16} />
                District
              </span>

              <p>{application.district}</p>
            </div>

            <div className="admin-details-item">
              <span>
                <MapPin size={16} />
                Address
              </span>

              <p>{application.address}</p>
            </div>

            <div className="admin-details-item">
              <span>
                <Globe size={16} />
                Website
              </span>

              {application.website ? (
                <a href={application.website} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
              ) : (
                <p>Not provided</p>
              )}
            </div>

            <div className="admin-details-item">
              <span>
                <CalendarDays size={16} />
                Submitted
              </span>

              <p>{new Date(application.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        {/* ---------- Business Information ---------- */}

        <section className="admin-details-card">
          <div className="admin-details-card-header">
            <FileText size={22} />

            <h2>Business Information</h2>
          </div>

          <div className="admin-details-grid">
            <div className="admin-details-item">
              <span>Trade License Number</span>

              <p>{application.trade_license_number}</p>
            </div>

            <div className="admin-details-item">
              <span>Application Status</span>

              <p>{application.status}</p>
            </div>
          </div>

          <div className="admin-details-description">
            <span>Hotel Description</span>

            <p>{application.hotel_description}</p>
          </div>

          <div className="admin-details-document">
            <span>Trade License Document</span>

            {application.trade_license_document ? (
              <a
                href={application.trade_license_document}
                target="_blank"
                rel="noreferrer"
                className="admin-details-document-button"
              >
                <FileText size={17} />
                View Document
              </a>
            ) : (
              <p>No document available.</p>
            )}
          </div>

          {/* ---------- Rejection Reason ---------- */}

          {application.status === "REJECTED" &&
            application.rejection_reason && (
              <div className="admin-details-rejection-reason">
                <span>Rejection Reason</span>

                <p>{application.rejection_reason}</p>
              </div>
            )}
        </section>

        {/* ---------- Review Actions ---------- */}

        <section className="admin-details-review-section">
          <div>
            <h2>Application Decision</h2>

            <p>Review the submitted information before making a decision.</p>
          </div>

          {application.status === "PENDING" && (
            <div className="admin-details-review-actions">
              <button
                type="button"
                className="admin-details-reject-button"
                onClick={() => setShowRejectForm(true)}
                disabled={rejecting || approving}
              >
                Reject Application
              </button>

              <button
                type="button"
                className="admin-details-approve-button"
                onClick={handleApproveApplication}
                disabled={approving || rejecting}
              >
                {approving ? "Approving..." : "Approve Application"}
              </button>
            </div>
          )}

          {application.status === "APPROVED" && (
            <div className="admin-details-decision-message approved-message">
              Application has been approved.
            </div>
          )}

          {application.status === "REJECTED" && (
            <div className="admin-details-decision-message rejected-message">
              Application has been rejected.
            </div>
          )}
        </section>

        {/* ---------- Reject Form ---------- */}

        {showRejectForm && application.status === "PENDING" && (
          <div className="admin-reject-overlay">
            <div className="admin-reject-modal">
              <div className="admin-reject-modal-header">
                <div>
                  <h2>Reject Application</h2>

                  <p>Provide a reason for rejecting this application.</p>
                </div>

                <button
                  type="button"
                  className="admin-reject-close-button"
                  onClick={handleCancelReject}
                  disabled={rejecting}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="admin-reject-modal-body">
                <label htmlFor="rejection-reason">Rejection Reason</label>

                <textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(event) => setRejectionReason(event.target.value)}
                  placeholder="Explain why this application is being rejected..."
                  rows={6}
                  disabled={rejecting}
                />

                <span className="admin-reject-character-count">
                  {rejectionReason.length} characters
                </span>
              </div>

              <div className="admin-reject-modal-actions">
                <button
                  type="button"
                  className="admin-reject-cancel-button"
                  onClick={handleCancelReject}
                  disabled={rejecting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="admin-reject-submit-button"
                  onClick={handleRejectApplication}
                  disabled={rejecting || !rejectionReason.trim()}
                >
                  {rejecting ? "Rejecting..." : "Reject Application"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminApplicationDetailsPage;
