import React, { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import Missing from './Missing'
import Header from './Header'
import About from './About'
import { Routes, Route } from 'react-router-dom'
import EditPost from './EditPost'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useStoreActions } from 'easy-peasy'


const App = () => {
  const setPosts = useStoreActions(actions => actions.setPosts);
  const { data,fetchError,isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect( () => {
    setPosts(data)
  },[data, setPosts])
  return (
    <div className='App'>
          <Header title ='React JS Blog'  />
            
              <Nav />
              <Routes>
                <Route exact path="/" element={<Home isLoading = { isLoading } fetchError = { fetchError } />} />
                <Route path="/post" element={<NewPost />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/edit/:id" element={< EditPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/*" element={<Missing />} />
              </Routes>
          
              <Footer />
    </div>
  )
}

export default App
