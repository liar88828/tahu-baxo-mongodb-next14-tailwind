import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/config/prisma";
import NextAuth from "next-auth";

export const {handlers, signIn, signOut, auth,} = NextAuth({
  adapter : PrismaAdapter(prisma),
  secret : process.env.NEXTAUTH_SECRET ?? "secret",
  providers : [
    Credentials({
      credentials : {
        email : {label : 'email', type : 'text'},
        password : {label : 'password', type : 'password'},
      },
      authorize : async () => {
        const res = await fetch('http://localhost:3000/api/user/login',
          {
            method : "POST",
            headers : {
              "content-type" : "application/json"
            }
          })
        if (!res.ok) {
          throw new Error("User is Not Found")
        }
        const user = await res.json()
        return user
      }
    })
  ],
})
