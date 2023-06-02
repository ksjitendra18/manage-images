import { InferModel } from 'drizzle-orm'
import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 256 }),
  userAuthId: varchar('userAuthId', { length: 256 }),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  password: varchar('password', { length: 256 })
})

export const userApiKeys = mysqlTable('userapikeys', {
  id: serial('id').primaryKey(),
  key: varchar('name', { length: 256 }),
  userId: varchar('userId', { length: 256 })
})

export type User = InferModel<typeof users>
export type UserApiKey = InferModel<typeof userApiKeys>
