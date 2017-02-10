var express = require('express');
var router = express.Router();
var trim = require('trim');
var validator = require('validator');
var dateFormat = require('dateformat');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var bodyParser = require('body-parser');
var stringify = require('json-stringify');
var parser = require('json-parser');
var toArray = require('json-to-array');
var async = require('async');
var naturalCompare = require('string-natural-compare');
var toUpper = require('to-upper');
var sortBy = require('sort-by');
var DateDiff = require('date-diff');
var path = require('path');
var session = require('express-session');
var passwordValidator = require('password-validator');
//var payloadChecker = require('payload-validator');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage});

var app = express();

app.use('/static', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(upload.any());



/*------------------------------CMS API Starts--------------------------------*/

/*All userLists Starts*/

router.post('/search', function (req, res) {


    var searchfeild = trim(req.body.searchfeild);

    var brands = ['Gap', 'Banana Republic', 'Boss', 'Hugo Boss', 'Taylor', 'Rebecca Taylor'];

    var clothingtypes = ['Denim', 'Pants', 'Sweaters', 'Skirts', 'Dresses'];

    for (var i = 0; i <= brands.length; i++)
    {
        if (searchfeild.indexOf(brands[i]) != -1)
        {
            var brand = brands[i];
        }
    }

    for (var j = 0; j <= clothingtypes.length; j++)
    {
        if (searchfeild.indexOf(clothingtypes[j]) != -1)
        {
            var clothingtype = clothingtypes[j];
        }
    }


    res.json({
        hasError: true,
        errorCode: 1030,
        message: 'Success',
        response: {brands: brand, clothingtype: clothingtype}
    });

});

/*All userLists Ends*/


/*------------------------------CMS API Ends--------------------------------*/

module.exports = router;

