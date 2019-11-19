const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/addImage', express.static(path.join(__dirname, 'client')));
// app.use('/routingModule', express.static('node_modules/@vanillarrouter/router-module/dist/index.js'))
app.use('/routingModule', (req, res) => {
    let originalPath = req.originalUrl.substring('/routingModule/'.length);
    if (!originalPath) {
        originalPath = 'index.js';
    }
    console.log('req.url', originalPath)
    const file = path.join(__dirname, `node_modules/@vanillarrouter/router-module/src/${originalPath}`);
    fs.exists(file, exists => {
        if (!exists) {
            res.status(404).send('Not found')
        } else {
            res.sendFile(file);
        }

    })
});


app.use('/image/*', (req, res) => {
    const originalPath = req.originalUrl.substring('images/'.length);

    console.log('req.url',originalPath)
    const file = path.join(__dirname, `client/${originalPath}`);
    fs.exists(file, exists => {
        if (!exists) {
            res.sendFile(path.join(__dirname, 'client/index.html'))
        } else {
            res.sendFile(file);
        }
        
    })

   
});




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(bodyParser.json())

module.exports = app;
