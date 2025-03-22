import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// Data imports
import User from './models/User.js';
import Product from './models/product.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import { dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat } from './data/index.js';

import ProductStat from './models/productStat.js';

 
// Configurations
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// Database Connection & Server Start
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(async () => {
    console.log('✅ DB Connected Successfully');

    // Insert sample data only if the collection is empty
    const existingUsers = await User.countDocuments();
    const existingProducts = await Product.countDocuments();
    const existingProductStats =await ProductStat.countDocuments();


  

    if (existingUsers === 0) {
      await User.insertMany(dataUser);
      console.log('📥 Initial user data inserted.');
    } else {
      console.log('📂 User data already exists. Skipping insertion.');
    }
    if (existingProducts === 0) {
      await Product.insertMany(dataProduct);
      console.log('📥 Initial user data inserted.');
    } else {
      console.log('📂 User data already exists. Skipping insertion.');
    }
    if (existingProductStats === 0) {
      await ProductStat.insertMany(dataProductStat);
      console.log('📥 Initial user data inserted.');
    } else {
      console.log('📂 User data already exists. Skipping insertion.');
    }

    // Start the server only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB Connection Error:', err.message);
  });
