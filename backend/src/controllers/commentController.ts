import { Request, Response } from 'express';
import { query } from '../config/db';

export const getProductComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findProductComments = `
        SELECT c.*, u.username, u.email 
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.product_id = $1
      `;
    const q = await query(findProductComments, [id]);
    res.status(200).json(q.rows);
  } catch (e) {
    console.log(e);
  }
};

export const addProductComment = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { comment } = req.body;
    const user: any = req.user;
    const createCommentQuery = 'INSERT INTO comments (user_id, product_id, comment_text) VALUES ($1, $2, $3)';
    const q = await query(createCommentQuery, [user.id, productId, comment]);
    if (q.rowCount === 1) {
      return res.status(200).json({ q, success: true });
    }
    res.status(400).json({ success: false });
  } catch (e) {
    console.log(e);
  }
};

export const testComment = async (req: Request, res: Response) => {
  res.json({ message: 'This a test!' });
};
