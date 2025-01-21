import React from "react";
import { User } from "../model/types";
import clsx from "clsx";
import styles from './profileInfo.module.scss';

type Field = {
  label: string;
  value?: string;
  feature?: React.ReactNode;
};

interface ProfileInfoProps {
  className?: string;
  user?: User;
  renderEditInitials?: () => React.ReactNode;
  renderEditEmail?: () => React.ReactNode;
}

export function ProfileInfo({
  className,
  user,
  renderEditInitials,
  renderEditEmail,
}: ProfileInfoProps) {
  const fields: Field[] = React.useMemo(() => [
    { label: 'Имя и Фамилия', value: `${user?.name ?? ''} ${user?.surname ?? 'Не заполнено'}`, feature: renderEditInitials?.() },
    { label: 'Email', value: user?.email, feature: renderEditEmail?.() },
  ], [user, renderEditInitials, renderEditEmail]);

  return (
    <div className={clsx(className, styles['profile-info'])}>
      {fields.map((field) => (
        <div className={styles['field']} key={field.label}>
          <div className={styles['content']}>
            <span className={styles['label']}>{field.label}</span>
            <span className={styles['value']}>{field.value?.trim() || 'Не заполнено'}</span>
          </div>
          <div className={styles['feature']}>
            {field.feature}
          </div>
        </div>
      ))}
    </div>
  );
}