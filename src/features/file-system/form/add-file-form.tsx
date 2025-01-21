import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import styles from './form.module.scss';
import { UiButton, UiInput } from '@/shared/ui';
import { useFileSystemRepository } from '@/entities/explorer-object';
import { TextIcon, Upload } from 'lucide-react';

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
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<InputForm>({
    defaultValues: {
      form: null,
      description: '',
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    }
  };

  return (
    <form onSubmit={handleSubmit(handle)} className={styles['form']}>
      <div className={styles['input-group']}>
        <UiInput
          control={control}
          name="description"
          icon={<TextIcon />}
          placeholder="Введите описание..."
        />
      </div>

      <div className={styles['file-input']}>
        <Controller
          control={control}
          name="form"
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="file-upload" className={styles['file-label']}>
                <Upload size={20} style={{ marginRight: '0.5rem' }} />
                Выберите файл
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    field.onChange(file);
                    setSelectedFile(file);
                  }
                }}
                className={styles['file-input']}
              />
              {selectedFile && (
                <div className={styles['file-info']}>
                  <span className={styles['file-name']}>{selectedFile.name}</span>
                </div>
              )}
              {fieldState.error && (
                <span className={styles['error']}>{fieldState.error.message}</span>
              )}
            </>
          )}
        />
      </div>

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