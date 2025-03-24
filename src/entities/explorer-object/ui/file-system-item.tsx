import {
  File,       
  FileText,   
  Folder,     
  Music,      
  Video,      
  Image,      
  Archive,    
  Code,       
  Table,      
  Presentation,
  AppWindow, 
} from 'lucide-react';

import styles from './fileSystemItem.module.scss';
import { FileModel, FileSystemObject, FolderModel } from '@/entities/explorer-object';
import { TagList } from './tag-list';
import React from 'react';
import { FileOwnership, FileRights } from '../model/types';

export function FileSystemItem({
  item,
  onClick,
  onRemoveTag,
  onAddTag,
  onToggleFavorite,
  onDelete,
  renderEdit,
  renderDownload,
  renderShareLink,
  renderInfo,

  onDragStart,
  onDragOver,
  onDrop,
}: {
  item: FileSystemObject;
  onClick?: (item: FileSystemObject) => void;
  onRemoveTag?: (tagId: string) => void;
  onAddTag?: () => React.ReactNode;
  onToggleFavorite?: (itemId: string, isFavorite: boolean) => React.ReactNode;
  onDelete?: (itemId: string) => React.ReactNode;
  renderEdit?: (itemId: string, name: string, description: string, type: "File" | "Folder") => React.ReactNode;
  renderDownload?: (itemId: string) => React.ReactNode;
  renderShareLink?: (itemId: string) => React.ReactNode;
  renderInfo?: (itemId: string) => React.ReactNode;

  onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, item: FileSystemObject) => void;
}) {
  const isFolder = item.type === 'Folder';
  const IconComponent = isFolder ? Folder : getFileIcon(item.name);

  return (
    <div
      className={styles['item']}
      onClick={() => onClick?.(item)}
      draggable
      onDragStart={(e) => onDragStart?.(e, item)}
      onDragOver={(e) => onDragOver?.(e)}
      onDrop={(e) => onDrop?.(e, item)}
    >
      <div className={styles['icon']}>
        <IconComponent size={36} />
      </div>
      <div className={styles['details']}>
        <div className={styles['header']}>
          <span className={styles['name']}>{item.name}</span>
          {!isFolder && (
            <span className={styles['description']}>
              {(item as FileModel).description}
            </span>
          )}
        </div>
        <div className={styles['info']}>
          {isFolder && (
            <span className={styles['content-count']}>
              {(item as FolderModel).objectsCount ?? 0} элементов
            </span>
          )}
          <span className={styles['size']}>
            {formatSize(item.sizeInBytes ?? 0)}
          </span>
          <span className={styles['created']}>{formatDate(item.createdAt ?? '')}</span>
        </div>
        <TagList tags={item.tags} onRemoveTag={onRemoveTag} />
      </div>
      <hr className={styles.dividerButtons} />
      <div className={styles['actions']}>
        {renderInfo?.(item.id)}

        {item.type === 'Folder' && (
          <>
            {onAddTag?.()}
            {renderDownload?.(item.id)}
            {onToggleFavorite?.(item.id, item.isFavorite)}
            {renderEdit?.(item.id, item.name, (item as FolderModel).name, item.type)}
            {onDelete?.(item.id)}
          </>
        )}

        {item.type === 'File' && (
          <>
            {hasFileRight((item as FileModel).fileObjectRights, FileRights.Update) &&
              onAddTag?.()}

            {isOwner((item as FileModel).ownershipType) &&
              renderShareLink?.(item.id)}

            {hasFileRight((item as FileModel).fileObjectRights, FileRights.Read) &&
              renderDownload?.(item.id)}

            {hasFileRight((item as FileModel).fileObjectRights, FileRights.Update) &&
              onToggleFavorite?.(item.id, item.isFavorite)}

            {hasFileRight((item as FileModel).fileObjectRights, FileRights.Update) &&
              renderEdit?.(item.id, item.name, (item as FileModel).description, item.type)}

            {hasFileRight((item as FileModel).fileObjectRights, FileRights.Delete) &&
              onDelete?.(item.id)}
          </>
        )}
      </div>
    </div>
  );
}

const formatSize = (size: number) => {
  if (size < 1024) return `${size} Б`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} КБ`;
  return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const hasFileRight = (
  rights: FileRights,
  rightToCheck: FileRights
): boolean => {
  return (rights & rightToCheck) === rightToCheck;
};

export const isOwner = (ownershipType: FileOwnership): boolean => {
  return (ownershipType & FileOwnership.Owner) === FileOwnership.Owner;
};

export const isShared = (ownershipType: FileOwnership): boolean => {
  return (ownershipType & FileOwnership.Shared) === FileOwnership.Shared;
};


const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'bmp':
    case 'svg':
      return Image;

    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
    case 'aac':
      return Music;

    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
    case 'flv':
    case 'wmv':
      return Video;

    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
    case 'rtf':
    case 'odt':
      return FileText;

    case 'ppt':
    case 'pptx':
    case 'odp':
    case 'key':
      return Presentation;

    case 'xls':
    case 'xlsx':
    case 'csv':
    case 'ods':
      return Table;

    case 'zip':
    case 'rar':
    case 'tar':
    case 'gz':
    case '7z':
      return Archive;

    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'py':
    case 'java':
    case 'html':
    case 'css':
    case 'json':
    case 'xml':
      return Code;

    case 'exe':
      return AppWindow;

    default:
      return File;
  }
};