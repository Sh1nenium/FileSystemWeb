import React from 'react';
import { UiButton } from '@/shared/ui';
import clsx from 'clsx';
import styles from './modeToggler.module.scss'

export enum OwnershipViewMode {
  All = 'ALL',
  Owner = 'OWNER',
  Shared = 'SHARED',
}

type Props = {
  mode: OwnershipViewMode;
  onChange: (mode: OwnershipViewMode) => void;
  disabled?: boolean;
};

export const OwnershipModeToggle: React.FC<Props> = ({ mode, onChange, disabled = false }) => {

    console.log(disabled)

    return (
      <div className={clsx(styles.toggleWrapper, disabled && styles.disabled)}>
        <UiButton
          className={clsx(styles.button, mode === OwnershipViewMode.Owner && styles.active)}
          onClick={() => onChange(OwnershipViewMode.Owner)}
          disabled={disabled}
        >
          Мои файлы
        </UiButton>
  
        <UiButton
          className={clsx(styles.button, mode === OwnershipViewMode.Shared && styles.active)}
          onClick={() => onChange(OwnershipViewMode.Shared)}
          disabled={disabled}
        >
          Доступные мне
        </UiButton>
      </div>
    );
};