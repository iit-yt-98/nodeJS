const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper =  require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = "conFusion";

MongoClient.connect(url)
.then((client) => {
    console.log("Connected Succesfully to the Mongo Server");
    const db = client.db(dbname);

    return dboper.insertDocument(db , { name: "Dosa" , description:"Tasty Food!" }, 
    "dishes" ).then((result) => {
        console.log("Insert Document :\n ", result);

        return dboper.findDocuments(db, "dishes");
    })
    .then((docs) => {
        console.log("Found Documents: \n", docs);

        return dboper.updateDocument(db , { name: "Dosa"} ,
        { description: "Updated this to Very Tasty Food Dude!"} , "dishes");
    }) 
    .then((result) => {
        console.log("Updated the Document!\n" , result);

        return dboper.findDocuments(db,"dishes");
    })
    .then((docs) => {
        console.log("Found the Updated Documents \n", docs);

        return db.dropCollection("dishes");
    })
    .then( (result) => {
        console.log("Dropped the Fucking Collection: ",result);

        client.close();
    }).catch((err) => {
        console.log(err);
    } ) 
}).catch( (err) => {
    console.log(err);
})
