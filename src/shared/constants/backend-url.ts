export const BACKEND_URL_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const BACKEND_URL = {
  LOGIN: "/auth/login",
  REGISTRATION: "/auth/registration",
  LOGOUT: "/auth/logout",
  USER: "/user",
  USER_INITIALS: "/user/initials",
  USER_EMAIL: "/user/email",
  USER_PASSWORD: "/user/password",
  USER_PICTURE: "/user/picture",
  FILE_SYSTEM_FILES: "/file-system/files",
  FILE_SYSTEM_FOLDERS: "/file-system/folders",
  FILE_SYSTEM: "/file-system",
  FILE_SYSTEM_FAVORITES: "/file-system/favorites",
  FILE_SYSTEM_DOWNLOAD: (id: string) => `/file-system/${id}/download`,
  TAGS: "/tags",
  SHARE_LINKS: "/share-links"
}