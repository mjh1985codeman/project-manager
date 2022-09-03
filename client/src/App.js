import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import Project from './pages/Project';
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
    <Router>
    <Header />
    <div className="container">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/projects/:id' element={<Project/>}/>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
    </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
