import { IS_SUCCESS_STATUS } from '@/shared/api/api-instance';
import { UiInput } from '@/shared/ui/ui-input';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './signupForm.module.scss';
import clsx from 'clsx';
import { ROUTES } from '@/shared/constants/routes';
import { UiButton } from '@/shared/ui';
import { signupApi } from '@/shared/api/auth/signup';
import { User, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type InputForm = {
  login: string;
  password: string;
  email: string;
};

export function SignupForm({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<InputForm>({
    defaultValues: {
      login: '',
      password: '',
      email: '',
    },
  });

  const handle = async (data: InputForm) => {
    setIsLoading(true);
    setError(null);
    try
    {
      const result = await signupApi(data);

      if (IS_SUCCESS_STATUS(result.status)) {
        navigate(ROUTES.LOGIN);
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
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h1 className={styles.title}>Регистрация</h1>
        <hr className={styles.divider} /> 
        <form onSubmit={handleSubmit(handle)} className={clsx(className, styles['signup-form'])}>
          {error && <div className={styles.error}>{error}</div>}
          <UiInput
            className={styles['login']}
            control={control}
            placeholder="Логин"
            name="login"
            type="login"
            icon={<User size={16} />}
          />
          <UiInput
            className={styles['password']}
            control={control}
            placeholder='Пароль'
            name="password"
            type="password"
            icon={<Lock size={16} />}
          />
          <UiInput
            className={styles['email']}
            control={control}
            placeholder='Почта'
            name="email"
            type="email"
            icon={<Mail size={16} />}
          />
          <span className={styles['login-link']}>
            Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
          </span>
          <UiButton type="submit" className={styles['submit']} disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </UiButton>
        </form>
      </div>
    </div>
  );
}