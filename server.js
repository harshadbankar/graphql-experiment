var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    users: [User]
  }
  type User {
    _id: ID!
    id: Int
    name: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  users: () => {
    return [{
        _id: '123-erterter-1231231-eeeueue',
        id: 1,
        name: 'test'
    },
    {
        _id: 'wwwwww-555577-22299',
        id: 2,
        name: 'demo'
    }];
  }
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(process.env.PORT || 4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');