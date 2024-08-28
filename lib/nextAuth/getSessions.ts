import {auth} from "@/auth";

export const getSessions = async () => {
  const session = await auth()
  if (!session) {
    throw new Error('not authenticated');
  }
  return session
}
