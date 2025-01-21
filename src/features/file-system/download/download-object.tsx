import { Download } from "lucide-react";
import styles from './downloadObject.module.scss'
import { downloadObjectApi } from "@/shared/api/file-system/download-object";
import _ from "lodash";

export function DownloadObject({
  id
} : {
  id: string
}) {
  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const result = await downloadObjectApi(id);
    
    const contentDisposition = result.headers["content-disposition"];

    let filename = contentDisposition
      .split("filename*=UTF-8''")[1] 
      ?.split(";")[0] 
      ?.trim(); 

    if (!filename) {
      filename = contentDisposition
        .split("filename=")[1]
        ?.split(";")[0] 
        ?.trim() 
        .replace(/['"]/g, ''); 
    }
    if (!filename) {
      filename = "download.doc";
    }

    filename = decodeURIComponent(filename);
    
    const url = window.URL.createObjectURL(result.data as Blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;

    console.log(link.href);
    console.log(link.download)

    link.click();
  }

  return (
    <button
      className={styles['download-button']}
      onClick={handle}
    >
      <Download size={24} />
    </button>
  )
}