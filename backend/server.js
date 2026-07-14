/**
 * server.js — Express Server Entry Point
 * TODO: Uncomment and configure when ready to launch backend.
 */

// const express    = require('express');
// const mongoose   = require('mongoose');
// const cors       = require('cors');
// const dotenv     = require('dotenv');
// 
// const productRoutes = require('./routes/productRoutes');
// const authRoutes    = require('./routes/authRoutes');
// const orderRoutes   = require('./routes/orderRoutes');
// 
// dotenv.config();
// 
// const app  = express();
// const PORT = process.env.PORT || 5000;
// 
// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));
// 
// // Routes
// app.use('/api/products', productRoutes);
// app.use('/api/auth',     authRoutes);
// app.use('/api/orders',   orderRoutes);
// 
// // DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(Server running on port +PORT));
//   })
//   .catch(err => console.error(err));
