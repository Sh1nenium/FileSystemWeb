import { useForm } from "react-hook-form";
import styles from './form.module.scss'
import { UiButton, UiInput } from "@/shared/ui";
import { Tag, useTagsRepository } from "@/entities/tags";
import { useFileSystemRepository } from "@/entities/explorer-object";
import { SaveAllIcon, TextIcon, X } from "lucide-react";

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
    <form onSubmit={handleSubmit(handle)} className={styles['form']}>
      <div className={styles['input-group']}>
      <UiInput 
        name="name"
        icon = {<TextIcon />}
        control={control}
        placeholder="Введите название..."
        className={styles['input']} 
      />
      <UiInput 
        name="description"
        icon = {<TextIcon />}
        control={control}
        placeholder="Введите описание..."
        className={styles['input']} 
      />
      </div>
      <div className={styles['buttons']}>
        <UiButton type="submit" className={styles['save-button']}>
          <SaveAllIcon/>
          Сохранить
        </UiButton>
        <UiButton onClick={onClose} className={styles['cancel-button']}>
          Отменить
          <X/>
        </UiButton>
      </div>
    </form>
  )
}