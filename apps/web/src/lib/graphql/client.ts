import { GraphQLClient } from "graphql-request";
const endpoint = "http://localhost:4000/graphql";

const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
});

export default gqlClient;
