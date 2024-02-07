// components/Home.js
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../actions';

const fetchPosts = async () => {
  const response = await axios.get('https://api.example.com/posts');
  return response.data;
};

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const { data: cachedPosts, isLoading, isError } = useQuery('posts', fetchPosts, {
    staleTime: 60000, // 1 minute
    onSuccess: (data) => {
      dispatch(setPosts(data));
    },
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {cachedPosts && (
        <ul>
          {cachedPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
