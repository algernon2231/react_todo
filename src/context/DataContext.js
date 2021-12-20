import {  createContext, useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import api from '../api/posts'
import useAxiosFetch from '../hooks/useAxiosFetch'

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [search, setSearch] = useState('');
    const [posts, setPosts ] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { data,fetchError,isLoading } = useAxiosFetch('http://localhost:3500/posts');
   
   useEffect( () => {
      setPosts(data);
   }, [ data ])

  useEffect(() => {
    const filteredResults = posts.filter(post => post.body.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase())) ;
    setSearchResults(filteredResults.reverse()) ;
  },[posts,search]) ;

  const handleDelete = async (id) => {
    try {
        await api.delete(`/posts/${id}`)
        setPosts(posts.filter(post => post.id !== id));
        navigate('/');
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
  } 

  const handleSubmit = async  (e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const newPost = { id, title: postTitle,datetime, body: postBody}
      try {
          const res = await api.post('/posts', newPost);
          const allPosts =[...posts,res.data];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/')
      }catch(err){
          console.log(`Err: {err.message}`)
      }
  }

  const handleEdit = async (id) => {

    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle,datetime, body: editBody}
    try {
        const res =  await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id=== id ? {...res.data} : post));
        setEditTitle('');
        setEditBody('');
        navigate('/') 
    }catch(err){
      console.log(`Error: ${ err.message}`);
    }
  }

    return(
        <DataContext.Provider value = {{ 
            
            search,
            setSearch,
            searchResults,
            setSearchResults,
            isLoading,
            fetchError,
            handleSubmit,
            postTitle,
            setPostTitle,
             postBody,
            setPostBody,
            handleDelete,
             handleEdit,
            editTitle,
            setEditTitle,
            editBody,
            setEditBody
        }}
        >
                { children }
        </DataContext.Provider>
    )
}

export default DataContext; 