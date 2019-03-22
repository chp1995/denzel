// 导入远程mongodb Atlas
//mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-dzevi.mongodb.net:27017,cluster0-shard-00-01-dzevi.mongodb.net:27017,cluster0-shard-00-02-dzevi.mongodb.net:27017 --ssl --username chp --password chp1995 --authenticationDatabase admin --db webDenzel --collection movies --file /Users/cuihaipeng/git_repository/denzel/movies.json

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
const url = "mongodb+srv://chp:chp1995@cluster0-dzevi.mongodb.net/test?retryWrites=true";
var movies
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webDenzel");
    dbo.collection("movies"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        movies = result
        console.log(movies);
        db.close();
    });
});

// console.log(global.movies);

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://chp:chp1995@cluster0-dzevi.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("webDenzel").collection("movies");
//   // perform actions on the collection object
//   console.log(collection);
//   client.close();
// });