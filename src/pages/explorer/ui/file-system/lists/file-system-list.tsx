import { useEffect, useState } from 'react';
import { FileModel, FileSystemObject, FolderModel, useFileSystemRepository } from '@/entities/explorer-object';
import { FileSystemItem } from '@/entities/explorer-object/ui/file-system-item';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './fileSystemList.module.scss';
import { DeleteObjectButton } from '@/features/file-system/delete/delete-object-button';
import { ToggleFavoriteButton } from '@/features/favorites/toggle-favorite-button';
import _ from 'lodash';
import { EditObjectButton } from '@/features/file-system/edit/edit-object-button';
import { DownloadObjectButton } from '@/features/file-system/download/download-object';
import { TagAddButton } from '@/features/tags/buttons/tag-add-button';
import { TagListModal } from '@/widgets/tag-list';
import { Sticker } from 'lucide-react';
import { ShareLinkObjectButton } from '@/features/file-system/link/share-link-object-button';
import { BackItem } from '@/entities/explorer-object/ui/back-item';
import { InfoObjectButton } from '@/features/file-system/info/info-object-button';
import { FileSystemObjectInfoModal } from '@/widgets/file-system/ui/info-file-system-object-modal';
import { ShareLinkModal } from '@/widgets/share-link-list/ui/share-link-list-modal';

export function FileSystemList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const { objects, query, getObject} = useFileSystemRepository(id ?? undefined);
  const navigate = useNavigate();

  const handleClick = (item: FileSystemObject) => {
    if (item.type === 'Folder') {
      navigate(`?id=${item.id}`);
      query.refetch();
      return;
    }
  };

  const GetParentFolderId = async () : Promise<string | undefined> => {
    if (id != undefined) {
      const object = await getObject(id);
      return object?.parentFolderId;
    }
  } 

  const [parentFolderId, setParentFolderId] = useState<string | undefined>(undefined);
  useEffect(() => {
    const fetchParentFolderId = async () => {
      const result = await GetParentFolderId(); // Ждем завершения
      setParentFolderId(result);
    };

    fetchParentFolderId();
  }, [id]);


  const [draggedItem, setDraggedItem] = useState<FileSystemObject | null>(null);
  const { editObject } = useFileSystemRepository();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id); 
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetItem: FileSystemObject) => {
    e.preventDefault();
    if (draggedItem && targetItem.type === "Folder" && draggedItem.id !== targetItem.id) {
      try {
        if (draggedItem.type === "File") {
          const file = draggedItem as FileModel;
          await editObject({
            id: file.id,
            name: file.name.replace(/\.[^/.]+$/, ""),
            description: file.description,
            parentFolderId: targetItem.id,
            type: "File",
          });
        } 
        else if (draggedItem.type === "Folder") {
          const folder = draggedItem as FolderModel;
          await editObject({
            id: folder.id,
            name: folder.name,
            description: "",
            parentFolderId: targetItem.id,
            type: "Folder",
          });
        }
      } catch (error) {
        console.error("Ошибка при перемещении:", error);
      }
    }
    setDraggedItem(null);
  };

  const isObjectsArray = objects && Array.isArray(objects);
  const convertedObjects = !isObjectsArray ? objects as { content: FileSystemObject[] } | undefined : undefined;

  const isEmpty = isObjectsArray
    ? objects.length === 0
    : convertedObjects?.content.length === 0;

  const isRoot = location.pathname == '/explorer' && location.search == '';

    return (
      <div className={styles['list']}>

        {!isRoot && <BackItem parentFolderId={parentFolderId} />}
        {isEmpty ? (
          <div className={styles.emptyMessage}>
            <Sticker size={64} className={styles.icon} />
            <span className={styles.text}>Здесь пока пусто</span>
          </div>
        ) : (
          isObjectsArray
            ? _.map(objects, (item) => renderFileSystemItem(item, handleClick, id ?? '', handleDragStart, handleDragOver, handleDrop))
            : _.map(convertedObjects?.content, (item) => renderFileSystemItem(item, handleClick, id ?? '', handleDragStart, handleDragOver, handleDrop))
        )}
      </div>
    );
  }

const renderFileSystemItem = (
  item: FileSystemObject,
  handleClick: (item: FileSystemObject) => void,
  id?: string,

  onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => void,
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void,
  onDrop?: (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => void,
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

      renderDownload={(id) => <DownloadObjectButton className = "" id={id} />}

      onAddTag={() => (
        <TagAddButton
          id={item.id}
          renderModal={(id, isOpen, onClose) => <TagListModal isOpen={isOpen} onClose={onClose} objectId={id} />}
        />
      )}

      renderShareLink={ ( )=> (
        <ShareLinkObjectButton
          id={item.id}
          renderModal={(id, isOpen, onClose) => <ShareLinkModal isOpen={isOpen} onClose={onClose} objectId={id} />}
        />
      )}

      renderInfo={( ) => (
        <InfoObjectButton
          id={item.id}
          renderModal={(id, isOpen, onClose) => <FileSystemObjectInfoModal isOpen={isOpen} onClose={onClose} objectId={id} />}
        />
      )}


      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
};