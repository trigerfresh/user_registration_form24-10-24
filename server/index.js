// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  name: String,
  gender: String,
  category : String,
  isFeatured: { type: Boolean, default: false }, // Add isFeatured field
  isPublic: { type: Boolean, default: false }, // Add isPublic field
  imagePath: String,
});

const Image = mongoose.model('users', imageSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  const { name, gender, category, isFeatured, isPublic} = req.body;
  const imagePath = req.file.path;

  const newImage = new Image({ name, gender, category, imagePath,  
				isFeatured: isFeatured === 'true', // Convert to boolean
				isPublic: isPublic === 'true', // Convert to boolean
			     });
  newImage.save()
    .then(() => res.status(201).json({ message: 'Image uploaded successfully!' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/images', (req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/images/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, gender, category, isFeatured, isPublic } = req.body;
  const updateData = {
    name,
    gender,
    category,
    isFeatured: isFeatured === 'true',
    isPublic: isPublic === 'true',
  };

  if (req.file) {
    updateData.imagePath = req.file.path;
  }

  Image.findByIdAndUpdate(id, updateData, { new: true })
    .then(updatedImage => res.json(updatedImage))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/images/:id', (req, res) => {
  const { id } = req.params;
  
  Image.findByIdAndDelete(id)
    .then(deletedImage => {
      if (!deletedImage) {
        return res.status(404).json({ message: 'Image not found' });
      }
      // Optionally, you can delete the file from the filesystem here using fs.unlink
      res.json({ message: 'Image deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
