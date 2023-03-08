import React, {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import stringify from 'json-stringify-deterministic';


export default function RegisterUpdateForm(props){
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
    const [payloadSign, setPayloadSign] = useState("");
    const [manifestSign, setManifestSign] = useState("");

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

     const signManifest = async () =>{
        createManifest();
       await signManifestJson(manifest);
    } 

    async function signManifestJson(manifest){
        const url = 'http://127.0.0.1:3000/sign';
        const json = {
            privateKey : props.privateKeyContent.toString(),
            message : manifest,
        }
        console.log(json);
        axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) =>{
            console.log(res.data)
            setManifestSign(res.data.sign);
            setManifestDigest(res.data.digest);
            document.getElementById("manifestDigestField").value = res.data.digest;
            createManifest();
        })
        return
    }

    async function signPayloadString(){
        const url = 'http://127.0.0.1:3000/sign';
        const json = {
            privateKey : props.privateKeyContent.toString(),
            payload : payloadString.toString(),
        }
        console.log(json);
        axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) =>{
            console.log(res.data)
            setPayloadSign(res.data.sign);
            setPayloadDigest(res.data.digest);
            document.getElementById("payloadDigestField").value = res.data.digest;
        })
        return
    }

    async function signPayloadFile(){
        const url = 'http://127.0.0.1:3000/sign';
        var formData = new FormData();
        formData.append('privateKey', props.privateKeyContent);
        formData.append('payload', payload);
        console.log(formData);
        axios.post(url, formData, {
            withCredentials : false,
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }).then((res) =>{
            console.log(res.data)
            setPayloadSign(res.data.sign);
            setPayloadDigest(res.data.digest);
            document.getElementById("payloadDigestField").value = res.data.digest;
        })
        return;
    }

    async function signPayload (){
        if(payload){
           await signPayloadFile();
        } else if (payloadString !== ""){
            await signPayloadString()
        } else {
            console.log("NO PAYLOAD TO SIGN");
        }
    }

    function registerUpdate(){
        createManifest();
        var update = {
            manifest : manifest,
            authorSign : payloadSign,
            authorManifestSign : manifestSign
        }
        if (payload){
            registerUpdateFile(update);
        } else {
            registerUpdateJson(update);
        }
    }

    function registerUpdateFile(update){
        const url = 'http://127.0.0.1:3000/register';
        var formData = new FormData();
        formData.append('publicKey', props.publicKeyContent);
        formData.append('update', stringify(update));
        formData.append('payload', payload);
        console.log(formData);
        axios.post(url, formData, {
            withCredentials : false,
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }).then((res) =>{
            console.log(res.data);
            setResult(res.data);
        })
    }

    function registerUpdateJson(update){
        const url = 'http://127.0.0.1:3000/register';
        update.payload = payloadString;
        var json = {
            publicKey : props.publicKeyContent,
            update : update
        }
        console.log(json);
        axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) =>{
            console.log(res.data);
            setResult(res.data);
        }).catch( (err) => {{
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                console.log(err.response);
            } else if (err.request) {
                // The client never received a response, and the request was never left
                console.log(err.request)
            } else {
                // Anything else
                console.log(err.message)
            }

            document.getElementById('result').textContent = "Could not register. Check console for details.";
        }});
    }
    


    return(
        <div>
            <h2>Register Update</h2>
            <Grid id='Keys' direction='column' container spacing={3}  justifyContent="center">
                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setVersionID(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="versionID"
                        defaultValue={versionID}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setClassID(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="classID"
                        defaultValue={classID}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setVendorID(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="vendorID"
                        defaultValue={vendorID}
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setMonotonicSequenceNumber(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="MonotonicSequenceNumber"
                        defaultValue={MonotonicSequenceNumber}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setPayloadFormat(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadFormat"
                        defaultValue={payloadFormat}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setPayloadProcessing(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadProcessing"
                        defaultValue={payloadProcessing}
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setStorageLocation(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="StorageLocation"
                        defaultValue={storageLocation}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setPayloadIndicator(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadIndicator"
                        defaultValue={payloadIndicator}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setSize(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Size"
                        defaultValue={size}
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setAditionalInstructions(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="AditionalInstructions"
                        defaultValue={aditionalInstructions}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setDependencies(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Dependencies"
                        defaultValue={"Write dependencies separated by comma ','"}
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setEncryptionWrapper(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="EncryptionWrapper"
                        defaultValue={encryptionWrapper}
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setManifestPayload(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="ManifestPayload"
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setPayloadDigest(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="PayloadDigest"
                        id = "payloadDigestField"
                    />
                    </Grid>
                    <Grid item sm={3}>
                    <TextField fullWidth
                        type="text"
                        onChange={(e) => setManifestDigest(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="ManifestDigest"
                        id = "manifestDigestField"
                    />
                    </Grid>
                </Grid>

                <Grid container direction='row' item sm={10} spacing={0.5} alignItems="center" justifyContent="center">
                <Grid item sm={6}>
                <TextField fullWidth
                        type="text"
                        onChange={(e) => setPayloadString(e.target.value)}
                        color="primary"
                        variant='outlined'
                        focused
                        label="String-Payload"
                        defaultValue={"Only use if not uploading file"}
                    />
                </Grid>
                <Grid item sm={4}>
                    <TextField fullWidth
                        type="file"
                        onChange={(e) => setPayload(e.target.files[0])}
                        color="primary"
                        variant='outlined'
                        focused
                        label="Payload"
                    />
                </Grid>
                </Grid>
            </Grid>
            <Button type ="button" variant="contained" onClick={async () => {await signPayload();createManifest()}}>Sign Payload</Button>
            {payloadSign !== "" && manifest.payloadDigest !== "" &&<Button type ="button" variant='contained' onClick={() => {signManifest();createManifest()}}>Sign Manifest</Button>}
            
            <br/>
            {payloadSign !== "" && <a>Payload Signed</a>}
            <br/>
            {manifestSign !== "" && <a>Manifest Signed</a>}
            <br/>
            {result !== "" && <a>RESULT: {result}</a>}
            <br/>
            {payloadSign !== "" && manifestSign !== "" &&
            manifest.payloadDigest !== "" && manifest.manifestDigest !== "" &&
                <Button type ="button" variant='contained' onClick={() => registerUpdate()}>Register Update</Button> }
            
        </div>
    )
}