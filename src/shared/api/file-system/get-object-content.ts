import { FileSystemObject } from "@/entities/explorer-object";
import { apiInstance } from "../api-instance";
import { BACKEND_URL } from "@/shared/constants/backend-url";

export const GetObjectContentApi = (guid: string) => 
    apiInstance().get<FileSystemObject>(`${BACKEND_URL.FILE_SYSTEM}/${guid}`);