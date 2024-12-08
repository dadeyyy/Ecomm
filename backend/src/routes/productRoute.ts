import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { decreaseStock, getProducts, increaseStock } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/', authenticateJWT, getProducts);
productRouter.post('/decreaseStock', authenticateJWT, decreaseStock);
productRouter.post('/decreaseStock', authenticateJWT, increaseStock);
export default productRouter;
