import React from 'react';
import FilePicker from 'wix-style-react/FilePicker';

export default () =>
  <div style={{marginBottom: '100px'}}>
    <div style={{marginBottom: '30px'}}>
      <FilePicker
        dataHook="story-filepicker"
        supportedFormats=".png, .pdf"
        onChange={file => console.log(file.name)}
        />
    </div>

    <FilePicker
      dataHook="story-filepicker2"
      supportedFormats=".png, .pdf"
      onChange={file => console.log(file.name)}
      mainLabel="FilePicker with error"
      error
      errorMessage="File is too large"
      />
  </div>;
