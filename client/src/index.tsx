import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// import { BatchHttpLink } from '@apollo/link-batch-http'
// import { onError } from '@apollo/link-error'
import { SingletonHooksContainer } from 'react-singleton-hook'
import { setContext } from '@apollo/link-context'
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from '@apollo/client'
import { cache, resolvers, typeDefs } from './resolvers'

import App from 'components/App'
import * as serviceWorker from './serviceWorker'

import StylesProvider from 'providers/StylesProvider'

/*****************/
/* Apollo Client */
/*****************/

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     Object.values(graphQLErrors).forEach((error) => {
//       switch (error?.extensions?.code) {
//         case 'UNAUTHENTICATED': {
//           isLoggedInVar(false)
//           window.history.pushState(null, '', '/')
//           localStorage.removeItem('token')
//         }
//       }
//     })
//   }
//   console.log({
//     graphQLErrors,
//     networkError,
//   })
// })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  }
})

const batchHttpLink = new HttpLink({
  uri: 'http://localhost:4000/',
})

// @ts-ignore
const link = ApolloLink.from([authLink, batchHttpLink])

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})

declare global {
  interface Window {
    hasNavigatedWithin: boolean
  }
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SingletonHooksContainer />
      <StylesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StylesProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
