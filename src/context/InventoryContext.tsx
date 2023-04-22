import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FieldValue, arrayUnion, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../scripts/firebase-init';
import { StorageAuth } from './StorageContext';

interface Item{
    id: number;  
    name: string;
    brand: string[];
    code: string[];
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purpose: string[];
}

interface AddItem{
    name: string;
    brand: string[];
    code: string[];
    quantity: number;
    unitPrice: number;
    purpose: string[];
}

interface UpdateItem{
    id: number;  
    name: string;
    brand: string[];
    code: string[];
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purpose: string[];
}

interface DeleteItem{
    id: number;  
    name: string;
    brand: string[];
    code: string[];
}
  
export const InventoryContext = createContext<{
    item: Item | null;
    allItems: Item[] | null;
    addItem: AddItem | null;
    updateItem: UpdateItem | null;
    deleteItem: DeleteItem | null;
    addItems:(
      name: string,
      brand: string[],
      code: string[],
      quantity: number,
      unitPrice: number,
      purpose: string[],
    ) => Promise<void>;
    updateItems:(
      id: number,
      name: string,
      brand: string[],
      code: string[],
      quantity: number,
      unitPrice: number,
      totalPrice: number,
      purpose: string[],
    ) => Promise<void>;
    deleteItems:(
      id: number,
      name: string,
      brand: string[],
      code: string[],
    ) => Promise<void>;
    getItem:(
      id: number,
      name: string,
      brand: string[],
      code: string[],
    ) => Promise<void>;
    getItems:() => Promise<void>;
  }>({
    item: null,
    allItems: null,
    addItem: null,
    updateItem: null,
    deleteItem: null,
    addItems: async () => {
      throw new Error('addItems function not implemented');
    },
    updateItems: async () => {
      throw new Error('updateItems function not implemented');
    },
    deleteItems: async () => {
      throw new Error('deleteItems function not implemented');
    },
    getItem: async () => {
      throw new Error('getItem function not implemented');
    },
    getItems: async () => {
      throw new Error('getItems function not implemented');
    },
});

export const InventoryContextProvider = ({children}: {children: ReactNode}) =>{
  
    const [item, setItem] = useState<Item | null>(null);
    const [allItems, setAllItems] = useState<Item[] | null>(null);
    const [addItem, setAddItem] = useState<AddItem | null>(null);
    const [updateItem, setUpdateItem] = useState<UpdateItem | null>(null);
    const [deleteItem, setDeleteItem] = useState<DeleteItem | null>(null);

    const addItems = async (
      name: string,
      brand: string[],
      code: string[],
      quantity: number,
      unitPrice: number,
      purpose: string[],
     
    ) => {

        try {

            console.log(name);
            console.log(brand); 
            console.log(quantity); 
            console.log(unitPrice); 
            console.log(purpose); 
            const item = {
                Brand: brand,
                Code:  code,
                Name:  name,
                Purpose: purpose,
                Quantity: quantity,                
                Unit_Price:  unitPrice,
                Total_Price: (unitPrice*quantity),
                
            }
            const itemsCollection = collection(db, 'Inventory');
            const itemsDocRef = doc(itemsCollection);
            await setDoc(itemsDocRef,{...item,Item_ID:itemsDocRef.id});
           
        } catch (error) {

            console.error(error);
            throw error;

        }
    
    }

    const updateItems = async (
        id: number,
        name: string,
        brand: string[],
        code: string[],
        quantity: number,
        unitPrice: number,
        totalPrice: number,
        purpose: string[],
    ) => {

        try {
          const item = {
            Brand: brand,
            Code:  code,
            Name:  name,
            Purpose: purpose,
            Quantity: quantity,                
            Unit_Price:  unitPrice,
            Total_Price: (unitPrice*quantity),
          }
          const auth = getAuth();
       
        } catch (error) {

            console.error(error);
            throw error;

        }
           const auth = getAuth();
    }

    const deleteItems = async (
        id?: number | null,
        name?: string | null,
        brand?: string[] | null,
        code?: string[] | null,
    ) => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const getItem = async (
        id?: number | null,
        name?: string | null,
        brand?: string[] | null,
        code?: string[] | null,
    ) => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const getItems = async () => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }
  
    useEffect(() =>{
  
      

    }, [])

    return(
      <InventoryContext.Provider  value={{ item, allItems, addItem, updateItem, deleteItem, addItems, updateItems, deleteItems, getItem, getItems }}>
        {children}
      </InventoryContext.Provider>
    )
}
  
export const InventoryAuth = () =>{
    return useContext(InventoryContext);
}