import { config } from "@/config/baseConfig";
import { UserId, UserPublic } from "@/interface/user/UserPublic";

export async function getUserId({id_user} : UserId) {
  try {
    const res = await fetch(`${config.url}/api/user/${id_user}`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('user api error');
    }
    const data : UserPublic = await res.json()
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
    const res = await fetch(`${config.url}/api/user/`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : UserPublic[] = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}
