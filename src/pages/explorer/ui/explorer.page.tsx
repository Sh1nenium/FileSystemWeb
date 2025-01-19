import { FileExplorer, FileExplorerSideBar } from "./file-system";
import styles from './explorer.page.module.scss';
import { UiDivider } from "@/shared/ui/ui-divider";

export function ExplorerPage() {
  return (
    <section className={styles['explorer-page']}>
      <FileExplorerSideBar className={styles['file-explorer-side-bar']}/>
      <UiDivider orientation="vertical"/>
      <FileExplorer className={styles['file-explorer']}/>
    </section>
  )
}