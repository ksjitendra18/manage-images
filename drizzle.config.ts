import type { Config } from 'drizzle-kit'

console.log('here', process.env.DATABASE_HOST)
export default {
  schema: './netlify/db/schema.ts',
  out: './netlify/db/drizzle',
  connectionString: ''
} satisfies Config
