// import GitHubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
// // import EmailProvider from 'next-auth/providers/email'
// import CredentialProvider from 'next-auth/providers/credentials'
// import {PrismaAdapter} from "@auth/prisma-adapter"
// import {PrismaClient} from "@prisma/client"
// import {validPass} from "@/lib/validator/bcrypt";
// import {NextAuthConfig} from "next-auth";
//
// const prisma = new PrismaClient()
// export const options: NextAuthConfig = {
//
//   pages: {
//     signIn: "/login",
//   },
//
//   adapter: PrismaAdapter(prisma),
//
//   secret: process.env.NEXTAUTH_SECRET,
//
//   session: {
//     strategy: 'jwt',// 'database' akan masuk ke data base
//     // maxAge: 30 * 24 * 60 * 60, // 30 days
//     // updateAge: 24 * 60 * 60, // 24 hours
//     // generateSessionToken: () => {
//     // 	return new Date().toISOString()z
//     // },
//   },
//
//   providers: [
//     CredentialProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'email',
//           type: 'email',
//           placeholder: 'your email address',
//         },
//         password: {
//           label: 'password',
//           type: 'password',
//           placeholder: 'your password',
//         },
//       },
//       //@ts-ignore
//       async authorize(credentials, req) {
//         if (!credentials) {
//           return null
//         }
//         try {
//           // console.log(credentials)
//           const user = await prisma.user.findUnique({where: {email: credentials?.email}})
//
//           // console.log(user, 'user')
//           // console.log(req.token, 'req')
//           if (user) {
//             console.log('user exists')
//             const match = await validPass(credentials.password, user.password)
//             // console.log(match)
//             if (match) {
//               console.log('Good Pass')
//               //@ts-ignore
//               delete user?.password
//               //@ts-ignore
//               user.role = 'Unverified Email'
//               // console.log(user)
//
//               return {...user}
//             }
//           }
//         } catch (error) {
//           console.error(error)
//
//           return null
//         }
//       },
//     }),
//
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//       profile(profile) {
//         // console.log('profile github', profile)
//         const email: string = profile.email
//         if (email.includes('liar')) {
//           profile.role = 'admin'
//         } else {
//           profile.role = 'user'
//         }
//         // console.log('profile github', profile)
//
//         return {
//           // ...profile,
//           // image: profile.avatar_url,
//           // role: profile.role,
//           id: profile.id,
//           name: profile.name,
//           email: profile.email,
//           role: profile.role,
//           image: profile.avatar_url,
//         }
//       },
//     }),
//
//     GoogleProvider({
//       profile(profile) {
//
//         // console.log('profile Google', profile)
//
//         // let userRole = 'User Google'
//         const email: string = profile.email
//         if (email.includes('liar')) {
//           profile.role = 'admin'
//         } else {
//           profile.role = 'user'
//         }
//         // console.log(profile)
//         return {
//           id: profile.sub,
//           name: `${profile.given_name} ${profile.family_name}`,
//           email: profile.email,
//           role: profile.role,
//           image: profile.picture,
//           // image:profile.
//           // ...profile,
//           // id: profile.sub,
//           // role: userRole,
//         }
//       },
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),
//
//     // EmailProvider( {
//     //   server: {
//     //     host: process.env.EMAIL_SERVER_HOST,
//     //     port: process.env.EMAIL_SERVER_PORT,
//     //     auth: {
//     //       user: process.env.EMAIL_SERVER_USER,
//     //       pass: process.env.EMAIL_SERVER_PASSWORD,
//     //     },
//     //   },
//     //   from  : process.env.EMAIL_FROM,
//     // } ),
//
//     // EmailProvider({
//     // 	server: process.env.EMAIL_SERVER,
//     // 	from: process.env.EMAIL_FROM,
//     // 	// maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
//     // }),
//   ],
//
//   callbacks: {
//     async signIn({account, profile}) {
//       console.log('callbacks signIn')
//       // console.log(account, 'account')
//       // console.log(profile, 'profile')
//       if (account !== null) {
//         if (account.provider === 'credentials') {
//           return true
//         }
//       }
//       if (profile !== undefined && account !== null) {
//         if (account.provider === "google" && profile.email !== undefined) {
//           console.log('google')
//           // return profile.email_verified && profile.email.endsWith("@gmail.com")
//           return profile.email_verified && profile.email.endsWith("@gmail.com")
//         }
//       }
//       console.log('callbacks signIn false')
//       return false
//     },
//
//     async jwt({token, user, account}) {
//       if (user) {
//         token.id = user.id
//       }
//       if (account) {
//         token.accessToken = account.access_token
//       }
//
//       // console.log(trigger, 'trigger') // will get a value after a use a useSession wil
//       // console.log(session, 'session') // after update session use a useSession wil get a value
//       // console.log(token, 'token')
//       // console.log(user, 'user')
//       // console.log(account, 'account')
//       // console.log( profile, 'profile' )
//       return {
//         ...token,
//         ...user,
//       }
//     },
//
//     async session({session, token, user, newSession}) {
//       // const getToken = await prisma.account.findFirst({
//       // 	where: {
//       // 		userId: user.id,
//       // 	},
//       // })
//
//       // let accessToken: string | null = null
//       // if (getToken) {
//       // 	accessToken = getToken.access_token!
//       // 	session.user.token = accessToken
//       // }
//
//       session.user = token
//
//       // console.log(user)
//       // console.log(session)
//       // console.log(newSession)
//       // console.log(token)
//       return session
//     },
//   },
//
// } satisfies NextAuthOptions;
