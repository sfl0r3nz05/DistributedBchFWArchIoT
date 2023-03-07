import {React, useState} from 'react';
import { Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function VersionComponent(props){
    

    function retrieveVersion(){
        const url = 'http://127.0.0.1:3002/retrieve/version';
        var json = {
            publicKey : props.publicKeyContent,
            classID : props.classID
        }
        console.log(json);
        axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) =>{
            console.log(res.data);
            props.setObtainedVersion(res.data);
            document.getElementById("obtainedVersion").value = res.data
        })
    }

    return (
        <div>
            <div>
            <h3>Version</h3>
            <Grid id='Keys' direction='row' container spacing={1}  justifyContent="center">
                <Grid container item sm={4} alignItems="center" justifyContent="center">
                    <TextField
                        fullWidth
                        type="text"
                        onChange={(e) => props.setCurrentVersion(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Current Version"
                        defaultValue={"V_1"}
                    />
                </Grid>
                
                <Grid container item sm={4} justifyContent="center" alignItems="center">
                <TextField
                        type="text"
                        id="obtainedVersion"
                        fullWidth
                        color="primary"
                        variant='outlined'
                        focused
                        label="Obtained Version"
                        InputProps={{
                            readOnly: true,
                          }}
                          defaultValue = "V_0"
                    />
                    
                </Grid>
            </Grid>
            <br/>
            <Button variant='contained' onClick={()=> retrieveVersion()}>Retrieve Version</Button>
        </div>
        </div>
    )
}