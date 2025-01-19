import { FileSystemObject } from "@/entities/explorer-object";
import { apiInstance } from "../api-instance";
import { BACKEND_URL } from "@/shared/constants/backend-url";

export const GetObjectContent = (guid: string) => 
    apiInstance().get<FileSystemObject>(`${BACKEND_URL.FILE_SYSTEM}/${guid}`);