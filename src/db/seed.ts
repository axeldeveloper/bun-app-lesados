import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST!,  // || 'localhost',
    user: process.env.DB_USER!,  // || 'root',
    password: process.env.DB_PASSWORD!, // || '',
    database: process.env.DB_NAME!,     // || 'seu_banco',
    port: Number(process.env.DB_PORT) || 3306,
  });

  const db = drizzle(connection, { schema, mode: 'default' });

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await db.insert(schema.users).values({
    email: 'admin@exemplo.com',
    password: hashedPassword,
  }).catch(() => {
    console.log('Usuário admin já pode existir.');
  });

  console.log('✅ Seed executado com sucesso! (Admin: admin@exemplo.com / admin123)');
  await connection.end();
}

seed();
