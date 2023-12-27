import mysql2 from "mysql2/promise";
import Database from "./setting.model.js";
const db = new Database(mysql2);

export const checkDuplicateID = async (id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const properties = [id];
    const isDuplicate = await conn.query(
      `
      select id
      from user
      where id = ?
      `,
      properties
    );
    return isDuplicate[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const updateKey = async (hashedPassword, id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const properties = [hashedPassword, id];
    await conn.query(
      `
      update user
      set password = ?
      where id = ?
      `,
      properties
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const addUser = async (id, password, name, birth, tel, email, address) => {
  let conn;
  try {
    conn = await db.getConnection();
    const properties = [id, password, name, birth, tel, email, address];
    await conn.query(
      `
      insert into user
      values(?, ?, ?, ?, ?, ?, ?)
      `,
      properties
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
