import React, {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import stringify from 'json-stringify-deterministic';


export default function UpdateComponent(props){
    const [retrieved, setRetrieved] = useState(false);
    const [versionID, setVersionID] = useState("V_1");
    const [MonotonicSequenceNumber, setMonotonicSequenceNumber] = useState(Date.now());
    const [classID, setClassID] = useState("Class_1");
    const [vendorID, setVendorID] = useState("Vendor_1");
    const [payloadFormat, setPayloadFormat] = useState("bin base64");
    const [payloadProcessing, setPayloadProcessing] = useState("bin base64");
    const [storageLocation, setStorageLocation] = useState("./updates");
    const [payloadIndicator, setPayloadIndicator] = useState("");
    const [payloadDigest, setPayloadDigest] = useState("");
    const [manifestDigest, setManifestDigest] = useState("");
    const [size, setSize] = useState("");
    const [aditionalInstructions, setAditionalInstructions] = useState("");
    const [dependencies, setDependencies] = useState("");
    const [encryptionWrapper, setEncryptionWrapper] = useState("");
    const [manifestPayload, setManifestPayload] = useState("");
    const [payload, setPayload] = useState();
    const [payloadString, setPayloadString] = useState("");
    const [authorSign, setAuthorSign] = useState("");
    const [authorManifestSign, setAuthorManifestSign] = useState("");

    const [manifest, setManifest] = useState("");

    const [result, setResult] = useState("");
    

    const createManifest = () => {
        setManifest ({
            versionID : versionID,
            monotonicSequenceNumber : MonotonicSequenceNumber,
            classID: classID,
            vendorID : vendorID,
            payloadFormat : payloadFormat,
            payloadProcessing : payloadProcessing,
            storageLocation : storageLocation,
            payloadIndicator: payloadIndicator,
            payloadDigest : payloadDigest,
            manifestDigest : manifestDigest,
            size : size,
            aditionalInstructions : aditionalInstructions,
            dependencies : dependencies.split(','),
            encryptionWrapper : encryptionWrapper,
            payload : manifestPayload,
        })
    }

    

    function retrieveUpdate(){
        retrieveManifest();
        retrievePayload();
    }

    function retrieveManifest(){
        const url = 'http://127.0.0.1:3002/retrieve/update';
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
            //setRetrieved(true);
            //setUpdate(res.data);
            setManifest(res.data.manifest);
            setAuthorManifestSign(res.data.authorManifestSign);
            setAuthorSign(res.data.authorSign);
        })
    }

    function retrievePayload(){
        const url = 'http://127.0.0.1:3002/retrieve/payload';
        var json = {
            publicKey : props.publicKeyContent,
            classID : props.classID
        }
        console.log(json);
        axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            },
            responseType: 'blob'
        }).then((res) =>{
            console.log(res.data);
            setRetrieved(true);
            setPayload(res.data);
            // create file link in browser's memory
            const href = URL.createObjectURL(res.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
            
        })
    }

    function verifyUpdate(){
        const url = 'http://127.0.0.1:3003/verify';
        var formData = new FormData();
        formData.append('payload',payload);
        var update = {
            manifest: manifest,
            authorSign: authorSign,
            authorManifestSign : authorManifestSign
        }
        var deviceID = {
            publicKey : props.publicKeyContent,
            classID : props.classID
        }
        formData.append('update',stringify(update));
        formData.append('deviceID',stringify(deviceID));
        console.log(formData);
        var response = axios.post(url, formData, {
            withCredentials : false,
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }).then((res) =>{
            console.log(res.data);
            document.getElementById('result').textContent = res.data;
           
        });
        
        if (!document.getElementById('result').textContent || document.getElementById('result').textContent !== ""){
            document.getElementById('result').textContent = "Could not verify. Check console for details.";
        }
            
        
    }


    return(
        <div>
            <h2>Update</h2>
            <Button variant='contained' onClick={()=> retrieveUpdate()}>Retrieve Update</Button>
            <br/><br/><br/>
            {retrieved &&
            <Grid id='Keys' direction='column' container spacing={3}  justifyContent="center">
                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setVersionID(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="versionID"
                        value={manifest.versionID}
                        
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setClassID(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="classID"
                        value={manifest.classID}
                       
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        variant='outlined'
                        focused
                        label="vendorID"
                        value={manifest.vendorID}
                        onChange={(e) => {setVendorID(e.target.value); createManifest();}}
                        
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setMonotonicSequenceNumber(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="MonotonicSequenceNumber"
                        value={manifest.MonotonicSequenceNumber}
                       
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setPayloadFormat(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadFormat"
                        value={manifest.payloadFormat}
                        
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setPayloadProcessing(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadProcessing"
                        value={manifest.payloadProcessing}
                       
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setStorageLocation(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="StorageLocation"
                        value={manifest.storageLocation}
                        
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setPayloadIndicator(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadIndicator"
                        value={manifest.payloadIndicator}
                        
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setSize(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Size"
                        value={manifest.size}
                       
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setAditionalInstructions(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="AditionalInstructions"
                        value={manifest.aditionalInstructions}
                       
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setDependencies(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Dependencies"
                        value={manifest.dependencies}
                        
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setEncryptionWrapper(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="EncryptionWrapper"
                        value={manifest.encryptionWrapper}
                        
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setManifestPayload(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="ManifestPayload"
                        value={manifest.payload}
                        
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setPayloadDigest(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadDigest"
                        id = "payloadDigestField"
                        value={manifest.payloadDigest}
                       
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => {setManifestDigest(e.target.value); createManifest();}}
                        color="primary"
                        variant='outlined'
                        focused
                        label="ManifestDigest"
                        id = "manifestDigestField"
                        value={manifest.manifestDigest}
                        
                    />
                    </Grid>
                </Grid>

                
            </Grid>}
            <br/>
            <h3 id = "result"></h3>
            <br/>
            {retrieved && 
              <Button variant='contained' onClick={()=> verifyUpdate()}>Verify Update</Button>}
            
            
        </div>
    )
}