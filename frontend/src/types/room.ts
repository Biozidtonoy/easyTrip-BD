export interface RoomImage {
  id: number;
  image_url: string;
}

export interface Room {
  id: number;
  hotel_id: number;
  room_number: string;
  room_type: string;
  price_per_night: number;
  capacity: number;
  images: RoomImage[];
  is_available: boolean;
  created_at: string;
  updated_at: string;
}