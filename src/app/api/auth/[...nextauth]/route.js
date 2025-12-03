import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.mobile || !credentials?.password) return null
        await dbConnect()
        const user = await User.findOne({ mobile: credentials.mobile })
        if (!user) return null
        if (user.password !== credentials.password) return null
        return { id: String(user._id), mobile: user.mobile }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.mobile = user.mobile
      }
      return token
    },
    async session({ session, token }) {
      session.user = { id: token.id, mobile: token.mobile }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
