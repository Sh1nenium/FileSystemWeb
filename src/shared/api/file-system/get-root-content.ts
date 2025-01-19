import { apiInstance } from "../api-instance";
import { BACKEND_URL } from '../../constants/backend-url';

import { FileSystemObject } from "@/entities/explorer-object";

export const GetRootContent = (id?: string) => 
    apiInstance().get<FileSystemObject[]>(`${BACKEND_URL.FILE_SYSTEM}${id ? `/${id}` : ''}`);