import express from 'express';
import { getSales } from '../controllers/sales.js';

const router =express.Router();  


router.get('/stats',getSales);

export default router; 