import { Folder } from 'lucide-react';
import styles from './fileSystemItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

interface BackItemProps {
    parentFolderId?: string; 
}
  
export function BackItem({parentFolderId}: BackItemProps) 
{
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(parentFolderId)
        if (parentFolderId == undefined) {
            navigate(ROUTES.EXPLORER)
            return;
        } 
        navigate(`?id=${parentFolderId}`);
    }
  
    return (
      <div className={styles['item']} onClick={handleClick}>
        <div className={styles['icon']}>
          <Folder size={36} /> {/* Иконка папки */}
        </div>
        <div className={styles['details']}>
          <div className={styles['header']}>
            <span className={styles['name']}>...</span> {/* Текст "Назад" */}
          </div>
        </div>
      </div>
    );
}