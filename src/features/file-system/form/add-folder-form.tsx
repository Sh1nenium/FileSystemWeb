import { useForm } from 'react-hook-form';
import styles from './form.module.scss'
import { UiButton, UiInput } from '@/shared/ui';
import { useFileSystemRepository } from '@/entities/explorer-object';
import { FolderPen, SaveAllIcon, X } from 'lucide-react';

type InputForm = {
  name: string;
}

export function AddFolderForm({
  parentFolderId,
  onClose
} : {
  parentFolderId?: string;
  onClose?: () => void;
}) {
  const { handleSubmit, control } = useForm<InputForm>({
    defaultValues: {
      name: ''
    }
  });

  const { createFolder } = useFileSystemRepository();

  const handle = async (data: InputForm) => {
    const success = await createFolder({
      name: data.name,
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
        placeholder="Введите название..."
        icon={<FolderPen/>}
      />
      <div className={styles['buttons']}>
      <UiButton type="submit" className={styles['save-button']}>
          <SaveAllIcon/>
          Создать
        </UiButton>
        <UiButton onClick={onClose} className={styles['cancel-button']}>
          Отменить
          <X/>
        </UiButton>
      </div>
    </form>
  )
}