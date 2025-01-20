import { useForm, Controller } from 'react-hook-form';
import styles from './form.module.scss';
import { UiButton, UiInput } from '@/shared/ui';
import { useFileSystemRepository } from '@/entities/explorer-object';

type InputForm = {
  form: File | null;
  description: string;
};

export function AddFileForm({
  parentFolderId,
  onClose,
}: {
  parentFolderId?: string;
  onClose?: () => void;
}) {
  const { handleSubmit, control } = useForm<InputForm>({
    defaultValues: {
      form: null,
      description: '',
    },
  });

  const { createFile } = useFileSystemRepository();

  const handle = async (data: InputForm) => {
    if (!data.form) {
      console.error('Файл не выбран');
      return;
    }

    const success = await createFile({
      form: data.form,
      parentFolderId: parentFolderId || '',
      description: data.description,
    });

    if (success) {
      onClose?.();
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(handle)} className={styles['form']}>
      <UiInput
        control={control}
        name="description"
        label="Описание"
        placeholder="Описание файла"
      />
      <Controller
        control={control}
        name="form"
        render={({ field }) => (
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                field.onChange(e.target.files[0]);
              }
            }}
          />
        )}
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
  );
}