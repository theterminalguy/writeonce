import React from 'react';
import './App.css';
import Editor from './components/editors/vanilla/index';
import FloatingToolBarPlugin from './components/editors/vanilla/plugins/FloatingToolBarPlugin';

function App() {
  return (
    <div className="wrapper">
      <Editor>
        <FloatingToolBarPlugin />
      </Editor>
    </div>
  );
}

export default App;
