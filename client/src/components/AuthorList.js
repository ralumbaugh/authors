import React from 'react';
import { Link, navigate } from '@reach/router';
import DeleteButton from './DeleteButton'
export default ({authors, setAuthors}) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, idx) =>{
                        return (
                            <tr key={idx}>
                                <td><Link to = {`/${author._id}`}>{author.name}</Link></td>
                                <td><Link to = {`/${author._id}/edit`}>Edit</Link> | <DeleteButton id = {author._id} authors = {authors} setAuthors = {setAuthors}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}