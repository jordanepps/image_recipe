import React, { useState } from 'react';
import './App.css';

import axios from 'axios';

//
import ImageUploader from './components/ImageUploader';

function App() {
  const [files, setFiles] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      // setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        // setMessage('There was a problem with the server');
        console.log(err);
      } else {
        // setMessage(err.response.data.msg);
        console.log(err);
      }
    }
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
