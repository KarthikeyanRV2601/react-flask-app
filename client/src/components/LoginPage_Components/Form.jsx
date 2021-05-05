import React, { useState } from 'react';
import ReactDOM from'react-dom';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
const Form= ()=>{

    let history = useHistory();
    const [formData, setFormData] = useState({
        user_name: "",
        password: ""
    });

    const { user_name, password } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async e => {
        e.preventDefault();
        const result = await axios.post('/login', formData)
        console.log(result.data.status)
        if(result.data.status=="success")
        {
            // window.location.href='/feeds';
            window.localStorage.setItem("username", formData.user_name);
            history.push('/feeds')
            
        }
        
        // login(user_name, password)
    }


    return(
        <div class="LeftPanel">
            <div class="Introtext">
                <h2>Connect with your friends</h2>
            </div>
            <form onSubmit={e => onSubmit(e)} class="LoginForm">
                <div class="input-field">
                  <input 
                    type="text" 
                    id="uname"
                    name="user_name"
                    onChange={e => onChange(e)}
                    required />
                  <label for="uname">username</label>
                </div>
                <div class="input-field">
                    <input 
                        type="password" 
                        id="pwd"
                        name="password" 
                        onChange={e => onChange(e)}
                        required />
                    <label for="pwd">password</label>
                </div>
                <button className="Signinbtn">Sign in</button>
            </form>
        </div>
    )
}

export default Form;

