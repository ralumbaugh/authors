import React, {useEffect, useState } from 'react';
import AuthorForm from '../components/AuthorForm';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
export default props => {
    const [author, setAuthor] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/author/${props.id}`)
            .then(res=>{
                setAuthor(res.data)
                setLoaded(true)
            })
    },[])

    const editAuthor = author =>{
        axios.put(`http://localhost:8000/api/author/${props.id}`, author)
            .then(res=>{
                axios.get('http://localhost:8000/api/authors')
                    .then(res=>{
                        props.setAuthors(res.data)
                    })
                    .then(res =>{
                        navigate('/')
                    })
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return(
        <>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            {loaded && <AuthorForm initialName = {author.name} onSubmitProp = {editAuthor} />}
            <Link to = {"/"}>Return</Link>
        </>
    )
}