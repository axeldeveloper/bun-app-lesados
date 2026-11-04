import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import authConfig from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const [adminUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!adminUser) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          adminUser.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(adminUser.id),
          name: adminUser.email,
          email: adminUser.email,
        };
      },
    }),
  ],
});
