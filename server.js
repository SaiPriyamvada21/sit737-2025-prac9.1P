const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection setup
const dbUser = process.env.MONGO_USER;
const dbPass = process.env.MONGO_PASS;
const dbHost = process.env.MONGO_HOST;
const mongoUri = `mongodb://${dbUser}:${dbPass}@${dbHost}:27017/`;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define MongoDB schema + model
const ItemSchema = new mongoose.Schema({
    name: String,
    value: Number
});
const Item = mongoose.model('Item', ItemSchema);

// Winston logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Middleware for logging requests + responses
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    res.on('finish', () => {
        logger.info(`Response: ${req.method} ${req.url} → ${res.statusCode}`);
    });
    next();
});

// CRUD ROUTES FOR MongoDB
app.post('/item', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/item/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/item/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CALCULATOR ROUTES
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) return res.status(400).json({ error: 'Invalid numbers' });
    res.json({ result: num1 + num2 });
});



// HEALTH & INFO ENDPOINTS
app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

app.get('/info', (req, res) => {
    res.json({
        service: 'Calculator Microservice',
        version: '2.0',
        author: 'Sai Priyamvada',
        status: 'Running'
    });
});

app.get('/db-health', async (req, res) => {
    const state = mongoose.connection.readyState;
    if (state === 1) {
        res.status(200).send('Database Connected');
    } else {
        res.status(500).send('Database Not Connected');
    }
});

// START SERVER (only once!)
app.listen(port, () => {
    logger.info(`Calculator microservice listening on port ${port}`);
}).on('error', (err) => {
    logger.error('Server startup error:', err);
});
