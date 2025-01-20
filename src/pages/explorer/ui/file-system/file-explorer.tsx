import clsx from "clsx";
import styles from './fileExplorer.module.scss';
import { UiHeader } from "@/shared/ui";
import { UiDivider } from "@/shared/ui/ui-divider";
import { useUserRepository } from "@/entities/profile";
import { ProfilePopover } from "@/features/profile/popover";
import { FolderClosed } from "lucide-react";
import { FileSystemList } from "@/pages/explorer/ui/file-system/lists/file-system-list";
import { AddFileButton } from "@/features/file-system/add/add-file-button";
import { AddFolderButton } from "@/features/file-system/add/add-folder-button";
import { useNavigate } from 'react-router-dom';

export function FileExplorer({
  className,
} : {
  className?: string;
}) {
  const { user } = useUserRepository();
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/explorer'); 
  };

  return (
    <div className={clsx(className, styles['file-explorer'])}>
      <UiHeader className={styles['header']}>
        <div className={styles['title-container']}>
          <FolderClosed className={styles['icon']} size={24} /> 
          <span className={styles['title']} onClick={handleTitleClick}>
            Проводник
          </span>
        </div>
        <ProfilePopover user={user} />
      </UiHeader>
      <UiDivider orientation="horizontal" />
      <div className={styles['buttons-container']}>
        <AddFileButton />
        <AddFolderButton />
      </div>
      <FileSystemList />
    </div>
  );  
}