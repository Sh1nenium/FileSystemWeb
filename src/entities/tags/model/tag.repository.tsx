import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Tag } from "./types";
import { GetAllTagsApi } from "@/shared/api/tags/get-all-tags";
import { CreateTagApi } from "@/shared/api/tags/create-tag";
import { DeleteTagApi } from "@/shared/api/tags/delete-tag";
import { UpdateTagApi } from "@/shared/api/tags/update-tag";

export function useTagsRepository() {
  const queryClient = useQueryClient();

  const query = useQuery(['tags'], GetAllTagsApi);
  
  const createTagMutation = useMutation({
    mutationFn: (data: Omit<Tag, 'id'>) => CreateTagApi(data),
        onSuccess: () => {
            toast.success("Метка была успешно создана!");
            queryClient.invalidateQueries(['tags']);
        }
  });

  const updateTagMutation = useMutation({
    mutationFn: (data: Tag) => UpdateTagApi(data),
        onSuccess: () => {
            toast.success("Метка была успешно обновлена!");
            queryClient.invalidateQueries(['tags']);
        }
  });

  const deleteTagMutation = useMutation({
    mutationFn: (guid: string) => DeleteTagApi(guid),
        onSuccess: () => {
            toast.success("Метка была успешно удалена!");
            queryClient.invalidateQueries(['tags']);
        }
  });


  const createTag = async (data: Omit<Tag, 'id'>) => {
    const result = await createTagMutation.mutateAsync(data);
    return IS_SUCCESS_STATUS(result.status);
  }

  const updateTag = async (data: Tag) => {
    const result = await updateTagMutation.mutateAsync(data);
    return IS_SUCCESS_STATUS(result.status);
  }

  const deleteTag = async (guid: string) => {
    const result = await deleteTagMutation.mutateAsync(guid);
    return IS_SUCCESS_STATUS(result.status);
  }

//   const getTagById : Tag | undefined = async (guid: string) => {
//     const result = await GetTagByIdApi(guid);
//     if (IS_SUCCESS_STATUS(result.status))
//         return result.data;
//     else {
//         return undefined;
//     }
//   }


  return {
    tags: query.data?.data,
    createTag,
    updateTag,
    deleteTag,
    ...query,
  }
}