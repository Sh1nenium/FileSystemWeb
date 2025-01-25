import { ProfileIcon, ProfileInfo, User } from "@/entities/profile";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import styles from './profilePopover.module.scss';
import clsx from "clsx";
import { ProfilePicture } from "@/features/profile/popover/ui/profile-picture";
import { UiDivider } from "@/shared/ui/ui-divider";
import { UiButton } from "@/shared/ui";
import { useSessionRepository } from "@/entities/session";
import { logoutApi } from "@/shared/api/auth/logout";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { EditEmailButton, EditInitialsButton } from "../../edit";
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProfilePopover({
  className,
  user
}: {
  className?: string;
  user?: User;
}) {
  const { removeSession, getSession } = useSessionRepository();

  const handleLogout = async () => {
    try {
      const result = await logoutApi();
    }
    catch (err) {
      console.log(err);
    }

    removeSession();
    return;
  };

  return (
    <Popover className={clsx(className, styles['profile-popover'])}>
      {({ open }) => (
        <>
          <PopoverButton className={styles['popover-button']}>
            <div className={styles['profile-container']}>
              <ChevronDown
                className={clsx(
                  styles['arrow'],
                  open && styles['arrow-rotated']
                )}
                size={24}
              />
              {user?.picture ? (
                <img
                  className={styles['image']}
                  src={`data:image/png;base64,${user.picture}`}
                  alt="profile"
                />
              ) : (
                <ProfileIcon className={styles['image']} size={32} />
              )}
            </div>
          </PopoverButton>

          <AnimatePresence>
            {open && (
              <PopoverPanel
                as={motion.div}
                static
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                anchor="bottom end"
                className={styles['popover-panel']}
              >
                <div className={styles['profile-header']}>
                  <ProfilePicture picture={user?.picture} />
                  <h1 className={styles['username']}>{getSession()?.username}</h1>
                </div>
                <UiDivider orientation="horizontal" />
                <ProfileInfo
                  user={user}
                  renderEditEmail={() => <EditEmailButton />}
                  renderEditInitials={() => <EditInitialsButton />}
                />
                <UiButton onClick={handleLogout} className={styles['logout-button']}>
                  Выход
                </UiButton>
              </PopoverPanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}