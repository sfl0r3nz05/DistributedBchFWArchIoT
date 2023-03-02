import React, {useState} from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';


export default function RegisterAuthorForm(){
    const [publicKey,setPublicKey] = useState();
    const [privateKey,setPrivateKey] = useState();
    const [message,setMessage] = useState();
    const [hashMessage,setHashMessage] = useState();
    const [privateMessage,setPrivateMessage] = useState();
    var fileReader;
    const [privateKeyContent,setPrivateKeyContent] = useState();
    const [publicKeyContent,setPublicKeyContent] = useState();

    function readPublicKey(key){
        setPublicKey(key);
        console.log("filename: " + key.name)
        fileReader = new FileReader();
        fileReader.onloadend = () => {
            setPublicKeyContent(fileReader.result);
            console.log("CONTENT: "+ fileReader.result);
        }
        fileReader.readAsText(key);
    }
    function readPrivateKey(key){
        setPrivateKey(key);
        console.log("filename: " + key.name)
        fileReader = new FileReader();
        fileReader.onloadend = () => {
            setPrivateKeyContent(fileReader.result);
            console.log("CONTENT: "+ fileReader.result);
        }
        fileReader.readAsText(key);
    }

    function processMessage(theMessage){
        setMessage(theMessage);
        var hash = CryptoJS.SHA384(message);
        console.log(hash.toString())
        setHashMessage(hash.toString());
        var sign = new JSEncrypt();
        sign.setPrivateKey(privateKeyContent);
        var signedMessage = sign.sign(hash.toString(), CryptoJS.SHA384,"sha384");
        console.log("signed: " + signedMessage);
        setPrivateMessage(signedMessage);
    }

    function handleSubmit(event){
        event.preventDefault();
        const url = 'http://172.18.0.3:3000/register';
        const json = {
            publicKey : publicKeyContent,
            message : message,
            signedMessage : privateMessage
        }
        console.log(json);
        axios.post(url, json, {withCredentials : false}).then((res) =>{
            console.log(res.data)
        })
    }


    return (
        <form id='AuthorRegisterForm' onSubmit={handleSubmit}>
            <h2>Register Author</h2>
            <div id='Keys'>
                <h3>RSA-2048 Keys  -  PKCS1  -  PEM</h3>
                <div>
                    <label>PublicKey</label>
                    <br/>
                    <input type="file"
                    onChange={(e) => readPublicKey(e.target.files[0])}></input>
                </div>
                <div>
                    <label>PrivateKey</label>
                    <br/>
                    <input type="file"
                    onChange={async(e) => await readPrivateKey(e.target.files[0])}></input>
                    <br/>
                    <a>Only used for signing messages, wont be uploaded</a>
                    <br/>
                    <a >{privateKeyContent}</a>
                </div>
            </div>
            <div id='Message'>
                <h3>Message</h3>
                <label>Text Input</label>
                <br/>
                <input type="text" value = {message} 
                onChange={(e) => processMessage(e.target.value)}></input>   
                <br/>
                <a>The message will be signed for registering to the Blockchain Application</a>
            </div>
            <div>
                <br/>
                <label>Original Message</label><br/>
                <a>{message}</a>
                <br/>
                <label>Hashed Message</label><br/>
                <a>{hashMessage}</a>
                <br/>
                <label>Private Message</label><br/>
                <a>{privateMessage}</a>
            </div>
            <button type='submit'>Register Author</button>

        </form>
    )
}