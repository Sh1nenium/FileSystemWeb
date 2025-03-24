import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";
import { ShareLink } from "@/entities/explorer-object/model/types";

export const getFileShareLinksApi = async (fileId: string,) => {
    return apiInstance().get<ShareLink[]>(`${BACKEND_URL.FILE_SYSTEM_FILES}/${fileId}/share-link`);
  };