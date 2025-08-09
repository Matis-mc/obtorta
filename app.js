const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./auth/routes/authRouter');
const coffeeRoute = require('./coffee/routes/coffeeRouter')

mongoose.connect("mongodb+srv://coffee_app:1234@coffeeapp.pftlkzu.mongodb.net/",
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log("connection à MongoDB réussie ! "))
    .catch((e) => console.error("connection à MongoDB échouée ..." + JSON.stringify(e)))
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://coffee-app-two-lyart.vercel.app');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('x-Trigger','CORS')
    next();
    });

const corsOptions = {
   origin: 'https://coffee-app-two-lyart.vercel.app',
   optionsSuccessStatus: 200,
 };

 app.use(cors(corsOptions));

app.use('/obtorta/auth', authRoute);
app.use('/obtorta/coffee', coffeeRoute)
module.exports = app;
