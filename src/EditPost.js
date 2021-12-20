import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { format } from 'date-fns';


const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // const posts = useStoreState( state => state.posts) ;
    const editTitle = useStoreState( state => state.editTitle);
    const editBody = useStoreState( state => state.editBody) ;

    const editPost = useStoreActions( actions => actions.editPost) ;
    const setEditTitle = useStoreActions( actions => actions.setEditTitle);
    const setEditBody = useStoreActions( actions => actions.setEditBody);
    const getPostById = useStoreState( state => state.getPostById);
    const post = getPostById(id);
    
    useEffect(() => {
        if(post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditTitle,setEditBody])

    const handleChange = (e,editor) => {
        const data = editor.getData();
        setEditBody(data);
    } 

    const handleEdit = async (id) => {

        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle,datetime, body: editBody}
        editPost(updatedPost);
        navigate(`/post/${id}`)
      }
    return (
        <main>
        <h1>Edit Post</h1>
        <form className="newPostForm" onSubmit= { (e) => e.preventDefault() }>
            <label htmlFor="postTitle">Title</label>
            <input  
            type="text" 
            id="postTitle"
            required
            value={ editTitle }
            onChange={ e => setEditTitle(e.target.value) }
         />
         <label htmlFor="postBody">Post:</label>
         {/* <textarea
             id="postBody"
             required
             value = { editBody }
             onChange={ e => setEditBody(e.target.value)}
         ></textarea> */}
         <CKEditor  
         
           editor = { ClassicEditor  } 
           data = { editBody } onChange = { handleChange } 
           />
         <button type="submit" onClick={ () => handleEdit(post.id)}>Edit</button>
        </form>
    </main>
    )
}
export default EditPost
