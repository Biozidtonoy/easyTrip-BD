import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { createHotelOwnerApplication } from "../services/hotelOwnerApplicationService";

import "../styles/becomePartner.css";

const BecomePartnerPage = () => {
  const navigate = useNavigate();

  const [hotelName, setHotelName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [website, setWebsite] = useState("");

  const [logo, setLogo] = useState<File | undefined>();
  const [tradeLicenseDocument, setTradeLicenseDocument] =
    useState<File | undefined>();

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required.";
    } else if (hotelName.trim().length < 2) {
      newErrors.hotelName =
        "Hotel name must contain at least 2 characters.";
    }

    if (!businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        businessEmail.trim(),
      )
    ) {
      newErrors.businessEmail =
        "Please enter a valid business email.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^01[3-9]\d{8}$/.test(phone.trim())) {
      newErrors.phone =
        "Enter a valid Bangladesh phone number.";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!district.trim()) {
      newErrors.district = "District is required.";
    }

    if (!tradeLicenseNumber.trim()) {
      newErrors.tradeLicenseNumber =
        "Trade license number is required.";
    }

    if (!hotelDescription.trim()) {
      newErrors.hotelDescription =
        "Hotel description is required.";
    } else if (hotelDescription.trim().length < 20) {
      newErrors.hotelDescription =
        "Hotel description must contain at least 20 characters.";
    }

    if (
      website.trim() &&
      !/^https?:\/\/.+/i.test(website.trim())
    ) {
      newErrors.website =
        "Website must start with http:// or https://.";
    }

    if (!tradeLicenseDocument) {
      newErrors.tradeLicenseDocument =
        "Trade license document is required.";
    }

    if (logo) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(logo.type)) {
        newErrors.logo =
          "Logo must be JPEG, PNG, or WebP.";
      }
    }

    if (tradeLicenseDocument) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (
        !allowedTypes.includes(
          tradeLicenseDocument.type,
        )
      ) {
        newErrors.tradeLicenseDocument =
          "Trade license document must be JPEG, PNG, or WebP.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "logo" | "tradeLicenseDocument",
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (type === "logo") {
      setLogo(file);

      setErrors((prev) => ({
        ...prev,
        logo: "",
      }));
    }

    if (type === "tradeLicenseDocument") {
      setTradeLicenseDocument(file);

      setErrors((prev) => ({
        ...prev,
        tradeLicenseDocument: "",
      }));
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error(
        "Please fix the errors before submitting.",
      );

      return;
    }

    try {
      setSubmitting(true);

      await createHotelOwnerApplication({
        hotel_name: hotelName.trim(),
        business_email: businessEmail.trim(),
        phone: phone.trim(),
        address: address.trim(),
        district: district.trim(),
        trade_license_number:
          tradeLicenseNumber.trim(),
        hotel_description:
          hotelDescription.trim(),
        website: website.trim() || undefined,
        logo,
        trade_license_document:
          tradeLicenseDocument!,
      });

      toast.success(
        "Application submitted successfully! Your application is now under review.",
      );

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.detail ??
          "Failed to submit application.";

        toast.error(message);
      } else {
        toast.error(
          "Failed to submit application. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="partner-page">
      <section className="partner-container">
        <div className="partner-header">
          <h1>Become a Partner</h1>

          <p>
            Join EasyTrip BD as a hotel partner and
            reach more travelers across Bangladesh.
          </p>
        </div>

        <form
          className="partner-form"
          onSubmit={handleSubmit}
        >
          <div className="form-section">
            <h2>Hotel Information</h2>

            <div className="form-group">
              <label htmlFor="hotelName">
                Hotel Name *
              </label>

              <input
                id="hotelName"
                type="text"
                value={hotelName}
                onChange={(event) =>
                  setHotelName(event.target.value)
                }
                placeholder="Enter your hotel name"
              />

              {errors.hotelName && (
                <span className="form-error">
                  {errors.hotelName}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessEmail">
                  Business Email *
                </label>

                <input
                  id="businessEmail"
                  type="email"
                  value={businessEmail}
                  onChange={(event) =>
                    setBusinessEmail(
                      event.target.value,
                    )
                  }
                  placeholder="hotel@example.com"
                />

                {errors.businessEmail && (
                  <span className="form-error">
                    {errors.businessEmail}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number *
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="017XXXXXXXX"
                />

                {errors.phone && (
                  <span className="form-error">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Address *
              </label>

              <input
                id="address"
                type="text"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                placeholder="Hotel address"
              />

              {errors.address && (
                <span className="form-error">
                  {errors.address}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="district">
                  District *
                </label>

                <input
                  id="district"
                  type="text"
                  value={district}
                  onChange={(event) =>
                    setDistrict(event.target.value)
                  }
                  placeholder="e.g. Cox's Bazar"
                />

                {errors.district && (
                  <span className="form-error">
                    {errors.district}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tradeLicenseNumber">
                  Trade License Number *
                </label>

                <input
                  id="tradeLicenseNumber"
                  type="text"
                  value={tradeLicenseNumber}
                  onChange={(event) =>
                    setTradeLicenseNumber(
                      event.target.value,
                    )
                  }
                  placeholder="Enter trade license number"
                />

                {errors.tradeLicenseNumber && (
                  <span className="form-error">
                    {errors.tradeLicenseNumber}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hotelDescription">
                Hotel Description *
              </label>

              <textarea
                id="hotelDescription"
                rows={5}
                value={hotelDescription}
                onChange={(event) =>
                  setHotelDescription(
                    event.target.value,
                  )
                }
                placeholder="Describe your hotel, facilities, location, and services..."
              />

              <span className="character-count">
                {hotelDescription.length} characters
              </span>

              {errors.hotelDescription && (
                <span className="form-error">
                  {errors.hotelDescription}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="website">
                Website
                <span className="optional">
                  Optional
                </span>
              </label>

              <input
                id="website"
                type="url"
                value={website}
                onChange={(event) =>
                  setWebsite(event.target.value)
                }
                placeholder="https://example.com"
              />

              {errors.website && (
                <span className="form-error">
                  {errors.website}
                </span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Documents</h2>

            <div className="form-group">
              <label htmlFor="logo">
                Hotel Logo
                <span className="optional">
                  Optional
                </span>
              </label>

              <input
                id="logo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  handleFileChange(
                    event,
                    "logo",
                  )
                }
              />

              <span className="file-help">
                Accepted formats: JPEG, PNG, WebP
              </span>

              {logo && (
                <span className="selected-file">
                  Selected: {logo.name}
                </span>
              )}

              {errors.logo && (
                <span className="form-error">
                  {errors.logo}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="tradeLicenseDocument">
                Trade License Document *
              </label>

              <input
                id="tradeLicenseDocument"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  handleFileChange(
                    event,
                    "tradeLicenseDocument",
                  )
                }
              />

              <span className="file-help">
                Upload a clear image of your trade
                license. Accepted formats: JPEG, PNG,
                WebP
              </span>

              {tradeLicenseDocument && (
                <span className="selected-file">
                  Selected:{" "}
                  {tradeLicenseDocument.name}
                </span>
              )}

              {errors.tradeLicenseDocument && (
                <span className="form-error">
                  {errors.tradeLicenseDocument}
                </span>
              )}
            </div>
          </div>

          <div className="application-notice">
            <strong>Application Review</strong>

            <p>
              After submitting your application, an
              EasyTrip BD administrator will review
              your information and documents. Your
              account will remain a traveler account
              until your application is approved.
            </p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="partner-back-btn"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Go Back
            </button>

            <button
              type="submit"
              className="partner-submit-btn"
              disabled={submitting}
            >
              {submitting
                ? "Submitting Application..."
                : "Submit Application"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default BecomePartnerPage;