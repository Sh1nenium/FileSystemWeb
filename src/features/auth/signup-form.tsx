import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance"
import { UiInput } from "@/shared/ui/ui-input"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import styles from './signupForm.module.scss'
import clsx from "clsx"
import { ROUTES } from "@/shared/constants/routes"
import { UiButton } from "@/shared/ui"
import { signupApi } from "@/shared/api/auth/signup"
import { User, Lock, Mail } from 'lucide-react';

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
        <h1 className={styles.title}>Регистрация</h1>
      <UiInput 
        control={control}
        name="login"
        icon={<User size={16} />} 
      />
      <UiInput
        className={styles['password']}
        control={control}
        name="password"
        type="password"
        icon={<Lock size={16} />}
      />
      <UiInput
        className={styles['email']}
        control={control}
        name="email"
        type="email"
        icon={<Mail size={16} />}
      />
      <span className={styles['login-link']}>
        Уже есть аккаунт?<Link to={ROUTES.LOGIN}>Войти</Link>
      </span>
      <UiButton type='submit' className={styles['submit']}>
        Зарегистрироваться
      </UiButton>
    </form>
  )
}