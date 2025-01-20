import { useNavigate } from "react-router-dom";
import { useUserRepository } from "@/entities/profile";

import { UiHeader } from "@/shared/ui";
import { ProfilePopover } from "@/features/profile/popover";

import { AddFileButton } from "@/features/file-system/add/add-file-button";
import { AddFolderButton } from "@/features/file-system/add/add-folder-button";

import { FolderClosed } from "lucide-react";
import styles from "./fileExplorerHeader.module.scss"

export function FileExplorerHeader({
    className,
} : {
    className?: string
}) {
    const navigate = useNavigate();

    const { user } = useUserRepository();

    const handleTitleClick = () => {
        navigate('/explorer'); 
      };

    return (
        <UiHeader className={styles['header']}>
        <div className={styles['buttons-container']}>
          <AddFileButton />
          <AddFolderButton />
        </div>

        <div className={styles['title-container']}>
            <FolderClosed className={styles['icon']} size={30} /> 
            <span className={styles['title']} onClick={handleTitleClick}>
              Проводник
            </span>
        </div>
        
        <ProfilePopover user={user} className={styles["profile"]} />
        
      </UiHeader>
    )
}