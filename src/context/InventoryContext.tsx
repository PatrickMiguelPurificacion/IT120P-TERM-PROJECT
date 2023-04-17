import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FieldValue, arrayUnion, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../scripts/firebase-init';
import { StorageAuth } from './StorageContext';

interface ContactEmployee{
    
}
  
export const InventoryContext = createContext<{

  }>({

});

export const InventoryContextProvider = ({children}: {children: ReactNode}) =>{
  
    
  
    useEffect(() =>{
  
      

    }, [])

    return(
      <InventoryContext.Provider  value={{  }}>
        {children}
      </InventoryContext.Provider>
    )
}
  
export const InventoryAuth = () =>{
    return useContext(InventoryContext);
}