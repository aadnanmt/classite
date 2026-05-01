import { drizzle } from 'drizzle-orm/libsql'

const tursoUrl = process.env.TURSO_DB_URL
const tursoToken = process.env.TURSO_TOKEN

// Fail-fast
if (!tursoUrl || !tursoToken) {
  throw new Error('Fail: TURSO_DB_URL and TURSO_TOKEN not found on .env')
}

// initialize conection turso
export const db = drizzle({
  connection: {
    url: tursoUrl,
    authToken: tursoToken,
  },
})
