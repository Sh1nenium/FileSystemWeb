import { Link } from "lucide-react";
import styles from './shareLinkObjectButton.module.scss';

export function ShareLinkObjectButton({
  id
}: {
  id: string
}) {

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log(id)
  }

  return (
    <button
      className={styles['share-link-button']}
      onClick={handle}
    >
      <Link size={24} />
    </button>
  );
}