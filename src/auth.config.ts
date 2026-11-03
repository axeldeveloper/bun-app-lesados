import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [],
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
