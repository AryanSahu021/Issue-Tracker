var express = require("express");
var mongodb = require("mongodb");
var path = require("path");
var bodyParser = require("body-parser");
var crypto = require("crypto")   //This is for password encryption in built package in node

var app = express();
//var db="mongodb://localhost:27017/database_name";

app.get('/', function (req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    return res.redirect('/public/signup.html');

}).listen(4000);


console.log("Server is listening at 4000")
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//Password hashing it will hash the password with the Roll No 
//We are using sha256 Algorithm
var getHash = (pass, rollno) => {
    var hmac = crypto.createHmac('sha512', rollno);
    data = hmac.update(pass);
    generate_hmac = data.digest('hex');
    console.log("Encrypted password" + generate_hmac);
    return generate_hmac;
}

//SignUp Function
app.post('/signup', function (req, res) {
    var name = req.body.fullName;
    var email = req.body.email
    var branch = req.body.queryType;
    var rollno = req.body.rollno;
    var pass = req.body.password;

    //Password after hashing
    var password = getHash(pass, rollno);

    var data = {
        "Name": name,
        "Email": email,
        "Branch": branch,
        "Password": password,
        "Rollno": rollno
    }
    console.log(name);
    console.log(branch);
    console.log(email);
    console.log(rollno);
    console.log(pass);
    console.log(password);

    console.log("DATA is " + JSON.stringify(data));
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    return res.redirect('/public/success.html');


});

