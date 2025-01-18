import clsx from "clsx";
import styles from './styles/uiDivider.module.scss'

export function UiDivider({
  className,
  orientation
} : {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <div className={clsx(className, styles[`ui-divider-${orientation}`])}/>
  )
}