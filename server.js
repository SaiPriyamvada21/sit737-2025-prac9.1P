const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// Configuring Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});


app.use((req, res, next) => {
    logger.info({
        message: `Incoming request: ${req.method} ${req.url}`,
        headers: req.headers,
        ip: req.ip,
    });
    res.on('finish', () => {
        logger.info({
            message: `Outgoing response: ${req.method} ${req.url}`,
            statusCode: res.statusCode,
            
        });
    });
    next();
});

app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = 'addition';

    if (isNaN(num1) || isNaN(num2)) {
        logger.warn({ message: `Invalid input for ${operation}: num1=${req.query.num1}, num2=${req.query.num2}` });
        return res.status(400).json({ error: 'Invalid input: num1 and num2 must be valid numbers.' });
    }

    const result = num1 + num2;
    logger.info({ message: `Performed ${operation}: ${num1} + ${num2} = ${result}` });
    res.json({ result });
});

app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = 'subtraction';

    if (isNaN(num1) || isNaN(num2)) {
        logger.warn({ message: `Invalid input for ${operation}: num1=${req.query.num1}, num2=${req.query.num2}` });
        return res.status(400).json({ error: 'Invalid input: num1 and num2 must be valid numbers.' });
    }

    const result = num1 - num2;
    logger.info({ message: `Performed ${operation}: ${num1} - ${num2} = ${result}` });
    res.json({ result });
});

app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = 'multiplication';

    if (isNaN(num1) || isNaN(num2)) {
        logger.warn({ message: `Invalid input for ${operation}: num1=${req.query.num1}, num2=${req.query.num2}` });
        return res.status(400).json({ error: 'Invalid input: num1 and num2 must be valid numbers.' });
    }

    const result = num1 * num2;
    logger.info({ message: `Performed ${operation}: ${num1} * ${num2} = ${result}` });
    res.json({ result });
});

app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = 'division';

    if (isNaN(num1) || isNaN(num2)) {
        logger.warn({ message: `Invalid input for ${operation}: num1=${req.query.num1}, num2=${req.query.num2}` });
        return res.status(400).json({ error: 'Invalid input: num1 and num2 must be valid numbers.' });
    }

    if (num2 === 0) {
        logger.error({ message: `Attempted division by zero: num1=${num1}, num2=${num2}` });
        return res.status(400).json({ error: 'Cannot divide by zero.' });
    }

    const result = num1 / num2;
    logger.info({ message: `Performed ${operation}: ${num1} / ${num2} = ${result}` });
    res.json({ result });
});

app.listen(port, () => {
    logger.info(`Calculator microservice listening on port ${port}`);
});

app.get('/exponentiate', (req, res) => {
    const base = parseFloat(req.query.base);
    const exponent = parseFloat(req.query.exponent);
    const operation = 'exponentiation';

    if (isNaN(base) || isNaN(exponent)) {
        logger.warn({ message: `Invalid input for ${operation}: base=${req.query.base}, exponent=${req.query.exponent}` });
        return res.status(400).json({ error: 'Invalid input: base and exponent must be valid numbers.' });
    }

    const result = Math.pow(base, exponent);
    logger.info({ message: `Performed ${operation}: ${base}^${exponent} = ${result}` });
    res.json({ result });
});

app.get('/sqrt', (req, res) => {
    const num = parseFloat(req.query.num);
    const operation = 'square root';

    if (isNaN(num) || num < 0) {
        logger.warn({ message: `Invalid input for ${operation}: num=${req.query.num}` });
        return res.status(400).json({ error: 'Invalid input: num must be a valid non-negative number.' });
    }

    const result = Math.sqrt(num);
    logger.info({ message: `Performed ${operation}: sqrt(${num}) = ${result}` });
    res.json({ result });
});

app.get('/modulo', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = 'modulo';

    if (isNaN(num1) || isNaN(num2)) {
        logger.warn({ message: `Invalid input for ${operation}: num1=${req.query.num1}, num2=${req.query.num2}` });
        return res.status(400).json({ error: 'Invalid input: num1 and num2 must be valid numbers.' });
    }

    if (num2 === 0) {
        logger.error({ message: `Attempted modulo by zero: num1=${num1}, num2=${num2}` });
        return res.status(400).json({ error: 'Cannot perform modulo by zero.' });
    }

    const result = num1 % num2;
    logger.info({ message: `Performed ${operation}: ${num1} % ${num2} = ${result}` });
    res.json({ result });
});
app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

