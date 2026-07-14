/**
 * authController.js — Authentication Business Logic
 */
// const User = require('../models/User');
// const jwt  = require('jsonwebtoken');
// 
// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// 
// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ message: 'User already exists' });
//   const user = await User.create({ name, email, password });
//   res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
// };
// 
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await user.comparePassword(password)))
//     return res.status(401).json({ message: 'Invalid credentials' });
//   res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
// };
// 
// exports.getMe = async (req, res) => {
//   const user = await User.findById(req.user.id).select('-password');
//   res.json(user);
// };
// 
// exports.googleLogin = async (req, res) => {
//   const { idToken } = req.body;
//   try {
//     const { OAuth2Client } = require('google-auth-library');
//     const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//     
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID
//     });
//     const payload = ticket.getPayload();
//     const { name, email, picture } = payload;
// 
//     let user = await User.findOne({ email });
//     if (!user) {
//       // Create a new user from Google profile if it doesn't exist
//       user = await User.create({ 
//         name, 
//         email, 
//         picture, 
//         password: Math.random().toString(36).slice(-10) // random password for oauth user
//       });
//     }
// 
//     res.json({ 
//       _id: user._id, 
//       name: user.name, 
//       email: user.email, 
//       picture: user.picture, 
//       token: generateToken(user._id) 
//     });
//   } catch (err) {
//     res.status(400).json({ message: 'Google login failed' });
//   }
// };

