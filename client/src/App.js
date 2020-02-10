import React, { useState } from 'react';
import './App.css';

//
import ImageUploader from './components/ImageUploader';

function App() {
  const [files, setFiles] = useState([]);
  return (
    <div className="App">
      <h1>Image Recipe</h1>
      <ImageUploader files={files} setFiles={setFiles} />
    </div>
  );
}

export default App;
