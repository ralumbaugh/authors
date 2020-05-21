import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default props =>{
    const { initialName, onSubmitProp } = props;
    const [name, setName] = useState(initialName);

    const onSubmitHandler = e =>{
        e.preventDefault();
        onSubmitProp({name});
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Name: </label>
                <input type = "text" name="name" value={name} onChange = {(e) => {setName(e.target.value) }} />
            </p>
            <input type="submit" />
        </form>
    )
}