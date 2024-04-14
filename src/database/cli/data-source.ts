import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../../**/database/migrations/*.js'],
  synchronize: false,
  logging: false,
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;