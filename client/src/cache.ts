import { InMemoryCache, Reference } from '@apollo/client'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar()
        },
      },
    },
  },
})

export const isLoggedInVar = cache.makeVar<boolean>(
  !!localStorage.getItem('token')
)
