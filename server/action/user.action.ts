import { UserId } from "@/interface/user/UserPublic";
import { apiGetUserAll, apiGetUserId } from "@/server/api/user.api";

export async function getUserId({id_user} : UserId) {
  try {
    const { data } = await apiGetUserId(id_user)
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
			console.log(err.message, 'getUserId')
      return null
    }
    return null
  }
}

export async function getUserAll() {
  try {
    const { data } = await apiGetUserAll()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}
