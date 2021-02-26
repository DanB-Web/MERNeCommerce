import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

import { 
  addOrderItems, 
  getOrderById, 
  updateOrderToPaid,
  getMyOrders 
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, addOrderItems);

router.get('/myorders', protect, getMyOrders);

//Note this goes below '/':
//Otherwise anything else passed after the slash may be interpreted as an id param
router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

export default router;