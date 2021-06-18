import React , { FC } from "react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

// import useNetwork from "../hooks/useNetwork"

const ApolloClientComp: FC = ({ children }) => {
//   const network = useNetwork()

  //const uri =  "https://tequila-mantle.terra.dev/"
  const mantleUri = "https://mantle.terra.dev/"

  const client = new ApolloClient({
    uri: mantleUri,
    cache: new InMemoryCache()
  })

  return (
      <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}

export default ApolloClientComp
