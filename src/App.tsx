import React from 'react';
import './App.css';
import Editor from './components/editors/vanilla/index';
import Modal from './components/editors/vanilla/components/modal';

function App() {
  return (
    <div className="wrapper">
      <Editor />
      <Modal title='Enter placeholder name'/>
    </div>
  );
}

export default App;
