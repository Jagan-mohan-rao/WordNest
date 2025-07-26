const exp = require('express');
const adminApp = exp.Router();
const userauthor = require('../models/userAuthorModel');
const expressAsyncHandler = require('express-async-handler');
const createUserOrAuthor =require('./createUserOrAuthor') 
const admin =require( '../models/adminModel');

// In adminApi.js
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
  const { email, profileImageUrl, firstName, lastName, role  } = req.body;
  const adminUser = await admin.findOne({ email });
  if (!adminUser) {
    return res.status(401).send({ message: 'Invalid admin credentials' });
  }

  // Update the admin document in the database with the latest info from Clerk/frontend
  // This ensures profileImageUrl (and other fields) are always synced
  const updateFields = {};
  if (profileImageUrl) updateFields.profileImageUrl = profileImageUrl;
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (role) updateFields.role = role; // Ensure role is 'admin'

  if (Object.keys(updateFields).length > 0) {
    adminUser = await admin.findOneAndUpdate(
      { email },
      { $set: updateFields }, // Use $set to update specific fields
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );
  }
  
  res.send({ message: 'admin', payload: adminUser });
}));


// Get all users & authors
adminApp.get('/all-users', expressAsyncHandler(async (req, res) => {
  const users = await userauthor.find({ role: { $in: ['user', 'author'] } });
  res.send({ message: 'all users', payload: users });
}));



// Enable/Disable user/author
adminApp.put('/toggle-active/:id', expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const updated = await userauthor.findByIdAndUpdate(id, { isActive }, { new: true });
  res.send({ message: 'status updated', payload: updated });
}));

module.exports = adminApp;