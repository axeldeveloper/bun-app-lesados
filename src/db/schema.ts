import { mysqlTable, serial, varchar, text, decimal, timestamp, char } from 'drizzle-orm/mysql-core';

export const signatures = mysqlTable('signatures', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  cpf: text('cpf').notNull(),
  cpfHash: varchar('cpf_hash', { length: 64 }).notNull().unique(),
  city: varchar('city', { length: 80 }).notNull(),
  state: char('state', { length: 2 }).notNull(),
  lossAmount: decimal('loss_amount', { precision: 12, scale: 2 }),
  report: text('report'),
  consentAt: timestamp('consent_at').notNull(),
  emailVerifiedAt: timestamp('email_verified_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
