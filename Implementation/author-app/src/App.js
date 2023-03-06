import {React, useState} from 'react';
import './App.css';
import Header from './components/Header.js'
import RegisterAuthorForm from './components/RegisterAuthorForm';
import KeyHandler from './components/KeyHandler';


function App() {
  const [selectedComponent, setSelectedComponent] = useState(0);

  const [privateKeyContent,setPrivateKeyContent] = useState("");
  const [publicKeyContent,setPublicKeyContent] = useState("");
  return (
    <div>
      <Header setSelectedComponent={ setSelectedComponent} selectedComponent = {selectedComponent}/>
      <KeyHandler privateKeyContent={privateKeyContent} setPrivateKeyContent={setPrivateKeyContent}
      publicKeyContent={publicKeyContent} setPublicKeyContent={setPublicKeyContent} />
      
      {selectedComponent == 0 && 
      <RegisterAuthorForm privateKeyContent={privateKeyContent} setPrivateKeyContent={setPrivateKeyContent}
      publicKeyContent={publicKeyContent} setPublicKeyContent={setPublicKeyContent}/>}
    </div>
  );
}

export default App;
