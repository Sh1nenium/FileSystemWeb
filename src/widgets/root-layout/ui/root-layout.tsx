import { Outlet } from 'react-router-dom';
import styles from './rootLayout.module.scss';

export function RootLayout() {
  return (
    <div className={styles['root-layout']}>
      <main className={styles['main']}>
        <Outlet />
      </main>
    </div>
  )
}