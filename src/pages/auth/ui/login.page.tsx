import { LoginForm } from '@/features/auth';
import styles from './login.page.module.scss';

export function LoginPage() {
  return (
    <div className={styles['login-page']}>
      <LoginForm />
    </div>
  )
}