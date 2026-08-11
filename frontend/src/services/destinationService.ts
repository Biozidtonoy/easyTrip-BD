import api from "../api/axios";

import type {
  Destination,
  DestinationCreate,
  DestinationUpdate,
} from "../types/destination";


export const getDestinations = async (): Promise<
  Destination[]
> => {
  const response =
    await api.get<Destination[]>(
      "/destinations"
    );

  return response.data;
};


export const getDestinationById = async (
  id: number
): Promise<Destination> => {
  const response =
    await api.get<Destination>(
      `/destinations/${id}`
    );

  return response.data;
};


export const createDestination = async (
  destinationData: DestinationCreate
): Promise<Destination> => {
  const formData = new FormData();

  formData.append(
    "name",
    destinationData.name
  );

  formData.append(
    "description",
    destinationData.description
  );

  formData.append(
    "division",
    destinationData.division
  );

  formData.append(
    "district",
    destinationData.district
  );

  formData.append(
    "image",
    destinationData.image
  );

  const response =
    await api.post<Destination>(
      "/destinations",
      formData
    );

  return response.data;
};


export const updateDestination = async (
  id: number,
  destinationData: DestinationUpdate
): Promise<Destination> => {
  const formData = new FormData();

  if (destinationData.name !== undefined) {
    formData.append(
      "name",
      destinationData.name
    );
  }

  if (
    destinationData.description !== undefined
  ) {
    formData.append(
      "description",
      destinationData.description
    );
  }

  if (destinationData.division !== undefined) {
    formData.append(
      "division",
      destinationData.division
    );
  }

  if (destinationData.district !== undefined) {
    formData.append(
      "district",
      destinationData.district
    );
  }

  if (destinationData.image !== undefined) {
    formData.append(
      "image",
      destinationData.image
    );
  }

  const response =
    await api.patch<Destination>(
      `/destinations/${id}`,
      formData
    );

  return response.data;
};


export const deleteDestination = async (
  id: number
): Promise<void> => {
  await api.delete(
    `/destinations/${id}`
  );
};