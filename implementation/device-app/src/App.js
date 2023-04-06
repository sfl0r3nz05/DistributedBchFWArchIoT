import {React, useState} from 'react';
import DeviceIDComponent from './components/DeviceIDComponent';
import Header from './components/Header';
import './App.css'
import VersionComponent from './components/VersionComponent';
import UpdateComponent from './components/UpdateComponent';

function App() {
  const [publicKeyContent,setPublicKeyContent] = useState("");
  const [classID, setClassID] = useState("Class_1");

  const [currentVersion, setCurrentVersion] = useState("V_1");
  const [obtainedVersion, setObtainedVersion] = useState("V_0");

  const [hasID, setHasID] = useState(false);
  const [hasVersion, setHasVersion] = useState(false);
  return (
    <div>
        <Header/>
        <DeviceIDComponent classID = {classID} setClassID = {setClassID} publicKeyContent = {publicKeyContent}
        setPublicKeyContent = {setPublicKeyContent} hasID = {hasID} setHasID = {setHasID}/>
        {hasID == true && 
        <VersionComponent classID = {classID} setClassID = {setClassID} publicKeyContent = {publicKeyContent}
        setPublicKeyContent = {setPublicKeyContent} hasVersion={hasVersion} setHasVersion={setHasVersion} 
        setCurrentVersion={setCurrentVersion} setObtainedVersion={setObtainedVersion} />}

        {obtainedVersion > currentVersion &&
        <UpdateComponent classID = {classID} setClassID = {setClassID} publicKeyContent = {publicKeyContent}
        setPublicKeyContent = {setPublicKeyContent} />}
      
    </div>
  );
}

export default App;
