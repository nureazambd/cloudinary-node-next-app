const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user'); // Create this file later
const cors = require('cors');
const fileUpoad = require('express-fileupload')

dotenv.config();

const app = express();


app.use(fileUpoad({
    useTempFiles:true
}))


app.use(cors());
app.use(express.json()); // For parsing application/json

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));