import Header from './components/Header';
import Customers from './components/Customers';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache(),
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
