import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql.js";
import { listInventory } from "./service/index.js";

// Resolver
const root = {
  listInventory
};

//Create an express server and GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

//Listening to our server
app.listen(5000, () => {
  console.log("GraphQL server with Express running on localhost:5000/graphql");
});