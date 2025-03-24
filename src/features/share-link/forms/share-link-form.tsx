import { UiButton, UiInput } from '@/shared/ui';
import { CalendarDays, SaveAll, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import styles from "./styles/share-link-form.module.scss";
import { UiCheckbox } from '@/shared/ui/ui-checkbox';
import { toast } from 'react-toastify';
import { useShareLinkRepository } from '@/entities/explorer-object/model/share-link.repository';
import { FileRights } from '@/entities/explorer-object/model/types';


interface AddShareLinkFormProps {
  parentFolderId?: string;
  onClose?: () => void;
}

type InputForm = {
  daysToExpire: number;
  rights: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
};

export function AddShareLinkForm({
  parentFolderId,
  onClose,
}: AddShareLinkFormProps) {

  const { addShareLink } = useShareLinkRepository(parentFolderId);
  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm<InputForm>({
    defaultValues: {
      daysToExpire: 7,
      rights: {
        read: false,
        write: false,
        delete: false,
      }
    }
  });

  console.log(parentFolderId);

  const onSubmit = async (data: InputForm) => {
    try {
      const rights = mapRightsToEnum(data.rights);

      addShareLink({
        daysToExpire: data.daysToExpire,
        rights: rights
      })

      if (onClose) 
         onClose(); 

    } catch (error) {
      toast.error('Ошибка при создании ссылки: {error}');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      
      <div className={styles['input-group']}>
        <UiInput 
          name="daysToExpire"
          type="number"
          control={control}
          icon={<CalendarDays />}
          min={1}
          rules={{
            required: "Укажите срок действия",
            min: { value: 1, message: "Минимум 1 день" }
          }}
          placeholder="Введите срок действия (дней)..."
          className={styles['input']}
        />

        {errors.daysToExpire && (
          <span className={styles['error']}>{errors.daysToExpire.message}</span>
        )}

        <div className={styles.rightsGroup}>
             <Controller
                control={control}
                name="rights.read"
                render={({ field }) => (
                  <UiCheckbox
                    label="Чтение"
                    checked={field.value}
                    onChange={field.onChange}
                  />
              )}
            />

            <Controller
              control={control}
              name="rights.write"
              render={({ field }) => (
                <UiCheckbox
                  label="Запись"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="rights.delete"
              render={({ field }) => (
                <UiCheckbox
                  label="Удаление"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
        </div>
      </div>

      <div className={styles['buttons']}>
        <UiButton
          type="submit"
          className={styles['save-button']}
          disabled={isSubmitting}
        >
          <SaveAll size={16} />
          Создать
        </UiButton>

        <UiButton
          type="button"
          onClick={onClose}
          className={styles['cancel-button']}
        >
          Отменить
          <X size={16} />
        </UiButton>
      </div>
    </form>
  );
}

const mapRightsToEnum = (rights: InputForm["rights"]): FileRights => {
  let result: FileRights = FileRights.None;

  if (rights.read) {
    result |= FileRights.Read;
  }
  if (rights.write) {
    result |= FileRights.Update;
  }
  if (rights.delete) {
    result |= FileRights.Delete;
  }

  return result;
};