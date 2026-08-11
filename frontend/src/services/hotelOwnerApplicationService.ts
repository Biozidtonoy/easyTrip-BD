import api from "../api/axios";

import type {
  HotelOwnerApplication,
  HotelOwnerApplicationCreate,
} from "../types/hotelOwnerApplication";

export const createHotelOwnerApplication = async (
  applicationData: HotelOwnerApplicationCreate,
): Promise<HotelOwnerApplication> => {
  const formData = new FormData();

  formData.append(
    "hotel_name",
    applicationData.hotel_name,
  );

  formData.append(
    "business_email",
    applicationData.business_email,
  );

  formData.append(
    "phone",
    applicationData.phone,
  );

  formData.append(
    "address",
    applicationData.address,
  );

  formData.append(
    "district",
    applicationData.district,
  );

  formData.append(
    "trade_license_number",
    applicationData.trade_license_number,
  );

  formData.append(
    "hotel_description",
    applicationData.hotel_description,
  );

  if (applicationData.website) {
    formData.append(
      "website",
      applicationData.website,
    );
  }

  if (applicationData.logo) {
    formData.append(
      "logo",
      applicationData.logo,
    );
  }

  formData.append(
    "trade_license_document",
    applicationData.trade_license_document,
  );

  const response =
    await api.post<HotelOwnerApplication>(
      "/hotel-owner-applications",
      formData,
    );

  return response.data;
};