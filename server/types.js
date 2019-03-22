const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

// Define Populate Type
populateType = new GraphQLObjectType({
    name: 'Populate',
    fields: {
        total: { type: GraphQLInt },
        status: { type: GraphQLInt }
    }
});

// Define Movie Type
movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        link: { type: GraphQLString },
        id: { type: GraphQLString },
        metascore: { type: GraphQLInt },
        poster: { type: GraphQLString },
        rating: { type: GraphQLInt },
        synopsis: { type: GraphQLString },
        title: { type: GraphQLString },
        votes: { type: GraphQLInt },
        year: { type: GraphQLInt },
    }
});

// //Define Director Type
// moviesType = new GraphQLObjectType({
//     name: 'Movies',
//     fields: {
//         // id: { type: GraphQLID },
//         // name: { type: GraphQLString },
//         // age: { type: GraphQLInt },
//         movies: {
//             type: new GraphQLList(movieType),
//             resolve(source, args) {
//                 return _.filter(movies[1]);
//             }

//         }

//     }
// });

exports.populateType = populateType;
exports.movieType = movieType;
// exports.moviesType = moviesType;

