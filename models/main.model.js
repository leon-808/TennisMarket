import mysql2 from "mysql2/promise";
import Database from "./setting.model.js";
const db = new Database(mysql2);

export const getProducts = async () => {
  let conn;
  try {
    conn = await db.getConnection();
    const products = await conn.query(`
      select a.id, a.name, b.url
      from product a, image b
      where a.id = b.product_id;
    `);
    return products;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const addItem = async (productId) => {
  let conn;
  try {
    conn = await db.getConnection();
    const properties = [productId];
    await conn.query(
      `
      insert into order_list 
      values (
        '임시 아이디', 'leehoosgg', ?, default,
        '임시 주소', '임시 받는 사람', 1, '임시 결제 타입', '임시 배송 상태'
      )
      `,
      properties
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
