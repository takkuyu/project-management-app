const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

//Connect to DB
connectDB();

//Route Middleware
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});