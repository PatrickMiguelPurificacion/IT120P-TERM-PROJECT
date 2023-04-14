import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import { AuthContextProvider } from '../context/AuthContext'
import { StorageContextProvider } from '../context/StorageContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StorageContextProvider>
      <AuthContextProvider>
          <App />
      </AuthContextProvider>
    </StorageContextProvider>
  </React.StrictMode>,
)
