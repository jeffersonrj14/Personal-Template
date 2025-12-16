import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),
    WAKATIME_ACCESS_TOKEN: z.string().startsWith('waka'),
    GITHUB_READ_USER_TOKEN: z.string().startsWith('ghp'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
  },
  client: {
    NEXT_PUBLIC_UMAMI_URL: z.url(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.uuid()
  },
  runtimeEnv: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    WAKATIME_ACCESS_TOKEN: process.env.WAKATIME_ACCESS_TOKEN,
    GITHUB_READ_USER_TOKEN: process.env.GITHUB_READ_USER_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  }
})
