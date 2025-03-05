const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

exports.initGraphQL = (app) => {
  const schema = buildSchema(`
    type Query {
      hello: String
      users: [User]
    }
    type User {
      id: ID
      email: String
    }
    type Mutation {
      createUser(email: String!): User
    }
  `);

  const root = {
    hello: () => 'Hello, GraphQL!',
    users: () => [{ id: '1', email: 'test@example.com' }],
    createUser: ({ email }) => ({ id: '2', email }),
  };

  app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));
};
