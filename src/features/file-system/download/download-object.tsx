import { Download } from "lucide-react";
import styles from './downloadObject.module.scss';
import { downloadObjectApi } from "@/shared/api/file-system/download-object";
import clsx from "clsx";

export function DownloadObjectButton({
  id,
  className
}: {
  id: string;
  className?: string;
}) {
  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const result = await downloadObjectApi(id);

      console.log("Downloading file with id:", id);
      console.log("Headers:", result.headers);

      const contentDisposition = result.headers["content-disposition"];
      let filename = extractFileName(contentDisposition);

      console.log("filename")
      console.log(filename);

      if (!filename) {
        console.warn("Filename could not be extracted from Content-Disposition header. Fallback used.");
        filename = "downloaded-file";
      }

      const blob = new Blob([result.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      // Освобождаем ресурсы
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <button
      className={clsx(styles['download-button'], className)}
      onClick={handle}
    >
      <Download size={24} />
    </button>
  );
}

function extractFileName(contentDisposition?: string): string | null {
  if (!contentDisposition) {
    return null;
  }

  try {
    // Ищем filename* (UTF-8 encoded)
    const utf8FileNameMatch = contentDisposition.match(/filename\*\=UTF\-8''([^;]+)/);
    if (utf8FileNameMatch && utf8FileNameMatch.length > 1) {
      return decodeURIComponent(utf8FileNameMatch[1].trim());
    }

    // Ищем обычный filename=
    const asciiFileNameMatch = contentDisposition.match(/filename="([^"]+)"/) ||
                               contentDisposition.match(/filename=([^;]+)/);
    if (asciiFileNameMatch && asciiFileNameMatch.length > 1) {
      return asciiFileNameMatch[1].trim();
    }

  } catch (error) {
    console.error("Error parsing content-disposition header:", error);
  }

  return null;
}
