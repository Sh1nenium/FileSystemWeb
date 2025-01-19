import { FileSystemObject, useFileSystemRepository } from '@/entities/explorer-object';
import { FileSystemItem } from '@/entities/explorer-object/ui/file-system-item';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./fileSystemList.module.scss"
import { DeleteObjectButton } from '@/features/file-system/delete/delete-object-button';
import { ToggleFavoriteButton } from '@/features/favorites/toggle-favorite-button';
import _ from 'lodash';
import { EditObjectButton } from '@/features/file-system/edit/edit-object-button';
import { DownloadObject } from '@/features/file-system/download/download-object';
import { TagAddButton } from '@/features/tags/tag-add-button';
import { TagListModal } from '@/widgets/tag-list';

export function FileSystemList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const { objects, query } = useFileSystemRepository(id ?? undefined);
  const navigate = useNavigate();

  const handleClick = (item: FileSystemObject) => {
    if (item.type === 'Folder') {
      navigate(`?id=${item.id}`);
      query.refetch();
      return;
    }
  }

  const isObjectsArray = objects && Array.isArray(objects);
  const convertedObjects = !isObjectsArray ? objects as { content: FileSystemObject[] } | undefined : undefined;

  return (
    <div className={styles['list']}>
      {isObjectsArray ? _.map(objects, (item) => (
        renderFileSystemItem(item, handleClick, id ?? '')
      )) : _.map(convertedObjects?.content, (item) => (
        renderFileSystemItem(item, handleClick, id ?? '')
      ))}
    </div>  
  );
}

const renderFileSystemItem = (item: FileSystemObject, handleClick: (item: FileSystemObject) => void, id?: string) => {
  return (
    <FileSystemItem
      key={item.id}
      onClick={(item) => handleClick(item)}
      item={item} 
      onToggleFavorite={(id, isFavorite) => <ToggleFavoriteButton id={id} isFavorite={isFavorite} />}
      onDelete={(id) => <DeleteObjectButton id={id} />}
      renderEdit={(childId, name, description, type) => 
        <EditObjectButton id={childId} name={name} description={description} type={type} parentFolderId={id ?? ''}/>}
      renderDownload={(id) => <DownloadObject id={id} />}
      onAddTag={() => <TagAddButton 
          id={item.id} 
          renderModal={(id, isOpen, onClose) => <TagListModal isOpen={isOpen} onClose={onClose} id={id}/>}/>}
    />
  )
}