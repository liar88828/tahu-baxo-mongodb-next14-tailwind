import type { User } from "@prisma/client"

export type UserPublic = Omit<
  User,
  "password" | "otp" | "updatedAt" | "expiresOtp" | "refresh_token"
>
export type UserPublicGeneric<T> = Omit<
  T,
  "password" | "otp" | "updatedAt" | "expiresOtp" | "refresh_token"
>
export type UserId = { id_user: UserPublic["id"] }

export type ResponseRegister = {
  accessToken: string
  refreshToken: { id: string }
  data: Pick<User, "name" | "id" | "email" | "image">
}
