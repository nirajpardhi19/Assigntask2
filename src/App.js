// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Routes> 
            <Route path="/" element={<Home />} /> 
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
