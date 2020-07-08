const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const CategoryAPI = require("./datasources/category");
const ContactAPI = require("./datasources/contact");
const SubjectAPI = require("./datasources/subject");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    categoryAPI: new CategoryAPI(),
    contactAPI: new ContactAPI(),
    subjectAPI: new SubjectAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
