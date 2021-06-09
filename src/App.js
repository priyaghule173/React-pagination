import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import './App.css';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(()=>{
    const fetchPosts = async() =>{
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);

    }
    fetchPosts();
  },[]);

  //Get Current Posts
  const indextofLastPost = currentPage * postsPerPage;
  const indextofFirstPost = indextofLastPost - postsPerPage;
  const currentPosts = posts.slice(indextofFirstPost, indextofLastPost);

  //change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  console.log(posts);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}></Pagination>
    </div>
  );
};

export default App;
