import React , { FC } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { HttpLink, ApolloLink } from "@apollo/client"
import { DefaultOptions } from "@apollo/client"
// import useNetwork from "../hooks/useNetwork"


const DefaultApolloClientOptions: DefaultOptions = {
  watchQuery: { notifyOnNetworkStatusChange: true },
  query: { errorPolicy: "all", fetchPolicy: "network-only" },
}

const ApolloClientComp: FC = ({ children }) => {
//   const network = useNetwork()

  //const uri =  "https://tequila-mantle.terra.dev/"
  const uri = "https://mantle.terra.dev/"
  const httpLink = new HttpLink({ uri })
  const namedLink = new ApolloLink((operation, forward) => {
    operation.setContext(() => ({ uri: `${uri}?${operation.operationName}` }))
    return forward ? forward(operation) : null
  })

  const client = new ApolloClient({
    link: ApolloLink.from([namedLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: DefaultApolloClientOptions,
  })

  return (
    <QueryClientProvider client={new QueryClient()}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </QueryClientProvider>
  )
}

export default ApolloClientComp
