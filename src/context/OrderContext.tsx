import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FieldValue, arrayUnion, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where, limit } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../scripts/firebase-init';
import { StorageAuth } from './StorageContext';
import { id } from 'date-fns/locale';

interface Order{
  id: number;  
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  dateCreated: Date;
  dateCompleted: Date;
  employeeID: string;
  instructions: {
    bleaching: string;
    dryCleaning: string;
    drying: string;
    ironing: string;
    specialCare: string;
    stainRemoval: string;
    storage: string;
    washing: string;
    notes: string[];
  };
  laundryInfo: {
    accesories: string[];
    activeWear: string[];
    tops: string[];
    bottoms: string[];
    dresses: string[];
    formalWear: string[];
    sleepWear: string[];
    swimWear: string[];
    undergarments: string[];
    Notes: string[];
  };
  status: string;
}

interface AddOrder{ 
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  dateCreated: Date;
  employeeId: string;
  instructions: {
    bleaching: string;
    dryCleaning: string;
    drying: string;
    ironing: string;
    specialCare: string;
    stainRemoval: string;
    storage: string;
    washing: string;
    notes: string[];
  };
  laundryInfo: {
    accesories: string[];
    activeWear: string[];
    tops: string[];
    bottoms: string[];
    dresses: string[];
    formalWear: string[];
    sleepWear: string[];
    swimWear: string[];
    undergarments: string[];
    Notes: string[];
  };
}

interface UpdateOrder{
  id: number;  
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  dateCreated: Date;
  dateCompleted: Date;
  employeeID: string|null;
  instructions: {
    bleaching: string;
    dryCleaning: string;
    drying: string;
    ironing: string;
    specialCare: string;
    stainRemoval: string;
    storage: string;
    washing: string;
    notes: string[];
  };
  laundryInfo: {
    accesories: string[];
    activeWear: string[];
    tops: string[];
    bottoms: string[];
    dresses: string[];
    formalWear: string[];
    sleepWear: string[];
    swimWear: string[];
    undergarments: string[];
    Notes: string[];
  };
  status: string;
}

interface DeleteOrder{
  id: number;  
  customerName: string;
  employeeID: string;
}
interface OrderDisplay{
  id: string;
  customerName: string;
  employeeId: string;
  status: string;
}
  
export const OrderContext = createContext<{
    order: Order | null;
    allOrders: OrderDisplay[] | null;
    addOrder: AddOrder | null;
    updateOrder: UpdateOrder | null;
    deleteOrder: DeleteOrder | null;
    addOrders:(
      customerName: string,
      customerNumber: string,
      customerAddress: string,
      dateCreated: Date,
      employeeId: string,
      instructions: {
        bleaching: string;
        dryCleaning: string;
        drying: string;
        ironing: string;
        specialCare: string;
        stainRemoval: string;
        storage: string;
        washing: string;
        notes: string[];
      },
      laundryInfo: {
        accesories: string[],
        activeWear: string[],
        tops: string[],
        bottoms: string[],
        dresses: string[],
        formalWear: string[],
        sleepWear: string[],
        swimWear: string[],
        undergarments: string[],
        Notes: string[],
      },
    ) => Promise<void>;
    updateOrders:(
      id: number,
      customerName: string,
      customerNumber: string,
      customerAddress: string,
      dateCreated: Date,
      dateCompleted: Date,
      employeeID: string|null,
      instructions: {
        bleaching: string,
        dryCleaning: string,
        drying: string,
        ironing: string,
        specialCare: string,
        stainRemoval: string,
        storage: string,
        washing: string,
        notes: string[];
      },
      laundryInfo: {
        accesories: string[],
        activeWear: string[],
        tops: string[],
        bottoms: string[],
        dresses: string[],
        formalWear: string[],
        sleepWear: string[],
        swimWear: string[],
        undergarments: string[],
        Notes: string[],
      },
      status: string,
    ) => Promise<void>;
    deleteOrders:(
      id: number,
      customerName: string,
      employeeID: string,
    ) => Promise<void>;
    getOrder:(
      id: number,
      customerName: string,
      employeeID: string|null,
    ) => Promise<void>;
    getOrders:() => Promise<void>;
  }>({
    order: null,
    allOrders: null,
    addOrder: null,
    updateOrder: null,
    deleteOrder: null,
    addOrders: async () => {
      throw new Error('addOrders function not implemented');
    },
    updateOrders: async () => {
      throw new Error('updateOrders function not implemented');
    },
    deleteOrders: async () => {
      throw new Error('deleteOrders function not implemented');
    },
    getOrder: async () => {
      throw new Error('getOrder function not implemented');
    },
    getOrders: async () => {
      throw new Error('getOrders function not implemented');
    },
});

export const OrderContextProvider = ({children}: {children: ReactNode}) =>{
  
    const [order, setOrder] = useState<Order | null>(null);
    const [allOrders, setAllOrders] = useState<OrderDisplay[] | null>(null);
    const [addOrder, setAddOrder] = useState<AddOrder | null>(null);
    const [updateOrder, setUpdateOrder] = useState<UpdateOrder | null>(null);
    const [deleteOrder, setDeleteOrder] = useState<DeleteOrder | null>(null);

    const addOrders = async (
        customerName: string,
        customerNumber: string,
        customerAddress: string,
        dateCreated: Date,
        employeeId: string,
        instructions: {
          bleaching: string;
          dryCleaning: string;
          drying: string;
          ironing: string;
          specialCare: string;
          stainRemoval: string;
          storage: string;
          washing: string;
          notes: string[];
        },
        laundryInfo: {
          accesories: string[],
          activeWear: string[],
          tops: string[],
          bottoms: string[],
          dresses: string[],
          formalWear: string[],
          sleepWear: string[],
          swimWear: string[],
          undergarments: string[],
          Notes: string[],
        },
    ) => {

        try {
          console.log(customerName);
          console.log(instructions.bleaching);
          console.log(laundryInfo.accesories);
          const order = {
            Customer_Name: customerName, 
            Contact_Number: customerNumber,
            Address: customerAddress,
            Date_Created: dateCreated,
            Employee_ID: employeeId,
            Instructions: {
                 Bleaching: instructions.bleaching,
                 Dry_Cleaning: instructions.bleaching,
                 Drying: instructions.drying,
                 Ironing: instructions.ironing,
                 Special_Care: instructions.specialCare,
                 Stain_Removal: instructions.stainRemoval,
                 Storage: instructions.storage,
                 Washing: instructions.washing,
                 _Notes: instructions.notes
            },
            LaundryInfo: {
                Accessories: laundryInfo.accesories,
                Activewear: laundryInfo.activeWear,
                Tops: laundryInfo.tops,
                Bottoms: laundryInfo.bottoms,
                Dresses: laundryInfo.dresses,
                Formalwear: laundryInfo.formalWear,
                Sleepwear: laundryInfo.sleepWear,
                Swimwear: laundryInfo.swimWear,
                Undergarments: laundryInfo.undergarments,
                _Notes: laundryInfo.Notes
            },
            Status: 'Ongoing'

           }
           const ordersCollection = collection(db, 'Orders');
           const ordersDocRef = doc(ordersCollection);
           await setDoc(ordersDocRef,{...order,Order_ID:ordersDocRef.id});
          }
      catch (error) {

            console.error(error);
            throw error;

        }
    }

    const updateOrders = async (
        id: number,
        customerName: string,
        customerNumber: string,
        customerAddress: string,
        dateCreated: Date,
        dateCompleted: Date,
        employeeID: string|null,
        instructions: {
          bleaching: string,
          dryCleaning: string,
          drying: string,
          ironing: string,
          specialCare: string,
          stainRemoval: string,
          storage: string,
          washing: string,
          notes: string[];
        },
        laundryInfo: {
          accesories: string[],
          activeWear: string[],
          tops: string[],
          bottoms: string[],
          dresses: string[],
          formalWear: string[],
          sleepWear: string[],
          swimWear: string[],
          undergarments: string[],
          Notes: string[],
        },
        status: string,
    ) => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const deleteOrders = async (
        id?: number | null,
        customerName?: string | null,
        employeeID?: string ,
    ) => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const getOrder = async (
        id?: number | null,
        customerName?: string | null,
        employeeID?: string | null ,
    ) => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const getOrders = async () => {
      try {
        setAllOrders([]);
        const existingOrdersCollection = collection(db, 'Orders');
        const existingOrdersQuery = query(existingOrdersCollection, limit(25));
        const existingOrdersSnap = await getDocs(existingOrdersQuery);
        console.log(!existingOrdersSnap.empty);
        if (!existingOrdersSnap.empty) {

          existingOrdersSnap.forEach((doc) => {
           
              const id = doc.id;
              const customerName = doc.data().Customer_Name;
              const employeeId = doc.data().Employee_ID;
              const orderStatus = doc.data().Status;
                setAllOrders((prevOrderDisplay) => [
                  ...prevOrderDisplay as OrderDisplay[],
                  {
                    id: id,
                    customerName: customerName,
                    employeeId:employeeId,
                    status: orderStatus,              
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
      <OrderContext.Provider  value={{ order, allOrders, addOrder, updateOrder, deleteOrder, addOrders, updateOrders, deleteOrders, getOrder, getOrders }}>
        {children}
      </OrderContext.Provider>
    )
}
  
export const OrderAuth = () =>{
    return useContext(OrderContext);
}