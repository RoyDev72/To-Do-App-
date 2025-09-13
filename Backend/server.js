import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import todoRoutes from './routes/todo.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/todos', todoRoutes);

// ESM __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
  });
}

// debug endpoint to show current DB and collections
app.get('/debug/db', async (req, res) => {
  try {
    const mongooseModule = await import('mongoose');
    const mongoose = mongooseModule.default || mongooseModule;
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    const collections = (await db.listCollections().toArray()).map(c => c.name);
    res.json({ connected: true, dbName, collections });
  } catch (err) {
    console.error('Debug DB error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();