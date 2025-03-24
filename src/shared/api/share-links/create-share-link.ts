import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";
import { FileRights } from "@/entities/explorer-object/model/types";

export const createShareLinkApi = async (fileId: string, data: { daysToExpire: number; rights: FileRights}) => {
    return apiInstance().post(`${BACKEND_URL.FILE_SYSTEM_FILES}/${fileId}/share-link`, {
        daysToExpire: data.daysToExpire,
        rights: data.rights
    });
  };