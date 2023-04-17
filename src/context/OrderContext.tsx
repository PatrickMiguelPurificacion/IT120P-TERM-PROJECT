import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FieldValue, arrayUnion, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../scripts/firebase-init';
import { StorageAuth } from './StorageContext';

interface ContactEmployee{
    
}
  
export const OrderContext = createContext<{

  }>({

});

export const OrderContextProvider = ({children}: {children: ReactNode}) =>{
  
    
  
    useEffect(() =>{
  
      

    }, [])

    return(
      <OrderContext.Provider  value={{  }}>
        {children}
      </OrderContext.Provider>
    )
}
  
export const InventoryAuth = () =>{
    return useContext(OrderContext);
}