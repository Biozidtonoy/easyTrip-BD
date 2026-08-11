export interface Destination {
  id: number;
  name: string;
  description: string;
  division: string;
  district: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface DestinationCreate {
  name: string;
  description: string;
  division: string;
  district: string;
  image: File;
}

export interface DestinationUpdate {
  name?: string;
  description?: string;
  division?: string;
  district?: string;
  image?: File;
}