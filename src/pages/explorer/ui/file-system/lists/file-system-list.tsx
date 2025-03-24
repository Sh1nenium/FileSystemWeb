import { useEffect, useState } from 'react';
import { FileModel, FileSystemObject, FolderModel, useFileSystemRepository } from '@/entities/explorer-object';
import { FileSystemItem } from '@/entities/explorer-object/ui/file-system-item';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './fileSystemList.module.scss';

import { DeleteObjectButton } from '@/features/file-system/delete/delete-object-button';
import { ToggleFavoriteButton } from '@/features/favorites/toggle-favorite-button';
import { EditObjectButton } from '@/features/file-system/edit/edit-object-button';
import { DownloadObjectButton } from '@/features/file-system/download/download-object';
import { TagAddButton } from '@/features/tags/buttons/tag-add-button';
import { TagListModalNew } from '@/widgets/tag-list-new';
import { ShareLinkObjectButton } from '@/features/file-system/link/share-link-object-button';
import { BackItem } from '@/entities/explorer-object/ui/back-item';
import { InfoObjectButton } from '@/features/file-system/info/info-object-button';
import { FileSystemObjectInfoModal } from '@/widgets/file-system/ui/info-file-system-object-modal';
import { ShareLinkModal } from '@/widgets/share-link-list/ui/share-link-list-modal';

import { Sticker } from 'lucide-react';
import _ from 'lodash';

import { OwnershipModeToggle, OwnershipViewMode } from './mode-toggler'; 
import { FileOwnership } from '@/entities/explorer-object/model/types';

const isOwner = (ownershipType: FileOwnership): boolean => {
  return ownershipType === FileOwnership.Owner;
};

const isShared = (ownershipType: FileOwnership): boolean => {
  return ownershipType === FileOwnership.Shared;
};

export function FileSystemList({
  ownershipMode
}: {
  ownershipMode: OwnershipViewMode;
}) 
{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const navigate = useNavigate();

  const { objects, query, getObject } = useFileSystemRepository(id ?? undefined);
  const { editObject } = useFileSystemRepository();

  const [draggedItem, setDraggedItem] = useState<FileSystemObject | null>(null);
  const [parentFolderId, setParentFolderId] = useState<string | undefined>(undefined);


  useEffect(() => {
    const fetchParentFolderId = async () => {
      if (!id) return;
      const object = await getObject(id);
      setParentFolderId(object?.parentFolderId);
    };

    fetchParentFolderId();
  }, [id]);

  const handleClick = (item: FileSystemObject) => {
    if (item.type === 'Folder') {
      navigate(`?id=${item.id}`);
      query.refetch();
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetItem: FileSystemObject) => {
    e.preventDefault();
    if (!draggedItem || targetItem.type !== 'Folder' || draggedItem.id === targetItem.id) return;

    try {
      if (draggedItem.type === 'File') {
        const file = draggedItem as FileModel;

        if (file.ownershipType === FileOwnership.Owner) {
          await editObject({
            id: file.id,
            name: file.name.replace(/\.[^/.]+$/, ''),
            description: file.description,
            parentFolderId: targetItem.id,
            type: 'File',
          });
        }
      } else if (draggedItem.type === 'Folder') {
        const folder = draggedItem as FolderModel;
        await editObject({
          id: folder.id,
          name: folder.name,
          description: '',
          parentFolderId: targetItem.id,
          type: 'Folder',
        });
      }
      query.refetch();
    } catch (error) {
      console.error('Ошибка при перемещении:', error);
    }

    setDraggedItem(null);
  };

  const isObjectsArray = objects && Array.isArray(objects);
  const convertedObjects = !isObjectsArray ? (objects as { content: FileSystemObject[] } | undefined) : undefined;

  const isEmpty = isObjectsArray
    ? objects.length === 0
    : convertedObjects?.content.length === 0;

  const isRoot = location.pathname === '/explorer' && location.search === '';

  const filterByOwnershipMode = (items: FileSystemObject[]) => {
    if (!items) return [];
  
    return items.filter((item) => {
      // Режим "Все" — возвращаем всё
      if (ownershipMode === OwnershipViewMode.All) return true;
  
      // Режим "Мои файлы" — возвращаем ВСЕ папки и только файлы, которые в owner
      if (ownershipMode === OwnershipViewMode.Owner) {
        if (item.type === 'Folder') return true; // Показываем папки всегда
        const ownership = (item as FileModel).ownershipType;
        return isOwner(ownership);
      }
  
      // Режим "Общие" — возвращаем ТОЛЬКО файлы shared
      if (ownershipMode === OwnershipViewMode.Shared) {
        if (item.type === 'Folder') return false; // Не показываем папки
        const ownership = (item as FileModel).ownershipType;
        return isShared(ownership);
      }
  
      return false;
    });
  };


  const itemsToRender = isObjectsArray
    ? filterByOwnershipMode(objects)
    : filterByOwnershipMode(convertedObjects?.content ?? []);

    const hasFiles =
    (Array.isArray(objects) && objects.length > 0) ||
    (Array.isArray(convertedObjects?.content) && convertedObjects.content.length > 0);
    
 console.log(hasFiles);

  return (
    <>

      <div className={styles['list']}>
        {!isRoot && <BackItem parentFolderId={parentFolderId} />}

        {isEmpty ? (
          <div className={styles.emptyMessage}>
            <Sticker size={64} className={styles.icon} />
            <span className={styles.text}>Здесь пока пусто</span>
          </div>
        ) : (
          _.map(itemsToRender, (item) =>
            renderFileSystemItem(item, handleClick, id ?? '', handleDragStart, handleDragOver, handleDrop)
          )
        )}
      </div>
    </>
  );
}

const renderFileSystemItem = (
  item: FileSystemObject,
  handleClick: (item: FileSystemObject) => void,
  id?: string,
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => void,
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void,
  onDrop?: (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => void
) => {
  return (
    <FileSystemItem
      key={item.id}
      onClick={handleClick}
      item={item}
      onToggleFavorite={(id, isFavorite) => <ToggleFavoriteButton id={id} isFavorite={isFavorite} />}
      onDelete={(id) => <DeleteObjectButton id={id} />}
      renderEdit={(childId, name, description, type) => (
        <EditObjectButton id={childId} name={name} description={description} type={type} parentFolderId={id ?? ''} />
      )}
      renderDownload={(id) => <DownloadObjectButton className="" id={id} />}
      onAddTag={() => (
        <TagAddButton
          id={item.id}
          renderModal={(id, isOpen, onClose) => (
            <TagListModalNew isOpen={isOpen} onClose={onClose} objectId={id} />
          )}
        />
      )}
      renderShareLink={() => (
        <ShareLinkObjectButton
          id={item.id}
          renderModal={(id, isOpen, onClose) => (
            <ShareLinkModal isOpen={isOpen} onClose={onClose} objectId={id} />
          )}
        />
      )}
      renderInfo={() => (
        <InfoObjectButton
          id={item.id}
          renderModal={(id, isOpen, onClose) => (
            <FileSystemObjectInfoModal isOpen={isOpen} onClose={onClose} objectId={id} />
          )}
        />
      )}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
};
