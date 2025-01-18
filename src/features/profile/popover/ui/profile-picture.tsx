import clsx from "clsx"
import styles from './profilePicture.module.scss'
import { Pencil } from "lucide-react"
import { useStateObject } from "@/shared/utils/state-object"
import { ProfileIcon } from "@/entities/profile"

export function ProfilePicture({
  className,
  picture
} : {
  className?: string
  picture?: string
}) {
  const isHovered = useStateObject(false);

  return (
    <div 
      onMouseEnter={() => isHovered.setValue(true)}
      onMouseLeave={() => isHovered.setValue(false)}
      className={clsx(className, styles['profile-picture'])}>
      {picture ? 
        <img className={styles['image']} src={`data:image/png;base64,${picture}`} alt="profile" /> :
        <ProfileIcon className={styles['image']}/>}
      {isHovered.value && 
        <div className={styles['overlay']}>
          <Pencil className={styles['icon']} size={42}/>
        </div>}
    </div>
  )
}