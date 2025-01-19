import { useSessionRepository } from "@/entities/session"
import { loginApi } from "@/shared/api"
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance"
import { UiInput } from "@/shared/ui/ui-input"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from './loginForm.module.scss'
import clsx from "clsx"
import { ROUTES } from "@/shared/constants/routes"
import { UiButton } from "@/shared/ui"
import { User, Lock } from 'lucide-react';

type InputForm = {
  login: string,
  password: string,
}

export function LoginForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveSession } = useSessionRepository();
  const { control, handleSubmit } = useForm<InputForm>({
    defaultValues: {
      login: '',
      password: '',
    }
  });

  const handle = async (data: InputForm) => {
    const result = await loginApi(data);

    if (IS_SUCCESS_STATUS(result.status)) {
      saveSession(result.data);
      navigate(location.state?.from || '/');

      return;
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Вход</h1>
        <form onSubmit={handleSubmit(handle)} className={clsx(className, styles['login-form'])}>
          <UiInput
            control={control}
            name="login"
            placeholder="Логин"
            icon={<User size={16} />} 
          />
          <UiInput
            className={styles['password']}
            control={control}
            name="password"
            type="password"
            placeholder="Пароль"
            icon={<Lock size={16} />} 
          />
          <span className={styles['register-link']}>
            Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
          </span>
          <UiButton type="submit" className={styles['submit']}>
            Войти
          </UiButton>
        </form>
      </div>
    </div>
  );
}