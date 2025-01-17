// TODO: split to: config & config.edge

import { skipCSRFCheck } from '@auth/core'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '@repo/db'
import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from 'next-auth'
import Discord from 'next-auth/providers/discord'

import { env } from '../env'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const adapter = PrismaAdapter(db)

export const isSecureContext = env.NODE_ENV !== 'development'

export const authConfig = {
  adapter,
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? {
        skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  secret: env.AUTH_SECRET,
  providers: [Discord],
  callbacks: {
    session: (opts) => {
      if (!('user' in opts)) throw new Error('unreachable with session strategy')

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      }
    },
  },
} satisfies NextAuthConfig

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice('Bearer '.length)
  const session = await adapter.getSessionAndUser?.(sessionToken)
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null
}

export const invalidateSessionToken = async (token: string) => {
  await adapter.deleteSession?.(token)
}
