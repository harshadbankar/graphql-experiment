var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    users: Users
    user(id: ID!): User
  }
  type Users {
    ids: [ID]!
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    address: Address
  }
  type Address {
    id: ID!
    houseNumber: Int
    street: String
    postalCode: String
    country: String
  }
`);
const users = [
  {
    id: 'wekjkj-123123-tesdfsdfw-333',
    firstName: 'Dom',
    lastName: 'Ter',
    address: {
      id: '123-erterter-1231231-eeeueue',
      houseNumber: 12,
      street: 'angular',
      postalCode: '1111QQ',
      country: 'Netherlands'
    }
  },
  {
    id: 'itlermeer-2w2e23-6y6y6y-999',
    firstName: 'Pom',
    lastName: 'Ter',
    address: {
      id: '1111-rwrefwe-1231231-eeeueue',
      houseNumber: 201,
      street: 'apollo',
      postalCode: '2222WW',
      country: 'Netherlands'
    }
  }
  ];
// The root provides a resolver function for each API endpoint
var root = {
  users: () => { return { ids: users.map(user => user.id) }; },
  user: (args) => { console.log('id: ',args.id); return  users.find(user => user.id === args.id); }
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.get('/users',
  function(req, res) {
    res.json(users);
  });
app.listen(process.env.PORT || 4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');