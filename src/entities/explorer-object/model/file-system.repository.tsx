import { createFileApi } from "@/shared/api/file-system/create-file";
import { GetRootContent } from "@/shared/api/file-system/get-root-content";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { createFolderApi } from "@/shared/api/file-system/create-folder";
import { DeleteObjectApi } from "@/shared/api/file-system/delete-object";
import { editObjectApi } from "@/shared/api/file-system/edit-object";
import { applyTagApi } from "@/shared/api/file-system/apply-tag";
import { removeTagApi } from "@/shared/api/file-system/remove-tag";

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

  const editObjectMutation = useMutation({
    mutationFn: (data: { id: string, name: string, description: string, parentFolderId: string, type: "File" | "Folder" }) => 
        editObjectApi(data.id, data),
        onSuccess: () => {
            toast.success("Объект был успешно обновлен!");
            queryClient.invalidateQueries(['files']);
        }
  });

  const editObject = async (data: { id: string, name: string, description: string, parentFolderId: string, type: "File" | "Folder" }) => {
    const result = await editObjectMutation.mutateAsync(data);

    return IS_SUCCESS_STATUS(result.status);
  }

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

  const applyTagMutation = useMutation({
    mutationFn: (data: { objectId: string, tagId: string }) => applyTagApi(data),
        onSuccess: () => {
            toast.success("Объект был успешно обновлен!");
            queryClient.invalidateQueries(['files']);
        }
  });

  const removeTagMutation = useMutation({
    mutationFn: (data: { objectId: string, tagId: string }) => removeTagApi(data),
        onSuccess: () => {
            toast.success("Объект был успешно обновлен!");
            queryClient.invalidateQueries(['files']);
        }
  });

  const removeTag = async (data: { objectId: string, tagId: string }) => {
    const result = await removeTagMutation.mutateAsync(data);

    return IS_SUCCESS_STATUS(result.status);
  }

  const applyTag = async (data: { objectId: string, tagId: string }) => {
    const result = await applyTagMutation.mutateAsync(data);

    return IS_SUCCESS_STATUS(result.status);
  }

  return {
    objects: query.data?.data,
    query,
    createFile,
    createFolder,
    deleteObject,
    editObject,
    applyTag,
    removeTag,
  }
}
