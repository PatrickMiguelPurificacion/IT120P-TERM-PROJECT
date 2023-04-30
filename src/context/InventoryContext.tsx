import { collection, deleteDoc, doc, documentId, getDocs, limit, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { db } from '../scripts/firebase-init';

interface Item{
    id: string;  
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
    id: string;  
    name: string;
    brand: string[];
    code: string[];
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purpose: string[];
}

interface DeleteItem{
    id: string;  
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
      id: string,
      name: string,
      brand: string[],
      code: string[],
      quantity: number,
      unitPrice: number,
      totalPrice: number,
      purpose: string[],
    ) => Promise<void>;
    deleteItems:(
      id: string,
      name: string,
      brand: string[],
      code: string[],
    ) => Promise<void>;
    getItem:(
      id: string,
      type: string
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
        id: string,
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
          const itemsCollection = collection(db, 'Inventory');
          const itemsDocRef = doc(itemsCollection,id);
          await updateDoc(itemsDocRef, item);
          await getItem(id, 'update');
       
        } catch (error) {

            console.error(error);
            throw error;

        }
         
    }

    const deleteItems = async (
        id: string, 
        name: string,
        brand: string[],
        code: string[]
    ) => {

        try {
          const item = {
            id: id,
            name: name,
            brand: brand,
            code: code,     
          }
          const itemsCollection = collection(db, 'Inventory');
          const itemsDocRef = doc(itemsCollection,id);
          await deleteDoc(itemsDocRef);
          setDeleteItem(null);
          
        }
         
         catch (error) {

            console.error(error);
            throw error;

        }
    }

    const getItem = async (id: string, type: string) => {

        try {

          const itemsDocRef = query(collection(db,'Inventory'), where(documentId(), "==", id));
          const itemQuery = await getDocs(itemsDocRef);

          if (!itemQuery.empty){
            
            itemQuery.forEach((itemData) => {

              if(itemData.id === id){

                if(type === 'update'){
                    
                  return setUpdateItem({
                      id: itemData.data().Item_ID,
                      brand: itemData.data().Brand,
                      code: itemData.data().Code,
                      name: itemData.data().Name,
                      purpose: itemData.data().Purpose,
                      quantity: itemData.data().Quantity,               
                      unitPrice: itemData.data().Unit_Price,
                      totalPrice: itemData.data().Total_Price,               
                  });

                }else{

                  return setDeleteItem({
                    id: itemData.data().Item_ID,
                    brand: itemData.data().Brand,
                    code: itemData.data().Code,
                    name: itemData.data().Name             
                });

                }

              }

            });

          }else{

            throw new Error('Item Not Found.')

          }

        }catch (error) {

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

        if (!existingInventorySnap.empty) {

          existingInventorySnap.forEach((doc) => {
           
              const id = doc.id;
              const Name = doc.data().Name;
              const Brand = doc.data().Brand;
              const Code = doc.data().Code;
              const Quantity = doc.data().Quantity;
              const unitPrice = doc.data().Unit_Price;
              const totalPrice = doc.data().Total_Price;
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