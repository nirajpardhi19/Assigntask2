// __tests__/api.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from '../store';
import Home from '../components/Home';

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('API Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    store.dispatch({ type: 'SET_POSTS', payload: [] });
  });

  it('fetches and renders posts correctly', async () => {
    const mockedPosts = [
      { id: 1, title: 'Test Post 1' },
      { id: 2, title: 'Test Post 2' }
    ];

    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, mockedPosts);

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Home />
        </Provider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Test Post 1')).toBeInTheDocument();
      expect(getByText('Test Post 2')).toBeInTheDocument();
    });
  });
});
