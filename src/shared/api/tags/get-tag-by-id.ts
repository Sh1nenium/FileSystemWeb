import { apiInstance } from "../api-instance";
import { BACKEND_URL } from "@/shared/constants/backend-url";
import { Tag } from "@/entities/tags/model/types";

export const GetTagByIdApi = (guid: string) => 
    apiInstance().get<Tag>(`${BACKEND_URL.TAGS}/${guid}`);