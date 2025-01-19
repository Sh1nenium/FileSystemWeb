import { Download } from "lucide-react";
import styles from './downloadObject.module.scss'
import { downloadObjectApi } from "@/shared/api/file-system/download-object";

export function DownloadObject({
  id
} : {
  id: string
}) {
  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const result = await downloadObjectApi(id);
    
    const url = window.URL.createObjectURL(result.data as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.headers["content-disposition"].split("attachment; filename=")[1];
    link.click();
  }

  return (
    <button
      className={styles['download-button']}
      onClick={handle}
    >
      <Download size={16} />
    </button>
  )
}