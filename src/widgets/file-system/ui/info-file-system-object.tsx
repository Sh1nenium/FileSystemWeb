import { FileModel, FileSystemObject, useFileSystemRepository } from '@/entities/explorer-object';
import styles from './infoFileSystemObjectList.module.scss';
import { formatDate, formatSize } from '@/shared/utils/convert';
import _ from 'lodash';
import { useEffect } from 'react';
import { Commentary } from '@/entities/explorer-object/model/types';
import { useSessionRepository } from '@/entities/session';
import { CommentsPanel } from './comments-panel';
import { useCommentaryRepository } from '@/entities/explorer-object/model/commentary.repository';
interface FileSystemObjectInfoProps {
  objectId: string;
  onClose: () => void,
  className: string;
}

export function FileSystemObjectInfo({ objectId, onClose, className }: FileSystemObjectInfoProps) 
{
    const { objects } = useFileSystemRepository();
    const { getSession } = useSessionRepository();
    const { createCommentary, deleteCommentary } = useCommentaryRepository();

    const object = _.find(objects, (obj: FileSystemObject) => obj.id === objectId) as FileSystemObject | undefined;
    useEffect(() => {
      if (object == undefined) {
        onClose(); //
      }
    }, [object, onClose]);
  
    if (object == undefined) {
      return null;  
    }

    const sessionUsername = getSession()?.username;
    const comments = object.comments as Commentary[];
    const handleDeleteComment = async (commentId: string) => {
      console.log('Удаляем комментарий с ID:', commentId);
      await deleteCommentary(commentId);
    };

    const handleAddComment = async (content: string) => {
      console.log('Добавляем комментарий:', content);
      await createCommentary(objectId, content);
    };

    return (
        <div className={styles['info-modal']}>
        <div className={styles['content']}>
            <div className={styles['info-item']}>
            <span className={styles['label']}>Имя:</span>
            <span className={styles['value']}>{object.name}</span>
            </div>

            {object.type === 'File' && (
            <>
                <div className={styles['info-item']}>
                    <span className={styles['label']}>Описание:</span>
                    <span className={styles['value']}>{(object as FileModel).description || "Нет описания"}</span>
                </div>
            </>
            )}

            <div className={styles['info-item']}>
                <span className={styles['label']}>Размер:</span>
                <span className={styles['value']}>{formatSize(object.sizeInBytes ?? 0)}</span>
            </div>

            <div className={styles['info-item']}>
                <span className={styles['label']}>Дата создания:</span>
                <span className={styles['value']}>{formatDate(object.createdAt ?? '')}</span>
            </div>

            <div className={styles['info-item']}>
                <span className={styles['label']}>Теги:</span>
                <span className={styles['value']}>
                    {object.tags?.map(tag => tag.name).join(', ') || 'Нет тегов'}
                </span>
            </div>

        <CommentsPanel
          comments={comments}
          sessionUsername={sessionUsername ?? ""} 
          onDeleteComment={handleDeleteComment}
          onAddComment={handleAddComment}
        />

        </div>
        </div>
    );
}


