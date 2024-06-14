// src/frontend/ApolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql", // Adjust the URI if your GraphQL server is hosted differently
	cache: new InMemoryCache(),
});

export default client;
