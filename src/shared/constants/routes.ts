export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EXPLORER: '/explorer',
  PROFILE: '/profile',
  FILESYSTEM: '/file-system',

  LINK_RESOLVER: (id: string) => `/link-resolver/${id}`
} as const;