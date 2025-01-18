import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance"
import { UiInput } from "@/shared/ui/ui-input"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import styles from './signupForm.module.scss'
import clsx from "clsx"
import { ROUTES } from "@/shared/constants/routes"
import { UiButton } from "@/shared/ui"
import { signupApi } from "@/shared/api/auth/signup"

type InputForm = {
  login: string,
  password: string,
  email: string,
}

export function SignupForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<InputForm>({
    defaultValues: {
      login: '',
      password: '',
      email: '',
    }
  });

  const handle = async (data: InputForm) => {
    const result = await signupApi(data);

    if (IS_SUCCESS_STATUS(result.status)) {
      navigate(ROUTES.LOGIN);
      
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(handle)} className={clsx(className, styles['signup-form'])}>
      <UiInput 
        control={control}
        name="login"
        label="Логин"
      />
      <UiInput
        className={styles['password']}
        control={control}
        name="password"
        label="Пароль"
        type="password"
      />
      <UiInput
        className={styles['email']}
        control={control}
        name="email"
        label="Почта"
        type="email"
      />
      <span className={styles['login-link']}>
        <Link to={ROUTES.LOGIN}>Войти</Link>
      </span>
      <UiButton type='submit' className={styles['submit']}>
        Зарегистрироваться
      </UiButton>
    </form>
  )
}