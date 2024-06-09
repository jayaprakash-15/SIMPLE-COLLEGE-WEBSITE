const mongo = require("mongodb").MongoClient
let url_2 = "mongodb://localhost:27017/Info"
const assert = require("assert")
 
mongo.connect(url_2, function(err, db) {
  if (err) throw err;
 
  db.collection("Submit_Data").findOne({},  { _id: 0, Username: 1, Password: 1 } ).toArray(function(err, result) {
    if (err) throw err;
    
   
    console.log(result)
    db.close();
  });
});