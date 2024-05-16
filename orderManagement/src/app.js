const express = require('express');
const orderRouter = require('./routers/orderRouter');
require('dotenv').config();
require('./database/database');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/orders', orderRouter);
//Generic error handling. Can be moved to a file in middlewares folder and be extended
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});