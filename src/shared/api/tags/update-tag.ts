import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";
import { Tag } from '../../../entities/tags/model/types';

export const UpdateTagApi = (data: Tag) => 
    apiInstance().put(`${BACKEND_URL.TAGS}/${data.id}`, {name: data.name, description: data.description});