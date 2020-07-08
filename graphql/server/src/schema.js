const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Category {
    id: String!
    name: String!
  }
  type CategoryProducts {
    categories: [Category]!
    category: Category!
    products: [Product]!
  }
  type Product {
    id: String!
    description: String
    name: String!
    price: Float!
  }
  type Subject {
    id: String!
    name: String!
  }
  type Query {
    categories: [Category]!
    category(id: String!): CategoryProducts!
    subjects: [Subject]!
  }
`;

module.exports = typeDefs;
