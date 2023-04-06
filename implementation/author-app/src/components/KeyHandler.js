import React, {useState} from 'react';
import { Grid, TextField } from '@mui/material';


export default function KeyHandler(props){
    const [publicKey,setPublicKey] = useState();
    const [privateKey,setPrivateKey] = useState();

    var fileReader;

    function readPublicKey(key){
        setPublicKey(key);
        console.log("filename: " + key.name)
        fileReader = new FileReader();
        fileReader.onloadend = () => {
            props.setPublicKeyContent(fileReader.result);
            console.log("CONTENT: "+ fileReader.result);
        }
        fileReader.readAsText(key);
    }
    function readPrivateKey(key){
        setPrivateKey(key);
        console.log("filename: " + key.name)
        fileReader = new FileReader();
        fileReader.onloadend = () => {
            props.setPrivateKeyContent(fileReader.result);
            console.log("CONTENT: "+ fileReader.result);
        }
        fileReader.readAsText(key);
    }

    return(
        <div>
            <h3>RSA-2048 Keys  -  PKCS1  -  PEM</h3>
            <Grid id='Keys' direction='row' container spacing={0}  justifyContent="center">
                <Grid container item sm={4} alignItems="center" justifyContent="center">
                    <TextField
                        type="file"
                        onChange={(e) => readPublicKey(e.target.files[0])}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Public Key"
                    />
                    <br/>
                    <a>Will be stored in the Blockchain</a>
                </Grid>
                
                <Grid container item sm={4} justifyContent="center">
                    <TextField
                        type="file"
                        onChange={async(e) => await readPrivateKey(e.target.files[0])}
                        focused
                        label="Private Key"                   
                    />
                    <br/>
                    <a>Only used for signing messages, wont be uploaded</a>
                    
                </Grid>
            </Grid>
        </div>
        
    )
}