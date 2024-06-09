const express = require('express');
const JSPON = require('jspon');
const app = express();
const path = require('path');
const router = express.Router();
const assert = require("assert")
const mongo = require("mongodb").MongoClient
app.use(express.urlencoded({extended:false}))
let url = "mongodb://localhost:27017/test"
let url_2 = "mongodb://localhost:27017/Info"

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
     
  });
  app.use(express.static(__dirname + '/View'));
  
  app.use(express.static(__dirname + '/Script'));
  

router.post('/submit',function(req,res,next){
let info = {
     Username:req.body.Username,
     Password:req.body.pwd,
     Firstname:req.body.FirstName,
     Lastname:req.body.LastName,
     Email:req.body.EmailID,
     MobileNumber:req.body.MobileNumber,
     Gender:req.body.Gender,
     dob_1:req.body.BirthDay,
     dob_2:req.body.BirthdayMonth,
     dob_3:req.body.BirthdayYear,
     Address:req.body.Address,
     City:req.body.City,
     Pincode:req.body.PinCode,
     State:req.body.State,
     Country:req.body.Country,
     Hobbies_1:req.body.HobbyDrawing,
     Hobbies_2:req.body.HobbySinging,
     Hobbies_3:req.body.HobbyDancing,
     Hobbies_4:req.body.HobbyCooking,
     Qualification_1:req.body.HighSchool,
     Qualification_2:req.body.HigherSchool,
     Qualification_3:req.body.Graduation,
     Qualification_4:req.body.PostGraduation,
     Courses_1:req.body.CourseBCA,
     Courese_2:req.body.CourseBCom,
     Courese_3:req.body.CourseBSc,
     Courese_4:req.body.CourseBA,
     Courese_5:req.body.CourseMCA,
     Courese_6:req.body.CourseMCom,
     Courese_7:req.body.CourseMSc,
     Courses_8:req.body.CourseMA



    }

    mongo.connect(url_2 , function(err , db){
      assert.equal(null , err)
      db.collection("Submit_Data").insertOne(info , function(){
        assert.equal(null , err)
        console.log(info)
        res.send("Succesfully Submitted")
        db.close()
      })
    })
  })

app.post('/answer' , function(req,res,next){
 let userid = req.body.name
 let pwd = req.body.pass
 
 mongo.connect(url_2, function(err, db) {
  let query = {Username : userid , Password: pwd} 
  assert.equal(null , err)
  if (err) throw err;
 
  db.collection("Submit_Data").find(query).toArray(function(err, result) {
    let i =0
    ud = result[i].Username
    pw = result[i].Password
    if(userid ==ud && pwd==pw)
    {
      res.sendFile(__dirname + "/" + "Login.html")
     }
    else{
      res.send("Not Working")
    }
       db.close();

    })
  })
})
app.get("/get-Data" , function(req,res,next){
   
  mongo.connect(url_2, function(err, db) {
    if (err) throw err;
   
    db.collection("Submit_Data").find({}).toArray(function(err, result) {
      if (err) throw err;
      
     
      console.log(result)
      
      res.json(result)
      db.close();
    })

  })
})

app.use('/', router);
app.listen(3000)