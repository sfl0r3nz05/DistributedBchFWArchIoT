import {React,useState} from 'react';
import { Grid, TextField } from '@mui/material';


export default function DeviceIDComponent(props){
    const [publicKey,setPublicKey] = useState();

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
        props.setHasID(true);
    }

    return(
        <div>
            <h3>DeviceID</h3>
            <Grid id='Keys' direction='row' container spacing={1}  justifyContent="center">
                <Grid container item sm={4} alignItems="center" justifyContent="center">
                    <TextField
                        type="file"
                        onChange={(e) => readPublicKey(e.target.files[0])}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Public Key"
                        fullWidth
                    />
                </Grid>
                
                <Grid container item sm={4} justifyContent="center" alignItems="center">
                    <TextField
                        fullWidth
                        type="text"
                        onChange={async(e) => await props.setClassID(e.target.value)}
                        focused
                        label="Class ID"      
                        defaultValue={"Class_1"}             
                    />
                    
                </Grid>
            </Grid>
        </div>
    )
}