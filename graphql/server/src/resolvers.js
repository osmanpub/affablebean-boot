const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

module.exports = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(date) {
      return new Date(date); // value from the client
    },
    serialize(date) {
      return date.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    categories: (_, __, { dataSources }) =>
      dataSources.categoryAPI.getAllCategories(),
    category: (_, { id }, { dataSources }) =>
      dataSources.categoryAPI.getCategoryProducts(id),
    subjects: (_, __, { dataSources }) =>
      dataSources.subjectAPI.getAllSubjects(),
  },
};
