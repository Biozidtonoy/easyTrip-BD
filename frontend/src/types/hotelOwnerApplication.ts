export type ApplicationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface HotelOwnerApplicationCreate {
  hotel_name: string;
  business_email: string;
  phone: string;
  address: string;
  district: string;
  trade_license_number: string;
  hotel_description: string;
  website?: string;
  logo?: File;
  trade_license_document: File;
}

export interface HotelOwnerApplication {
  id: number;
  user_id: number;

  hotel_name: string;
  business_email: string;
  phone: string;
  address: string;
  district: string;

  trade_license_number: string;
  hotel_description: string;

  website: string | null;
  logo: string | null;
  trade_license_document: string | null;

  status: ApplicationStatus;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}