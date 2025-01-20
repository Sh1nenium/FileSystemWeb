import { UiDivider } from "@/shared/ui/ui-divider";
import { FileSystemList } from "@/pages/explorer/ui/file-system/lists/file-system-list";
import { FileExplorerHeader } from "./components/file-explorer-header";

import clsx from "clsx";
import styles from './fileExplorer.module.scss';


export function FileExplorer({
  className,
} : {
  className?: string;
}) {

  return (
    <div className={clsx(className, styles['file-explorer'])}>
      <FileExplorerHeader></FileExplorerHeader>
      <UiDivider orientation="horizontal" />
      <FileSystemList />
    </div>
  );  
}