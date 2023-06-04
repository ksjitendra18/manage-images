import { InferModel } from 'drizzle-orm'
import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 256 }).notNull(),
  userAuthId: varchar('userAuthId', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull()
})

export const userApiEndpoints = mysqlTable('userapiendpoints', {
  id: serial('id').primaryKey(),
  endpointId: varchar('endpointId', { length: 64 }).notNull(),
  provider: varchar('provider', { length: 64 }).notNull(),
  apiKey: varchar('name', { length: 256 }).notNull(),
  userId: varchar('userId', { length: 256 }).notNull(),
  folderName: varchar('folderName', { length: 256 }).notNull(),
  storageName: varchar('storageName', { length: 256 }).notNull()
})

export type User = InferModel<typeof users>
export type UserApiEndpoint = InferModel<typeof userApiEndpoints>
