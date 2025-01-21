import clsx from "clsx";
import styles from './profilePicture.module.scss';
import {Upload } from "lucide-react";
import { useUserRepository } from "@/entities/profile";
import { useRef } from 'react';
import { ProfileIcon } from "@/entities/profile";

export function ProfilePicture({
  className,
  picture,
}: {
  className?: string;
  picture?: string;
}) {
  const { editUserPicture } = useUserRepository();
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
      onClick={handleClick}
      className={clsx(className, styles['profile-picture'])}
    >
      {picture ? (
        <img className={styles['image']} src={`data:image/png;base64,${picture}`} alt="profile" />
      ) : (
        <ProfileIcon className={styles['image']} />
      )}
      <div className={styles['overlay']}>
        <Upload className={styles['icon']} size={42} />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
}