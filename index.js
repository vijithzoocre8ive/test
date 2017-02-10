var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorhandler = require('errorhandler');
var http = require('http');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');

//var upload = multer({dest: './uploads/'});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'
                && ext !== '.mp4' && ext !== '.webm' && ext !== '.mkv' && ext !== '.flv'
                && ext !== '.vob' && ext !== '.avi' && ext !== '.wmv' && ext !== '.wma'
                && ext !== '.rm' && ext !== '.rmvb' && ext !== '.mpg' && ext !== '.mpeg'
                && ext !== '.mp3' && ext !== '.wma' && ext !== '.aac' && ext !== '.wav'
                && ext !== '.m4a' && ext !== '.m4v') {
            return callback(new Error('Invalid File Format'))
        }
        callback(null, true)
    }});
var app = express();
app.use('/static', express.static('uploads'));
app.use('/public', express.static('views/admin'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(upload.any());


/*API Routes Starts*/

var users = require('./routes/api.js');
app.use('/api', users, function (err, req, res, next) {

    res.json({
        hasError: true,
        errorCode: 500,
        message: err.message
    });

});
/*API Routes Ends*/

/*CMS Routes Starts*/

app.get('/dashboard', function (req, res) {

    res.sendFile(__dirname + "/views/admin/" + "index.html");

});

/*CMS Routes Ends*/

app.listen(8090);
