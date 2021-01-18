import ApolloClient from "apollo-boost";
import tokenStorage from "./components/auth-context-provider/tokenStorage";
import socketIo from "socket.io-client";

export const socket = socketIo.connect(
  process.env.REACT_APP_SOCKET_URI || "/socket.io"
);

socket.on("connect", () => {
  socket.emit("auth", tokenStorage.getToken());
});

export const createApolloClient = () => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI || "/graphql",
    request: async (operation) => {
      const authToken = tokenStorage.getToken();

      if (authToken && operation.operationName !== "Login") {
        operation.setContext({
          headers: {
            authorization: `Bearer ${authToken}`,
            locale: localStorage.getItem("locale")
          }
        });
      }
    },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors) {
        const foundError = graphQLErrors.find((err) =>
          Boolean(err.extensions && err.extensions.code === "UNAUTHENTICATED")
        );

        if (foundError) {
          tokenStorage.clearToken();
          document.location.href = "/login";
        }
      }
    }
  });
  client.defaultOptions = {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all"
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all"
    }
  };

  return client;
};
