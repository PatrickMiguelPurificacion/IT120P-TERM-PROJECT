import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import { AuthContextProvider } from '../context/UserContext'
import { StorageContextProvider } from '../context/StorageContext'
import { InventoryContextProvider } from '../context/InventoryContext'
import { OrderContextProvider } from '../context/OrderContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StorageContextProvider>
      <AuthContextProvider>
          <InventoryContextProvider>
              <OrderContextProvider>
                <App />
              </OrderContextProvider>
          </InventoryContextProvider>
      </AuthContextProvider>
    </StorageContextProvider>
  </React.StrictMode>,
)
