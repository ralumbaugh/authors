import React, {useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
export default props => {
    const {id} = props;
    const [author, setAuthor] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [authorQuotes, setAuthorQuotes] = useState([]);
    const [newQuote, setNewQuote] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/author/${id}`)
            .then(res =>{
                setAuthor(res.data);
                setAuthorQuotes(res.data.quotes)
                setLoaded(true);
            })
    },[])

    const quoteHandler = e =>{
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/quote/${id}`, { 'quote': newQuote })
            .then( res=>{
                axios.get(`http://localhost:8000/api/author/${id}`)
                    .then(res=>{
                        setAuthorQuotes(res.data.quotes)
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

    const deleteQuoteHandler = quoteid => {
        axios.patch(`http://localhost:8000/api/author/${id}/${quoteid}`)
            .then(setAuthorQuotes(authorQuotes.filter(quote => quote._id !== quoteid)))
            .catch(err=> response.json(err))
    }

    return(
        <div>
            {loaded && <h1>Author: {author.name}</h1>}
            {loaded && <h3>Quotes from {author.name}:</h3>}
            { authorQuotes.map((quote, i)=>
            <div key = {i}>
                <p>{quote.quote}</p>
                <button onClick={() =>{
                    let quoteid = quote._id
                    deleteQuoteHandler(quoteid);
                }}>Delete Quote</button>
            </div>)}
            <form onSubmit={quoteHandler}>
                <label>Submit a quote:</label>
                {loaded && errors.map((err, index) => <p key={index}>{err}</p>)}
                <input type="text" value = {newQuote} name="quote" onChange = {(e) => {setNewQuote(e.target.value) }} />
                <button>Submit</button>
            </form>
            {loaded && <Link to = {'/'}>Return</Link>}
        </div>
    )
}