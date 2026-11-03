import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function runMigrations() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'seu_banco',
    port: Number(process.env.DB_PORT) || 3306,
  });

  const db = drizzle(connection);

  console.log('⏳ Executando migrações...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('✅ Migrações aplicadas com sucesso!');

  await connection.end();
}

runMigrations().catch((err) => {
  console.error('❌ Erro ao rodar migrações:', err);
  process.exit(1);
});
