import React, {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function RegisterAuthorForm(props){
    
    const [message,setMessage] = useState("");
    const [privateMessage,setPrivateMessage] = useState("");

    function signMessage(){
        const url = 'http://127.0.0.1:3000/sign';
        const json = {
            privateKey : props.privateKeyContent.toString(),
            message : message.toString(),
        }
        console.log(json);
        axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) =>{
            console.log(res.data)
            setPrivateMessage(res.data);
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        const url = 'http://127.0.0.1:3000/register/author';
        const json = {
            publicKey : props.publicKeyContent.toString(),
            message : message.toString(),
            signedMessage : privateMessage.toString()
        }
        console.log(json);
        axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) =>{
            console.log(res.data)
        })
    }


    return (
        <form id='AuthorRegisterForm' onSubmit={handleSubmit}>
            <h2>Register Author</h2>
            
            <div id='Message'>
                <h3>Message</h3>
                <TextField
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Message"
                    />
                <br/>
                <a>The message will be signed for registering to the Blockchain Application</a>
            </div>
            <div>
                <label>Private Message</label><br/>
                <a>{privateMessage}</a>
                <br/>
            </div>
            <Button type='button' variant='contained' color = "primary" onClick={() => signMessage()}>Sign Message</Button>
            <Button type='submit' variant='contained' color = "primary">Register Author</Button>

        </form>
    )
}