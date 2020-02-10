import React, { useState } from 'react';
import './App.css';

import axios from 'axios';

//
import ImageUploader from './components/ImageUploader';

function App() {
  const [files, setFiles] = useState([]);

  const handleUpload = () => {
    console.log('test');
  };

  return (
    <div className="App">
      <h1>Image Recipe</h1>
      <ImageUploader files={files} setFiles={setFiles} />
      <button onClick={handleUpload} disabled={!files.length}>
        Upload
      </button>
    </div>
  );
}

export default App;
