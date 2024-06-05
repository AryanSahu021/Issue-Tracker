var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var crypto = require("crypto")   //This is for password encryption in built package in node

//Connect with Mongodb database on your local host

const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


var app = express();


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
//We are using sha512 Algorithm
var getHash = (pass, rollno) => {
    var hmac = crypto.createHmac('sha512', rollno);
    data = hmac.update(pass);
    generate_hmac = data.digest('hex');
    console.log("Encrypted password" + generate_hmac);
    return generate_hmac;
}

//SignUp Function
app.post('/signup', async (req, res)=> {
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


    //This is the function which checks whether you are connected with database or not.
    //It connect with the cliend and takes the database and collection in which u want to store your data
    try {
        // Connect the client to the server
        await client.connect();
        
        // Specify the database and collection
        const database = client.db('IIT-Gandhinagar');
        const collection = database.collection('Queries');

        // Insert the data into the collection
        const result = await collection.insertOne(data);
        console.log(`New document inserted with the following id: ${result.insertedId}`);

        // Close the connection to the database
        await client.close();
        
        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        return res.redirect('/public/success.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database or inserting data.");
    }
});


