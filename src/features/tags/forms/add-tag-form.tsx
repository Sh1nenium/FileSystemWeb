import { useForm } from 'react-hook-form';
import styles from './form.module.scss';
import { useTagsRepository } from '@/entities/tags';
import { UiButton, UiInput } from '@/shared/ui';
import { useFileSystemRepository } from '@/entities/explorer-object/model/file-system.repository';
import { Delete, DeleteIcon, SaveAllIcon, X } from 'lucide-react';

type InputForm = {
  name: string;
  description: string;
}

export function AddTagForm({
  onClose
} : {
  onClose?: () => void
}) {
  const { handleSubmit, control } = useForm<InputForm>({
    defaultValues: {
      name: '',
      description: '',
    }
  });

  const { query } = useFileSystemRepository();
  const { createTag } = useTagsRepository();

  const handle = async (data: InputForm) => {
    const success = await createTag(data); 

    if (success) {
      query.refetch();
      onClose?.();
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(handle)} className={styles['edit-form']}>
      <UiInput 
        name="name"
        control={control}
        placeholder="Введите название..."
        className={styles['input']} 
      />
      <UiInput 
        name="description"
        control={control}
        placeholder="Введите описание"
        className={styles['input']} 
      />
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
  );
}