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

  FILE_SYSTEM_FAVORITES: "/file-system/favorites"
}