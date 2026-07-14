/**
 * productController.js — Product Business Logic
 */
// const Product = require('../models/Product');
// 
// exports.getAllProducts = async (req, res) => {
//   const { category, limit } = req.query;
//   const filter = category && category !== 'all' ? { category } : {};
//   const products = await Product.find(filter).limit(parseInt(limit) || 0);
//   res.json(products);
// };
// 
// exports.getProductById = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: 'Product not found' });
//   res.json(product);
// };
// 
// exports.createProduct = async (req, res) => {
//   const product = new Product(req.body);
//   const saved = await product.save();
//   res.status(201).json(saved);
// };
// 
// exports.updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!product) return res.status(404).json({ message: 'Product not found' });
//   res.json(product);
// };
// 
// exports.deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Product deleted' });
// };
