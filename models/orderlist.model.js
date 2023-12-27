import mysql2 from "mysql2/promise";
import Database from "./setting.model.js";
const db = new Database(mysql2);

export const getOrderLists = async () => {
  let conn;
  try {
    conn = await db.getConnection();
    const orderLists = await conn.query("select id, date from order_list");
    return orderLists;
  } finally {
    if (conn) conn.release();
  }
};
