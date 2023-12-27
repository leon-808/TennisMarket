import mysql2 from "mysql2/promise";
import Database from "./setting.model.js";
const db = new Database(mysql2);

export const getHashedPassword = async (id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const properties = [id];
    const hashedPassword = await conn.query(
      `
      select password
      from user
      where id = ?
      `,
      properties
    );
    return hashedPassword[0][0].password;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
