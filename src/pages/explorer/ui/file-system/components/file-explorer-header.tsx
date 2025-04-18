import { useNavigate } from "react-router-dom";
import { useUserRepository } from "@/entities/profile";

import { UiHeader } from "@/shared/ui";
import { ProfilePopover } from "@/features/profile/popover";

import { AddFileButton } from "@/features/file-system/add/add-file-button";
import { AddFolderButton } from "@/features/file-system/add/add-folder-button";

import { FolderClosed } from "lucide-react";
import styles from "./fileExplorerHeader.module.scss"
import { FileExplorerCountPanel } from "./file-explorer-count-panel";
import { OwnershipModeToggle, OwnershipViewMode } from "../lists/mode-toggler";

type Props = {
  ownershipMode: OwnershipViewMode;
  setOwnershipMode: React.Dispatch<React.SetStateAction<OwnershipViewMode>>;
};

export function FileExplorerHeader({
  ownershipMode,
  setOwnershipMode
}: Props) {
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

      <div className={styles['ownership-toggle-container']}>
        <OwnershipModeToggle
          mode={ownershipMode}
          onChange={setOwnershipMode}
        />
     </div>
     
      <div className={styles['title-container']}>
        <FolderClosed className={styles['icon']} size={30} />
        <span className={styles['title']} onClick={handleTitleClick}>
          Проводник
        </span>
      </div>


      <FileExplorerCountPanel className={styles["count-panel"]} />
      <ProfilePopover user={user} className={styles["profile"]} />
    </UiHeader>
  );
}