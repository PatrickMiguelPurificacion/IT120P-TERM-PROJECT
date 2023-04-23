import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FieldValue, arrayUnion, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where, limit } from 'firebase/firestore';
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
interface StockDisplay{
  id: string;
  name: string;
  brand: string[];
  code: string[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purpose: string[];
}

  
export const InventoryContext = createContext<{
    item: Item | null;
    allItems: StockDisplay[] | null;
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
    const [allItems, setAllItems] = useState<StockDisplay[] | null>(null);
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



        } catch (error) {

            console.error(error);
            throw error;

        }
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
        setAllItems([]);
        const existingInventoryCollection = collection(db, 'Inventory');
        const existingInventoryQuery = query(existingInventoryCollection, limit(25));
        const existingInventorySnap = await getDocs(existingInventoryQuery);
        console.log(!existingInventorySnap.empty);
        if (!existingInventorySnap.empty) {

          existingInventorySnap.forEach((doc) => {
           
              const id = doc.id;
              const Name = doc.data().Name;
              const Brand = doc.data().Brand;
              const Code = doc.data().Code;
              const Quantity = doc.data().Quantity;
              const unitPrice = doc.data().Unit_Price;
              const totalPrice = doc.data().TotalPrice;
              const purpose = doc.data().Purpose;
                setAllItems((prevStockDisplay) => [
                  ...prevStockDisplay as StockDisplay[],
                  {
                    id: id,
                    name: Name,
                    brand:Brand,
                    code: Code,
                    quantity:Quantity,
                    unitPrice:unitPrice,
                    totalPrice:totalPrice,
                    purpose:purpose,

                  },
                ]);
              
            

          });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
  
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