# Follow these steps for the backend:

1.Install Node.js if you have not installed yet - Follow official website instructions

2. Initilise the npm
   npm init
   (It will ask for author, name , etc)

2.Install modules like Express and Mongodb 
   npm install express --save
   npm install Mongodb --save

3. Create a server.js file in you project folder

# Working with server.js:

1. get all the necessary modules in server.js
var express =require("express")    

here var is used to define variables
require is used to get the specific modules

2.Initilise the express and Mongodb

3. Use app.get to access the html pages

4. function(req,res)  req : to request something      res: to response something

5. In order to work with password we are using crypto to hash our password
   in our case we are hashing with roll no, u can hash with any object you want

6. Now coming to signup page we can simply use var and req different objects that we have used in our Login /signup form

7. We can store the login details in our Mongodb Database by simply making a collection.






  