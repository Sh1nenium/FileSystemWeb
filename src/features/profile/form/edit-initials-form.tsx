import clsx from "clsx";
import { useForm } from "react-hook-form";
import styles from './form.module.scss'
import { UiButton, UiInput } from "@/shared/ui";
import { useEffect } from "react";
import { useUserRepository } from "@/entities/profile";

type InputForm = {
  name: string;
  surname: string
}

export function EditInitialsForm({
  className,
  name,
  surname,
  onClose
} : {
  className?: string;
  name?: string;
  surname?: string;
  onClose?: () => void;
}) {
  const { editUserInitials } = useUserRepository();

  const { handleSubmit, control, setValue } = useForm<InputForm>({
    defaultValues: {
      name: '',
      surname: ''
    }
  });

  const handle = async (data: InputForm) => {
    const success = await editUserInitials(data);

    if (success) {
      onClose?.();
    }
  }

  useEffect(() => {
    if (name && surname) {
      setValue('name', name);
      setValue('surname', surname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, surname])
  
  return (
    <form onSubmit={handleSubmit(handle)} className={clsx(className, styles['edit-form'])}>
      <UiInput 
        name="name"
        control={control}
        placeholder="Имя"
        className={styles['input']} 
      />
      <UiInput 
        name="surname"
        control={control}
        placeholder="Фамилия"
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