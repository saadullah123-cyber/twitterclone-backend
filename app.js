const mysql= require('mysql');
// var http = require('http').Server(app);
const express= require('express');
var app = express();
const bodyparser = require('body-parser');

const cors = require('cors');

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// app.use(cors(corsOptions));


app.use(bodyparser.json());
app.use(cors());


var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'mydb'

});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     /*Create a table named "customers":*/
//     var sql = "CREATE TABLE tweets (id INT AUTO_INCREMENT PRIMARY KEY, tweet VARCHAR(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });


// con.connect((err)=>{
//     if(!err) 
//     console.log('db connection is on');
//     else
//     console.log('db connection failed \n Error :' + JSON.stringify(err, undefined,2));
//     var sql = "CREATE TABLE tweets (tweet VARCHAR(255))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("table created");
//       }); 
// });
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "INSERT INTO tweets (tweet) VALUES ('Muhammad Saad')";
    // con.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record inserted");
    // });
  });



app.get('/tweets',(req,res)=> {
    con.query('SELECT * FROM tweets', (err,results)=>{
        if(err)
            console.log(err);
        else {
            
            res.header("Access-Control-Allow-Origin", "*");
            res.json({results});
        }
    });
});

app.post('/tweet',(req,res)=> {
    try {
        tweet = req.body.message;
        res.header("Access-Control-Allow-Origin", "*");
        var sql = `INSERT INTO tweets (tweet) VALUES ('${tweet}')`;  
        con.query(sql, function (err, result) {  
            if (err) throw err;  
                console.log("1 record inserted");  
            });  
        }   
    catch(error){
        console.log(error);
    }
    
    // con.query('SELECT * FROM tweets', (err,results)=>{
    //     if(err)
    //     console.log(err);
    //     else {
            
    //         res.header("Access-Control-Allow-Origin", "*");
    //         res.json({results});
    //     }
    // });
});

app.listen(3000, ()=> console.log('server running at port 3000'));