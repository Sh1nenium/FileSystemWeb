import { ProfileIcon, ProfileInfo, User } from "@/entities/profile";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import styles from './profilePopover.module.scss'
import clsx from "clsx";
import { ProfilePicture } from "@/features/profile/popover/ui/profile-picture";
import { UiDivider } from "@/shared/ui/ui-divider";
import { UiButton } from "@/shared/ui";
import { useSessionRepository } from "@/entities/session";
import { logoutApi } from "@/shared/api/auth/logout";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { EditEmailButton, EditInitialsButton } from "../../edit";

export function ProfilePopover({
  className,
  user
} : {
  className?: string;
  user?: User;
}) {
  const { removeSession } = useSessionRepository();

  const handleLogout = async () => {
    const result = await logoutApi();

    if (IS_SUCCESS_STATUS(result.status)) {
      removeSession();
      return;
    }

  }

  return (
    <Popover className={clsx(className, styles['profile-popover'])}>
      <PopoverButton className={styles['popover-button']}>
        {user?.picture ? 
          <img className={styles['image']} src={`data:image/png;base64,${user.picture}`} alt="profile" /> :
          <ProfileIcon className={styles['image']} size={32}/>}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="top end"
        className={styles['popover-panel']} 
      >
        <ProfilePicture picture={user?.picture} />
        <UiDivider orientation="horizontal"/> 
        <ProfileInfo 
          user={user} 
          renderEditEmail={() => <EditEmailButton />}
          renderEditInitials={() => <EditInitialsButton />}
        />
        <UiButton onClick={handleLogout}>
          Выход
        </UiButton>
      </PopoverPanel>
    </Popover>
  )
}