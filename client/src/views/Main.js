import React, {useEffect, useState} from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import AuthorList from '../components/AuthorList';
export default ({authors, setAuthors}) => {
    return(
        <div>
            <h1>Favorite authors</h1>
            <Link to = {"/new"}>Add an author</Link>
            <p> We have quotes by:</p>
            <AuthorList authors = {authors} setAuthors = {setAuthors} />
        </div>
    )
}