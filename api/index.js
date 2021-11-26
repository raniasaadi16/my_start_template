const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const errorMiddleware = require('./utils/errors');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});
mongoose.connect(process.env.MONGO_URL , 
    {useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(console.log('DB connected ....')).catch(err=> console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

//ERROR MIDDLEWARE
app.use(errorMiddleware);


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});