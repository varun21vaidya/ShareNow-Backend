const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const connectDB = require('./config/db');
connectDB();

var cors = require('cors');

// use it before all route definitions
// app.use(cors({ origin: ['https://share-now-backend-gi2ea360d-varun21vaidya.vercel.app/', 'https://share-now-file-sharing-app.vercel.app/', 'http://localhost:4200'] }));

// cors policy
app.use(cors({
    origin: '*',
//     ['https://share-now-backend.vercel.app/https://share-now-file-sharing-app.vercel.app/', 'https://share-now-backend.vercel.app/http://localhost:4200'], // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))


app.use(express.json());

// setup static files
// using app.use to serve up static CSS files in public/css/ folder
//  when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


// Routes 
// to upload file use this route
app.use('/api/files', require('./routes/files'));

// when file is uploaded it returns this route
app.use('/files', require('./routes/show'));


// to download file use this route
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));
