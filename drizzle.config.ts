import type { Config } from 'drizzle-kit'

export default {
  schema: './netlify/db/schema.ts',
  out: './netlify/db/drizzle',
  connectionString: ''
} satisfies Config
