import { createFileApi } from "@/shared/api/file-system/create-file";
import { GetRootContent } from "@/shared/api/file-system/get-root-content";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { createFolderApi } from "@/shared/api/file-system/create-folder";
import { DeleteObjectApi } from "@/shared/api/file-system/delete-object";

export function useFileSystemRepository(id?: string) {
  const queryClient = useQueryClient();

  const query = useQuery(['files', id], () => GetRootContent(id));

  const createFileMutation = useMutation({
    mutationFn: (data: { form: File, parentFolderId: string, description: string }) => createFileApi(data),
        onSuccess: () => {
            toast.success("Файл был успешно создан!");
            queryClient.invalidateQueries(['files']);
        }
  });

  const createFolderMutation = useMutation({
    mutationFn: (data: { name: string, parentFolderId: string}) => createFolderApi(data),
    onSuccess: () => {
        toast.success("Файл был успешно создан!");
        queryClient.invalidateQueries(['files']);
    }
  });

  const deleteObjectMutation = useMutation({
    mutationFn: (guid: string) => DeleteObjectApi(guid),
        onSuccess: () => {
            toast.success("Объект был успешно удален!");
            queryClient.invalidateQueries(['files']);
        }
  });

  const deleteObject = async (guid: string) => {
    const result = await deleteObjectMutation.mutateAsync(guid);

    return IS_SUCCESS_STATUS(result.status);
  }

  const createFolder = async (data: { name: string, parentFolderId: string}) => {
    const result = await createFolderMutation.mutateAsync(data);

    return IS_SUCCESS_STATUS(result.status);
  }

  const createFile = async (data: { form: File, parentFolderId: string, description: string }) => {
    const result = await createFileMutation.mutateAsync(data);

    return IS_SUCCESS_STATUS(result.status);
  }

  return {
    objects: query.data?.data,
    query,
    createFile,
    createFolder,
    deleteObject,
  }
}
