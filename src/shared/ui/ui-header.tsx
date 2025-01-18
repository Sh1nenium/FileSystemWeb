import clsx from 'clsx'
import styles from './styles/uiHeader.module.scss'  

export function UiHeader({
  className,
  children
} : {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={clsx(className, styles['ui-header'])}>
      {children}
    </div>
  )
}