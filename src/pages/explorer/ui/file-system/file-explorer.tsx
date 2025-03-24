import { UiDivider } from "@/shared/ui/ui-divider";
import { FileSystemList } from "@/pages/explorer/ui/file-system/lists/file-system-list";
import { FileExplorerHeader } from "./components/file-explorer-header";

import clsx from "clsx";
import styles from './fileExplorer.module.scss';
import { useState } from "react";
import { OwnershipViewMode } from "./lists/mode-toggler";



export function FileExplorer({
  className,
} : {
  className?: string;
}) {

  const [ownershipMode, setOwnershipMode] = useState<OwnershipViewMode>(OwnershipViewMode.Owner);

  return (
    <div className={clsx(className, styles['file-explorer'])}>
      <FileExplorerHeader
        ownershipMode={ownershipMode}
        setOwnershipMode={setOwnershipMode}
      />

      <UiDivider orientation="horizontal" />
      <FileSystemList ownershipMode={ownershipMode} />
    </div>
  );  
}