import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

import { Tag } from "@/entities/tags/model/types";

export const GetAllTagsApi = () => 
    apiInstance().get<Tag[]>(`${BACKEND_URL.TAGS}`);