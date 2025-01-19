import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";
import { FileSystemObject } from "@/entities/explorer-object";

export const GetAllFavoritesApi = async () => {
    const response = await apiInstance().get<FileSystemObject[]>(BACKEND_URL.FILE_SYSTEM_FAVORITES);
    return response.data;
  };