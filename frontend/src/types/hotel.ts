export interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  image: string;
  owner_id: number;
  destination_id: number;
  created_at: string;
  updated_at: string;
}

export interface HotelCreate {
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  destination_id: number;
  image: File;
}


export interface HotelUpdate {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  district?: string;
  destination_id?: number;
  image?: File;
}