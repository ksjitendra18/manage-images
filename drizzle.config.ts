import type { Config } from 'drizzle-kit'

export default {
  schema: './netlify/db/schema.ts',
  out: './netlify/db/drizzle',
  connectionString:
    'mysql://16u21ndxw4xiryegm1uy:pscale_pw_RdJqDkODTo1C8Djmi48c1b5VDENgEKJS5M8L5UFXBwH@aws.connect.psdb.cloud/manage-images?ssl={"rejectUnauthorized":true}'
} satisfies Config
