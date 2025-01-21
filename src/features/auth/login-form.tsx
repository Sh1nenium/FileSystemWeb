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
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

type InputForm = {
  login: string,
  password: string,
}

export function LoginForm({ className }: { className?: string }) {
  const [_isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setIsLoading(true);
    setError(null);

    try
    {
      const result = await loginApi(data);

      if (IS_SUCCESS_STATUS(result.status)) {
        saveSession(result.data);
        navigate(location.state?.from || '/');

        setIsLoading(false);
        return;
      } 
    }
    catch(err){
      if (axios.isAxiosError(err)){
          console.log(err);
          setError(`Ошибка при регистрации. ${err.response?.data}.`);
          setIsLoading(false);
      }
      else {
        toast.error(err as any);
      }
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Вход</h1>
        <hr className={styles.divider} /> 
        <form onSubmit={handleSubmit(handle)} className={clsx(className, styles['login-form'])}>
          {error && <div className={styles.error}>{error}</div>}
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
            Еще нету аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
          </span>
          <UiButton type="submit" className={styles['submit']}>
            Войти
          </UiButton>
        </form>
      </div>
    </div>
  );
}