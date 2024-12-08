import { createPaymentLink } from '../utils/payment';
import { query } from '../config/db';
import { Request, Response } from 'express';

type PurchasedType = {
  user_id: number;
  product_id: number;
  quantity: number;
};


export const checkout = async (req: Request, res: Response) => {
  try {
    const { total, selectedProducts, userId } = req.body;
    const link = await createPaymentLink(userId, total, selectedProducts);
    res.status(200).json({ link });
  } catch (e) {
    console.log(e);
  }
};

export const getPurchased = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    const getPurchasedQuery =
      'SELECT p.name, p.category, p.price, q.quantity, q.purchased_date FROM products p INNER JOIN purchased q ON p.id = q.product_id WHERE q.user_id = $1';
    const getPurchase = await query(getPurchasedQuery, [user.id]);
    res.json(getPurchase.rows);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const webhook = async (req: Request, res: Response) => {
  try {
    const eventType = req.body.data.attributes.type;
    const eventId = req.body.data.id; // Unique event identifier
    console.log('EVENT ID', eventId);

    let description = req.body.data.attributes.data.attributes.description;

    // Clean and parse description
    description = description
      .replace(/:(\w+)/g, '"$1"')
      .replace(/=>/g, ':')
      .replace(/[\[\]]/g, '')
      .trim();

    let descriptionObject: PurchasedType[] = JSON.parse('[' + description + ']');

    if (eventType === 'link.payment.paid') {
      try {
        await query('BEGIN');

        await Promise.all(
          descriptionObject.map(async (data) => {
            const upsertPurchaseQuery = `
                INSERT INTO purchased (user_id, product_id, quantity, event_id)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (user_id, product_id)
                DO UPDATE SET quantity = purchased.quantity + EXCLUDED.quantity;
              `;

            await query(upsertPurchaseQuery, [data.user_id, data.product_id, data.quantity, eventId]);
          })
        );

        await query('COMMIT');
        return res.status(200).send('Purchased successful');
      } catch (e: any) {
        console.error('Database error:', e);

        await query('ROLLBACK');

        if (e.constraint === 'unique_event_id') {
          console.log(`Duplicate event detected: ${eventId}`);
          return res.status(200).send('Event already processed.');
        }

        return res.status(500).send('PAYMENT FAILED!');
      }
    }

    return res.status(400).send('Payment failed!');
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).send('Internal Server Error');
  }
};
