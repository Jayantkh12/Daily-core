/**
 * Order.js — Mongoose Order Model
 */
// const mongoose = require('mongoose');
// 
// const orderItemSchema = new mongoose.Schema({
//   product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   name:     String,
//   quantity: { type: Number, required: true, min: 1 },
//   price:    { type: Number, required: true },
// });
// 
// const orderSchema = new mongoose.Schema({
//   user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items:          [orderItemSchema],
//   shippingAddress: { street: String, city: String, state: String, zip: String, country: String },
//   totalPrice:     { type: Number, required: true },
//   isPaid:         { type: Boolean, default: false },
//   paidAt:         Date,
//   isDelivered:    { type: Boolean, default: false },
//   deliveredAt:    Date,
//   status:         { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
// }, { timestamps: true });
// 
// module.exports = mongoose.model('Order', orderSchema);
