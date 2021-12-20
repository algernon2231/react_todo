
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format } from 'date-fns';
import {  useNavigate } from 'react-router-dom'

const NewPost = () => {
    
    const posts = useStoreState( state => state.posts);
    const postTitle = useStoreState(state => state.postTitle) ;
    const postBody = useStoreState( state => state.postBody );
    const savePost  = useStoreActions( actions => actions.savePost);
    const setPostTitle = useStoreActions(actions => actions.setPostTitle);
    const setPostBody  = useStoreActions( actions => actions.setPostBody);
    const navigate = useNavigate();


    const handleChange = (e,editor) => {
        const data = editor.getData();
        setPostBody(data);
    }
    const handleSubmit =  async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle,datetime, body: postBody};
        savePost(newPost);
        navigate('/');
        
    }
    return (
       <main>
           <h1>New Post</h1>
           <form className="newPostForm" onSubmit= { handleSubmit}>
               <label htmlFor="postTitle">Title</label>
               <input  
               type="text" 
               id="postTitle"
               required
               value={ postTitle }
               onChange={ e => setPostTitle(e.target.value) }
            />
            <label htmlFor="postBody">Post:</label>
            {/* <textarea
                id="postBody"
                required
                value = { postBody}
                onChange={ e => setPostBody(e.target.value)}
            ></textarea> */}
              <CKEditor editor = { ClassicEditor  } data = { postBody } onChange = { handleChange } />
            <button type="submit">Submit</button>
           </form>
       </main>
    )
}

export default NewPost
