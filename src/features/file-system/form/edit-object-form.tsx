import { useFileSystemRepository } from "@/entities/explorer-object";
import { UiButton, UiInput } from "@/shared/ui";
import { useForm } from "react-hook-form";
import styles from './form.module.scss'
import _ from "lodash";

export type InputForm = {
  name: string
  type: "File" | "Folder"
  description: string
  parentFolderId: string
}

export function EditObjectForm({
  onClose,
  name,
  description,
  type,
  parentFolderId,
  id
} : {
  name: string;
  description: string;
  onClose?: () => void;
  type: "File" | "Folder"
  parentFolderId?: string;
  id: string
}) {
  const nameArray = _.split(name, '.');
  const newName = _.filter(nameArray, (_, index) => index !== nameArray.length - 1).join('.');

  const { handleSubmit, control } = useForm<InputForm>({
    defaultValues: {
      name: newName,
      description,
    }
  });

  const { editObject } = useFileSystemRepository();
  
  const handle = async (data: InputForm) => {
    const success = await editObject({
      ...data,
      id,
      type,
      parentFolderId: parentFolderId || ''
    });

    if (success) {
      onClose?.();
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(handle)} className={styles['form']}>
      <UiInput
        control={control}
        name="name"
        placeholder={"Введите новое название..."}
      />
      { type === 'File' && <UiInput
        control={control}
        name="description"
        placeholder="Введите новое описание..."
      />}
      <div className={styles['buttons']}>
        <UiButton type="submit" className={styles['save-button']}>
          Сохранить
        </UiButton>
        <UiButton onClick={onClose} className={styles['cancel-button']}>
          Отменить
        </UiButton>
      </div>
    </form>
  )
}