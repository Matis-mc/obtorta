const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./auth/routes/authRouter');
const coffeeRoute = require('./coffee/routes/coffeeRouter')
const herdRouter = require('./herd/routes/herdRouter');

//--------------------------------- Connection Mongo DB ---------------------------------\\
mongoose.connect("mongodb+srv://coffee_app:1234@coffeeapp.pftlkzu.mongodb.net/",
{
    dbName: "herd", 
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log("connection à MongoDB réussie ! "))
    .catch((e) => console.error("connection à MongoDB échouée ..." + JSON.stringify(e)))

//--------------------------------- Configuration Express ---------------------------------\\
app.use(express.json());

//--------------------------------- Configuration CORS ---------------------------------\\
app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'https://coffee-app-two-lyart.vercel.app');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('x-Trigger','CORS')
    next();
    });
const allowedOrigins = [
  'https://coffee-enctype="multipart/form-data"app-two-lyart.vercel.app',
  'https://la-harde.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
    'http://localhost:8000',
  'file:///home/matis/dev/gpx_exporter.html'
];

const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
 };
app.use(cors(corsOptions));

//--------------------------------- Configuration route ---------------------------------\\
app.use('/obtorta/auth', authRoute);
app.use('/obtorta/coffee', coffeeRoute)
app.use('/obtorta/herd', herdRouter);

module.exports = {app};