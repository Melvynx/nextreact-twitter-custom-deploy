import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '~/src/db/prisma';
import { env } from '~/src/env/server';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub ?? 'error';
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
