import clsx from "clsx";
import styles from './fileExplorer.module.scss';
import { UiHeader } from "@/shared/ui";
import { UiDivider } from "@/shared/ui/ui-divider";
import { useUserRepository } from "@/entities/profile";
import { ProfilePopover } from "@/features/profile/popover";
import { FolderClosed } from "lucide-react";
import { FileModel, FileSystemObject } from "@/entities/explorer-object";
import { Tag } from "@/entities/tags";
import { FileSystemList } from "@/features/file-system/file-system-list";

export function FileExplorer({
  className,
} : {
  className?: string;
}) {
  const { user } = useUserRepository();

  const tag: Tag = {id: "1", description: "123", name: "123" }

  const files: FileSystemObject[] = [
    {
      id: '1',
      type: 'Folder',
      name: 'Документы',
      sizeInBytes: 1024 * 1024,
      createdAt: '2023-10-01',
      isFavorite: true, 
      Tags: [tag],
    },
    {
      id: '2',
      type: 'File',
      name: 'report.pdf',
      sizeInBytes: 1024 * 1024, // 1 МБ
      createdAt: '2023-10-05',
      isFavorite: false,
      Tags: [tag],
      description: "ASDHUYASDHASJUD"
    } as FileModel,
  ];

  const handleItemClick = (item: FileSystemObject) => {
    console.log('Cli  cked:', item);
  };

  return (
    <div className={clsx(className, styles['file-explorer'])}>
      <UiHeader className={styles['header']}>
        <div className={styles['title-container']}>
          <FolderClosed className={styles['icon']} size={20} /> 
          <span className={styles['title']}>Проводник</span>
        </div>
        <ProfilePopover user={user} />
      </UiHeader>
      <UiDivider orientation="horizontal" />
      <FileSystemList items={files} onItemClick={handleItemClick} />
    </div>
  );
}