import { useForm } from 'react-hook-form';
import styles from './form.module.scss'
import { UiButton, UiInput } from '@/shared/ui';
import { useFileSystemRepository } from '@/entities/explorer-object';
import _ from 'lodash';

type InputForm = {
  form: File | string;
  description: string;
}

export function AddFileForm({
  parentFolderId,
  onClose
} : {
  parentFolderId?: string;
  onClose?: () => void;
}) {
  const { handleSubmit, control } = useForm<InputForm>({
    defaultValues: {
      form: '',
      description: ''
    }
  });

  const { createFile } = useFileSystemRepository();

  const handle = async (data: InputForm) => {
    const success = await createFile({
      form: new File([data.form], _.split(data.form as File['name'], '/').pop() as string),
      parentFolderId: parentFolderId || '',
      description: data.description 
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
        name="description"
        label='Описание'
        placeholder="Описание файла"
      />
      <UiInput
        control={control}
        name="form"
        label='Файл'
        type="file"
      />
      <div className={styles['buttons']}>
        <UiButton type="submit" className={styles['save-button']}>
          Создать
        </UiButton>
        <UiButton onClick={onClose} className={styles['cancel-button']}>
          Отменить
        </UiButton>
      </div>
    </form>
  )
}