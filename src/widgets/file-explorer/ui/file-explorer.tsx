import clsx from "clsx";
import styles from './fileExplorer.module.scss';
import { UiHeader } from "@/shared/ui";
import { UiDivider } from "@/shared/ui/ui-divider";
import { useUserRepository } from "@/entities/profile";
import { ProfilePopover } from "@/features/profile/popover";

export function FileExplorer({
  className,
} : {
  className?: string;
}) {
  const { user } = useUserRepository();

  return (
    <div className={clsx(className, styles['file-explorer'])}>
      <UiHeader className={styles['header']}>
        <span>Файловый проводник</span>
        <ProfilePopover user={user} />
      </UiHeader> 
      <UiDivider orientation="horizontal"/>
    </div>
  )
}