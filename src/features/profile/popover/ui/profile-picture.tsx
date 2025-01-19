import clsx from "clsx"
import styles from './profilePicture.module.scss'
import { Pencil } from "lucide-react"
import { useStateObject } from "@/shared/utils/state-object"
import { ProfileIcon, useUserRepository } from "@/entities/profile"
import { useRef } from 'react';

export function ProfilePicture({
  className,
  picture
} : {
  className?: string
  picture?: string
}) {
  const isHovered = useStateObject(false);

  const { editUserPicture } = useUserRepository()
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isSuccess = await editUserPicture(file);
      if (isSuccess) {
        console.log('Изображение успешно обновлено!');
      } else {
        console.error('Ошибка при обновлении изображения');
      }
    }
  };

  return (
    <div 
      onMouseEnter={() => isHovered.setValue(true)}
      onMouseLeave={() => isHovered.setValue(false)}
      onMouseUp={handleClick}
      className={clsx(className, styles['profile-picture'])}>
      {picture ? 
        <img className={styles['image']} src={`data:image/png;base64,${picture}`} alt="profile" /> :
        <ProfileIcon className={styles['image']}/>}
      {isHovered.value && 
        <div className={styles['overlay']}>
          <Pencil className={styles['icon']} size={42}/>
        </div>}

        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*" 
      />
    </div>
  )
}