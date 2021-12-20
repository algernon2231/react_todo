
import { useParams, Link , useNavigate} from 'react-router-dom'
import ReactHtmlParser from 'html-react-parser';
import { useStoreState, useStoreActions } from 'easy-peasy';



const PostPage = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const deletePost = useStoreActions(actions => actions.deletePost);
    const getPostById = useStoreState(state => state.getPostById);
    const post = getPostById(id);

    const handleDelete = async (id) => {
            deletePost(id);
            navigate('/');
      } 
    
    return (
       <main className='PostPage'>
           <article className='post'>
                { post &&  
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{ ReactHtmlParser(post.body)  }</p>
                        <Link to={`/edit/${ post.id }`}><button className='editButton'>Edit</button></Link>
                        <button className='deleteButton' onClick = { () => handleDelete(post.id)}>DELETE</button>
                     </>
                }
                {!post && 
                <>
                    <h2>Post Not Found</h2>
                    <p><Link to='/'>Visit Our HomePage</Link></p>
                </>
                }
           </article>
       </main>
    )
}

export default PostPage
