const express = require('express');
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');
const {queryType} = require('./query.js');
let bodyParser = require('body-parser');

//for mongoDB
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://chp:chp1995@cluster0-dzevi.mongodb.net/test?retryWrites=true";


//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 


//setting up the port number and express app
const port = 9292;
const app = express();
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

app.get('/hello', (req,res) => {
    // res.send("hello");
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webDenzel");
        dbo.collection("movies"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            movies = result;
            res.send(movies);
            // console.log(result);
            db.close();
        });
    });
    // res.send(movies);
   }
);
app.get('/movies/populate', (req,res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webDenzel");
        dbo.collection("movies"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            movies = result;
            // console.log(result);
            var populate ={ "total": movies.length ,"status": 200}
            res.send(populate);
            db.close();
        });
    });
    // var populate ={ "total": movies.length ,"status": 200}
    // res.send(populate);
   }
);
app.get('/movies', (req,res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webDenzel");
        dbo.collection("awesome"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            awesome = result;
            var index = randomNum(1,awesome.length)
            res.send(awesome[index-1]);
            // console.log(result);
            db.close();
        });
    });
    // var index = randomNum(1,awesome.length)
    // res.send(awesome[index-1]);
   }
);
app.get('/movies/:id', (req,res) => {
    var limit = 5
    var metascore = 0
    if (req.params.id=="search"){
        if (req.query.limit) limit=  parseInt(req.query.limit)
        if (req.query.metascore) metascore= parseInt(req.query.metascore)
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("webDenzel");
            var whereStr = {"metascore":{$gt: metascore}}; 
            dbo.collection("movies"). find(whereStr).limit(limit).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                // console.log(result0);
                // console.log(typeof result0)
                res.send(result);
                db.close();
            });
          });    
    }else{
        var result = {}
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("webDenzel");
            dbo.collection("movies"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                movies = result;
                // console.log(result);
                db.close();
            });
        });
        for (a of movies){
            if (a.id == req.params.id){
                result=a;
            }
        }
        res.send(result);
    }
    // res.send(result);
   }
);
app.post('/movies/:id', (req,res) => {
    console.log(req.body.date)
    console.log(req.body.review)
    console.log(req.params.id)
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webDenzel");
        var myobj = { "id":req.params.id,"date" : req.body.date,"review":req.body.review};
        dbo.collection("review").insertOne(myobj, function(err, result) {
            if (err) throw err;
            // console.log(result);
            var ops ={ "_id": result.ops[0]._id ,"status": 200}
            res.send(ops);
            db.close();
        });
    });
});


// Define the Schema
const schema = new GraphQLSchema({ query: queryType });

//Setup the nodejs GraphQL server
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));


app.listen(port);
console.log(`Server Running at localhost:${port}`);