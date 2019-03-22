/* eslint-disable no-console, no-process-exit */
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

var fs = require('fs'),
path = require('path');

async function sandbox (actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= 77);

    

    // console.log(`🍿 ${movies.length} movies found.`);
    // console.log(JSON.stringify(movies, null, 2));
    // console.log(`🥇 ${awesome.length} awesome movies found.`);
    // console.log(JSON.stringify(awesome, null, 2));
    // console.log(movies);
    for (value of awesome)console.log(value);
    // connectMongo()


    // writeile(movies)

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function connectMongo(){
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://chp:chp1995@cluster0-dzevi.mongodb.net/test?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("webDenzel").collection("movies");
    // perform actions on the collection object
    console.log(collection);
    client.close();
  });
}

function writeile(w_data){
  // var w_data = new Buffer(w_data);
  fs.writeFile(__dirname + '/awesome.json', w_data, {flag: 'a'}, function (err) {
    if(err) {
     console.error(err);
     } else {
        console.log('写入成功');
     }
 });
}

sandbox(DENZEL_IMDB_ID);
