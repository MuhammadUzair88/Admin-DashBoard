import express from 'express';

import {getDashboardStats, getUser, testuser} from '../controllers/general.js';


const router =express.Router();


router.get('/user/:id',getUser);
router.get('/user',testuser);
router.get('/dashboardstats',getDashboardStats)

export default router;