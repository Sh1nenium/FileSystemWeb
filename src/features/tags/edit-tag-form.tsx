import { useForm } from "react-hook-form";
import styles from './form.module.scss'
import { UiButton, UiInput } from "@/shared/ui";
import { Tag, useTagsRepository } from "@/entities/tags";
import { useFileSystemRepository } from "@/entities/explorer-object";

type InputForm = {
  name: string;
  description: string;
}

export function EditTagForm({
  id,
  onClose,
  tag 
} : {
  id: string
  onClose?: () => void
  tag: Tag
}) {
  const { handleSubmit, control } = useForm<InputForm>({
    defaultValues: {
      name: tag.name,
      description: tag.description
    }
  });

  const { updateTag } = useTagsRepository();
  const { query } = useFileSystemRepository();

  const handle = async (data: InputForm) => {
    const success = await updateTag({
      ...data,
      id
    });

    if (success) {
      query.refetch();
      onClose?.();
    }
  }

  return (
    <form onSubmit={handleSubmit(handle)} className={styles['edit-form']}>
      <UiInput 
        name="name"
        control={control}
        label="Название"
        placeholder="Название тега"
        className={styles['input']} 
      />
      <UiInput 
        name="description"
        control={control}
        label="Описание"
        placeholder="Описание тега"
        className={styles['input']} 
      />
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