import bcrypt from "bcrypt";

export const validPass = async (user: string, db: string) => bcrypt.compare(user, db)
