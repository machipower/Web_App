import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import { awsmobile } from './aws-exports' 
import { amplifyConfig } from "./lib/amplify-config";

Amplify.configure(awsmobile);
Amplify.configure(amplifyConfig);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
