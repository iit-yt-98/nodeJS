const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper =  require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = "conFusion";

MongoClient.connect( url , (err , client) => {
    assert.equal(err , null);

    console.log("Connected Succesfully to the Mongo Server");

    const db = client.db(dbname);

    dboper.insertDocument(db , { name: "Dosa" , description:"Tasty Food!" }, 
    "dishes" , (result) => {
        console.log("Insert Document :\n ", result);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents: \n", docs);

            dboper.updateDocument(db , { name: "Dosa"} ,
            { description: "Updated this to Very Tasty Food Dude!"} , "dishes", 
            (result) => {
                console.log("Updated the Document!\n" , result);

                dboper.findDocuments(db,"dishes", (docs) => {
                    console.log("Found the Updated Documents \n", docs);

                    db.dropCollection("dishes" , (result) => {
                        console.log("Dropped the Fucking Collection: ",result);

                        client.close();
                    });
                });
            });
        });
    });    
});
