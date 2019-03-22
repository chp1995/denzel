const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const _ = require('lodash');

const {movieType} = require('./types.js');
// const {moviesType} = require('./types.js');
const {populateType} = require('./types.js');
let {movies} = require('./data.js');
let {awesome} = require('./data.js');

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


//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: function () {
                return "Hello World";
            }
        },
        populate: {
            type: populateType,
            resolve: function () {
                
                return {total:movies.length,status:200};
            }
        },
        movies: {
            type: movieType,
            resolve: function (source, args) {
                return awesome[randomNum(0,2)];
            }
        },
        movie: {
            type: movieType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: function (source, args) {
                return _.find(movies, { id: args.id });
            }
        },
        search: {
            // type: [movieType],
            type: new GraphQLList(movieType),
            args: {
                limit: { type: GraphQLInt },
                metascore:{ type: GraphQLInt }
            },
            resolve: function (source, args) {
                var limit0=5;
                var metascore0=0;
                if (args.limit)limit0=args.limit;
                if (args.metascore)metascore0=args.metascore;     
                // console.log(limit0);
                var movie1 =new Array();
                var i = 0;
                for (m of movies){
                    if (m.metascore>=metascore0 && i<5){
                        movie1.push(m);
                        console.log("________");
                        console.log(m.metascore);
                        console.log(metascore0);
                        console.log(i);
                        i=i+1;
                    }
                }
                return movie1;
            }
        },
        
    }
});

exports.queryType = queryType;