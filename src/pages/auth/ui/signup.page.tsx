import { SignupForm } from '@/features/auth';
import styles from './signup.page.module.scss';

export function SigninPage() {
  return (
    <div className={styles['signup-page']}>
      <SignupForm />
    </div>
  )
}