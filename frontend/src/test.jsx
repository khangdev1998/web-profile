// Cấu trúc thư mục
// /src
//   /components
//     /BlogList.jsx
//     /BlogDetail.jsx
//     /Dashboard.jsx
//   /services
//     /api.js
//   App.jsx
//   main.jsx

// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/posts?filters[slug]=${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// components/BlogList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading posts:', error);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <Link 
          key={post.id} 
          to={`/post/${post.attributes.slug}`}
          className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{post.attributes.title}</h2>
            <p className="text-gray-600">{post.attributes.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;

// components/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug } from '../services/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading post:', error);
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.attributes.title}</h1>
      <div className="prose prose-lg">
        {post.attributes.content}
      </div>
    </article>
  );
};

export default BlogDetail;

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-7">
                <Link to="/" className="flex items-center py-4 px-2">
                  Home
                </Link>
                <Link to="/dashboard" className="flex items-center py-4 px-2">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/post/:slug" element={<BlogDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;