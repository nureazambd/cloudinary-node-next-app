const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const User = require('../models/User'); // Create this file later

// const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: 'dfd7ia0w5', 
    api_key: '973967759692679', 
    api_secret: '44oEFnsgObdfIbWPgn17jwo0uSw'
  });

// Multer Configuration
// const storage = multer.diskStorage({
//     destination: './public/images',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });
// const path = require('path');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new user
router.post('/', async (req, res) => {

    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result)=>{
        try {
    
            const user = new User({
                name: req.body.name,
                imageUrl: result.secure_url,
            });
    
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
    
});

module.exports = router;