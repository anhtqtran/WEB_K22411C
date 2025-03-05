const express = require('express');
const app = express();
const port = 4000;
const { body, validationResult } = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

app.use(morgan('combined'));

// Cấu hình body-parser với giới hạn lớn hơn
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Cấu hình CORS cho Angular
app.use(cors());

let client, database, fashionCollection;

async function startServer() {
  try {
    client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    console.log('Connected to MongoDB successfully');
    database = client.db('FashionData');
    fashionCollection = database.collection('Fashion');
    await updateExistingData();
    await insertSampleData();
    app.listen(port, () => {
      console.log(`My Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

async function updateExistingData() {
  try {
    console.log('Checking for documents without createdAt...');
    const result = await fashionCollection.updateMany(
      { "createdAt": { $exists: false } },
      { $set: { "createdAt": new Date() } }
    );
    console.log(`Updated ${result.modifiedCount} existing documents with createdAt`);
  } catch (err) {
    console.error('Error updating existing data:', err);
  }
}

async function insertSampleData() {
  try {
    console.log('Checking Fashion collection...');
    const count = await fashionCollection.countDocuments();
    console.log(`Current number of documents in Fashion collection: ${count}`);

    const sampleData = [
      { style: 'Casual', fashion_subject: 'Summer Shirt', fashion_detail: 'Light cotton shirt', fashion_image: 'shirt.jpg', createdAt: new Date() },
      { style: 'Casual', fashion_subject: 'Denim Jeans', fashion_detail: 'Blue slim jeans', fashion_image: 'jeans.jpg', createdAt: new Date() },
      { style: 'Casual', fashion_subject: 'Sneakers', fashion_detail: 'White sneakers', fashion_image: 'sneakers.jpg', createdAt: new Date() },
      { style: 'Formal', fashion_subject: 'Black Suit', fashion_detail: 'Wool suit', fashion_image: 'suit.jpg', createdAt: new Date() },
      { style: 'Formal', fashion_subject: 'Dress Shirt', fashion_detail: 'White formal shirt', fashion_image: 'dress_shirt.jpg', createdAt: new Date() },
      { style: 'Formal', fashion_subject: 'Leather Shoes', fashion_detail: 'Polished black shoes', fashion_image: 'shoes.jpg', createdAt: new Date() },
      { style: 'Sport', fashion_subject: 'Running Shoes', fashion_detail: 'Lightweight shoes', fashion_image: 'running_shoes.jpg', createdAt: new Date() },
      { style: 'Sport', fashion_subject: 'Gym Shorts', fashion_detail: 'Breathable fabric', fashion_image: 'shorts.jpg', createdAt: new Date() },
      { style: 'Sport', fashion_subject: 'Sports Tee', fashion_detail: 'Quick-dry t-shirt', fashion_image: 'tee.jpg', createdAt: new Date() },
    ];

    console.log('Inserting sample data (skipping duplicates)...');
    let insertedCount = 0;
    for (const item of sampleData) {
      const exists = await fashionCollection.findOne({ fashion_subject: item.fashion_subject });
      if (!exists) {
        await fashionCollection.insertOne(item);
        insertedCount++;
      }
    }
    console.log(`Sample data inserted successfully: ${insertedCount} new documents added`);
    console.log(`Total documents in collection now: ${await fashionCollection.countDocuments()}`);
  } catch (err) {
    console.error('Error in insertSampleData:', err);
  }
}

app.get('/', (req, res) => {
  res.send('This Web server is processed for MongoDB');
});

app.get('/api/fashions', cors(), async (req, res) => {
  try {
    if (!fashionCollection) throw new Error('Database not connected');
    const fashions = await fashionCollection.find({}).sort({ createdAt: -1 }).toArray();
    console.log('Fashions sorted by createdAt descending:', fashions.map(f => ({ id: f._id, createdAt: f.createdAt })));
    res.json(fashions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/fashions/style/:style', cors(), async (req, res) => {
  try {
    if (!fashionCollection) throw new Error('Database not connected');
    const fashions = await fashionCollection.find({ style: req.params.style }).toArray();
    res.json(fashions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/fashions/:id', cors(), async (req, res) => {
  try {
    if (!fashionCollection) throw new Error('Database not connected');
    const o_id = new ObjectId(req.params.id);
    const fashion = await fashionCollection.findOne({ _id: o_id });
    if (!fashion) return res.status(404).json({ message: 'Fashion not found' });
    res.json(fashion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post(
  '/api/fashions',
  cors(),
  [
    body('style').notEmpty().withMessage('Style là bắt buộc'),
    body('fashion_subject').notEmpty().withMessage('Tiêu đề là bắt buộc'),
    body('fashion_detail').notEmpty().withMessage('Chi tiết là bắt buộc'),
    body('fashion_image').notEmpty().withMessage('Hình thumbnail là bắt buộc'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      if (!fashionCollection) throw new Error('Database not connected');
      const newFashion = {
        style: req.body.style,
        fashion_subject: req.body.fashion_subject,
        fashion_detail: req.body.fashion_detail,
        fashion_image: req.body.fashion_image,
        createdAt: new Date(),
      };
      const result = await fashionCollection.insertOne(newFashion);
      res.status(201).json({ ...newFashion, _id: result.insertedId });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
  }
);

app.put('/api/fashions/:id', cors(), [
  body('style').notEmpty().withMessage('Style là bắt buộc'),
  body('fashion_subject').notEmpty().withMessage('Tiêu đề là bắt buộc'),
  body('fashion_detail').notEmpty().withMessage('Chi tiết là bắt buộc'),
  body('fashion_image').notEmpty().withMessage('Hình thumbnail là bắt buộc'),
], async (req, res) => {
  console.log("ID nhận được từ client:", req.params.id); // Log ID
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
      if (!fashionCollection) throw new Error('Database not connected');
      const o_id = new ObjectId(req.params.id);
      const existingFashion = await fashionCollection.findOne({ _id: o_id });
      if (!existingFashion) {
          console.log("Không tìm thấy fashion với ID:", req.params.id);
          return res.status(404).json({ message: 'Fashion không tồn tại' });
      }
      const updatedFashion = {
          style: req.body.style,
          fashion_subject: req.body.fashion_subject,
          fashion_detail: req.body.fashion_detail,
          fashion_image: req.body.fashion_image,
          createdAt: req.body.createdAt ? new Date(req.body.createdAt) : existingFashion.createdAt,
      };
      const result = await fashionCollection.updateOne({ _id: o_id }, { $set: updatedFashion });
      console.log("Kết quả update:", result);
      if (result.matchedCount === 0) return res.status(404).json({ message: 'Fashion không tồn tại' });
      res.json(updatedFashion);
  } catch (err) {
      console.error("Lỗi khi xử lý PUT:", err.message);
      res.status(500).json({ message: 'Lỗi server: ' + err.message });
  }
});

app.delete('/api/fashions/:id', cors(), async (req, res) => {
  try {
    if (!fashionCollection) throw new Error('Database not connected');
    const o_id = new ObjectId(req.params.id);
    const result = await fashionCollection.deleteOne({ _id: o_id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Fashion not found' });
    res.json({ message: 'Fashion deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

startServer();