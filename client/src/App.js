import Header from './components/Header';
import Customers from './components/Customers';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

//This part is to get rid of the warning when using the ApolloCache query features of ApolloClient. 
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        customers: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache,
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
    <Header />
    <div className="container">
     <Customers />
    </div>
    </ApolloProvider>
    </>
  );
}

export default App;
