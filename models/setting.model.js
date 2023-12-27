import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
const env = dotenv.config().parsed;

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = mysql2.createPool({
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        connectionLimit: env.DB_CONNECTION_LIMIT,
      });

      Database.instance = this;
    }
    return Database.instance;
  }

  async getConnection() {
    return await this.pool.getConnection();
  }
}

export default Database;