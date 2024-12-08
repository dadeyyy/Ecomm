import { Request, Response } from 'express';
import { query } from '../config/db';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
};

export const decreaseStock = async (req: Request, res: Response) => {
  try {
    console.log(process.env.DATABASE_CONNECTION_STRING);
    const { id } = req.body;
    const findProductQuery = 'UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0';
    const q = await query(findProductQuery, [id]);

    if (q.rowCount === 1) {
      res.json({ q, success: true });
    } else {
      res.json({ success: false, error: 'Failed to update stock' });
    }
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export const increaseStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const findProductQuery = 'UPDATE products SET stock = stock + 1 WHERE id = $1';
    const q = await query(findProductQuery, [id]);
    if (q.rowCount === 1) {
      res.json({ q, success: true });
    } else {
      res.json({ success: false, error: 'Failed to update stock' });
    }
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
