export const formatSize = (size: number) => {
    if (size < 1024) return `${size} Б`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} КБ`;
    return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
  };

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };