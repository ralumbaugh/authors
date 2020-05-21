import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from 'axios';

export default props =>{
    const { id, authors, setAuthors } = props;
    const [author, setAuthor] = useState()

    const onSubmitHandler = e =>{
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/author/${id}`)
            .then(res=>{
                setAuthors(authors.filter(author => author._id !== id))
            })
    }

    return(
        <div>
            <button onClick={onSubmitHandler}>Delete Author</button>
        </div>
    )
}
