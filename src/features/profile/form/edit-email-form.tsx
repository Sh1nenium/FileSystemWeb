import clsx from "clsx";
import { useForm } from "react-hook-form";
import styles from './form.module.scss'
import { UiButton, UiInput } from "@/shared/ui";
import { useEffect } from "react";
import { useUserRepository } from "@/entities/profile";

type InputForm = {
  email: string
}

export function EditEmailForm({
  className,
  email,
  onClose
} : {
  className?: string;
  email?: string;
  onClose?: () => void;
}) {
  const { editUserEmail } = useUserRepository();

  const { handleSubmit, control, setValue } = useForm<InputForm>({
    defaultValues: {
      email: ''
    }
  });

  const handle = async (data: InputForm) => {
    const success = await editUserEmail(data.email);

    if (success) {
      onClose?.();
    }
  }

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  return (
    <form onSubmit={handleSubmit(handle)} className={clsx(className, styles['edit-form'])}>
      <UiInput 
        name="email"
        control={control}
        placeholder="Новая почта..."
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