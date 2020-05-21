import React, { useState } from 'react';
import AuthorForm from '../components/AuthorForm';
import axios from 'axios';
import { navigate } from '@reach/router';

export default (props)  => {
    const [errors, setErrors] = useState([]);
    const createAuthor = author => {
        axios.post('http://localhost:8000/api/author', author)
            .then(res=>{
                props.setAuthors([...props.authors, res.data])
            })
            .then(res=>{
                navigate('/');
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
        <div>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <AuthorForm onSubmitProp={createAuthor} initialName=""/>
        </div>
    )
}