import clsx from "clsx"
import styles from './fileExplorerSideBar.module.scss'
import { UiDivider } from "@/shared/ui/ui-divider"

export function FileExplorerSideBar({
  className,
} : {
  className?: string
}) {
  return (
    <aside className={clsx(className, styles['file-explorer-side-bar'])}>
      <span className={styles['title']}>Избранное</span>
      <UiDivider orientation="horizontal"/>
    </aside>
  )
}