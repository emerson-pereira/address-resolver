const { ApolloServer, gql } = require('apollo-server');
const resolveAddress = require('./services/resolve-address');

const typeDefs = gql`
  type Address {
    cep: String
    logradouro: String
    complemento: String
    bairro: String
    localidade: String
    uf: String
    unidade: String
    ibge: String
    gia: String
  }

  type Query {
    address(zip: String): Address
  }
`;

const resolvers = {
  Query: {
    address: (_, { zip }) => resolveAddress(zip),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
