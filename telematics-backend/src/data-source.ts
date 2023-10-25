import path from "path";
import { DataSource } from "typeorm";
import dotenv from 'dotenv'


dotenv.config();

export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as any,
    logging: false,
    synchronize: true,
    entities: [ path.resolve(__dirname, 'entities', '**', '*{.ts,.js}') ],
    migrations: [path.resolve(__dirname, 'migrations', '**', '*{.ts,.js}')],
    subscribers: [path.resolve(__dirname, 'subscribers', '**', '*{.ts,.js}')],
ssl: {
      rejectUnauthorized: false  // Important: consider using a CA certificate for production use!
  },
  //   cli: {
  //     entitiesDir: path.resolve(__dirname, 'entities'),
  //     migrationsDir: path.resolve(__dirname, 'migrations'),
  //     subscribersDir: path.resolve(__dirname, 'subscribers'),
  //   },
  });
