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
        const url = 'http://127.0.0.1:3002/retrieve';
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
            setRetrieved(true);
            setUpdate(res.data);
        })
    }

    function setUpdate(res){
        setAuthorManifestSign(res.authorManifestSign);
        setAuthorSign(res.authorSign);
        setAditionalInstructions(res.manifest.aditionalInstructions);
        setClassID(res.manifest.classID);
        setDependencies(res.manifest.dependencies);
        setEncryptionWrapper(res.manifest.encryptionWrapper);
        setManifestDigest(res.manifest.manifestDigest);
        setMonotonicSequenceNumber(res.manifest.monotonicSequenceNumber);
        setManifestPayload(res.manifest.payload);
        setPayloadDigest(res.manifest.payloadDigest);
        setPayloadFormat(res.manifest.payloadFormat);
        setPayloadIndicator(res.manifest.payloadIndicator);
        setPayloadProcessing(res.manifest.payloadProcessing);
        setSize(res.manifest.size);
        setStorageLocation(res.manifest.storageLocation);
        setVendorID(res.manifest.vendorID);
        setVersionID(res.manifest.versionID);
        setPayload(res.payload);
    }


    return(
        <div>
            <h2>Update</h2>
            <Button variant='contained' onClick={()=> retrieveUpdate()}>Retrieve Update</Button>
            <br/>
            {retrieved &&
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
                        value={versionID}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={classID}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={vendorID}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={MonotonicSequenceNumber}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={payloadFormat}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={payloadProcessing}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={storageLocation}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={payloadIndicator}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={size}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={aditionalInstructions}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={"Write dependencies separated by comma ','"}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={encryptionWrapper}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={manifestPayload}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={payloadDigest}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={manifestDigest}
                        InputProps={{
                            readOnly: true,
                          }}
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
                        value={payload}
                        InputProps={{
                            readOnly: true,
                          }}
                    />
                </Grid>
                </Grid>
            </Grid>}
            
            
        </div>
    )
}