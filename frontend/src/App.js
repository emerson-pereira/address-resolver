import React from 'react';
import AddressForm from './components/AddressForm';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import './App.scss';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="app-wrapper">
      <AddressForm />
    </div>
  </ApolloProvider>
);

export default App;
