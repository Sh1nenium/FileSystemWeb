export type Session = {
  id: number,
  value: string,
  userId: number,
  username: string,
  expiresAt: string,
  isBlacklisted: boolean,
}