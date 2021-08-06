import { createConnection } from 'typeorm';

(async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'docker',
      database: 'queries_challenge',
      name: 'default',
      migrations: ['./src/database/migrations/*.ts'],
      entities: ['./src/modules/**/entities/*.ts'],
      cli: {
        migrationsDir: './src/database/migrations',
      },
    });
  } catch (err) {
    console.error({ error: err.name, message: err.message });
  }
})();
