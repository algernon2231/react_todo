import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
    return (
       <main className="Missing">
           <h2>Page Not Found</h2>
           <img style={{ width:'100%'}} src="https://www.seekahost.com/wp-content/uploads/2017/11/404-page-not-found.jpg" alt="page_not_found" />
           <Link to='/'>Back to homepage</Link>
       </main>
    )
}

export default Missing
