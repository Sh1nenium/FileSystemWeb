import { UiButton, UiInput } from '@/shared/ui';
import { CalendarDays, SaveAll, SaveAllIcon, Text, TextIcon, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import styles from "./share-link-form.module.scss";
import { UiCheckbox } from '@/shared/ui/ui-checkbox';

// Добавим тип для пропсов
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
  const { handleSubmit, control } = useForm<InputForm>({
    defaultValues: {
      daysToExpire: 7,
      rights: {
        read: false,
        write: false,
        delete: false,
      }
    }
  });


  const handle = async (data: InputForm) => {

  }

  return (
    <form onSubmit={handleSubmit(handle)} className={styles.form}>
      <div className={styles['input-group']}>
      <UiInput 
        name="daysToExpire"
        icon = {<CalendarDays />}
        control={control}
        min={1}
        rules={{
          required: "Обязательное поле",
          min: { value: 1, message: "Минимум 1 день" }
        }}
        placeholder="Введите срок действия (дней)..."
        className={styles['input']} 
      />
      
      <div className={styles.rightsGroup}>
        <UiCheckbox
          name="rights.read"
          control={control}
          label="Чтение"
        />
        <UiCheckbox
          name="rights.write"
          control={control}
          label="Запись"
        />
        <UiCheckbox
          name="rights.delete"
          control={control}
          label="Удаление"
        />
      </div>
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