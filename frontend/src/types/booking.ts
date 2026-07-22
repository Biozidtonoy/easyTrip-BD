export interface BookingCreate {
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requests?: string;
}

export interface Booking {
  id: number;
  booking_reference: string;
  traveler_id: number;
  room: {
    id: number;
    room_number: string;
    room_type: string;
    hotel: {
      id: number;
      name: string;
    };
  };
  check_in_date: string;
  check_out_date: string;
  status: string;
  total_price: number;
  payment_status: string;
  cancellation_reason: string | null;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}
