import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

const authOptions:NextAuthOptions = {
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })],
    pages:{
        signIn:"/sign-in",
    }
}

export default authOptions