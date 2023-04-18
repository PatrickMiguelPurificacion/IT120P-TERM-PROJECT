import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FieldValue, arrayUnion, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../scripts/firebase-init';
import { StorageAuth } from './StorageContext';

interface Order{
  id: number;  
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  dateCreated: Date;
  dateCompleted: Date;
  employeeID: number;
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
    notes: string[];
  };
  status: string;
}

interface AddOrder{ 
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  dateCreated: Date;
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
    notes: string[];
  };
}

interface UpdateOrder{
  id: number;  
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  dateCreated: Date;
  dateCompleted: Date;
  employeeID: number;
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
    notes: string[];
  };
  status: string;
}

interface DeleteOrder{
  id: number;  
  customerName: string;
  employeeID: number;
}
  
export const OrderContext = createContext<{
    order: Order | null;
    allOrders: Order[] | null;
    addOrder: AddOrder | null;
    updateOrder: UpdateOrder | null;
    deleteOrder: DeleteOrder | null;
    addOrders:(
      customerName: string,
      customerNumber: string,
      customerAddress: string,
      dateCreated: Date,
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
        notes: string[],
      },
    ) => Promise<void>;
    updateOrders:(
      id: number,
      customerName: string,
      customerNumber: string,
      customerAddress: string,
      dateCreated: Date,
      dateCompleted: Date,
      employeeID: number,
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
        notes: string[],
      },
      status: string,
    ) => Promise<void>;
    deleteOrders:(
      id: number,
      customerName: string,
      employeeID: number,
    ) => Promise<void>;
    getOrder:(
      id: number,
      customerName: string,
      employeeID: number,
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
    const [allOrders, setAllOrders] = useState<Order[] | null>(null);
    const [addOrder, setAddOrder] = useState<AddOrder | null>(null);
    const [updateOrder, setUpdateOrder] = useState<UpdateOrder | null>(null);
    const [deleteOrder, setDeleteOrder] = useState<DeleteOrder | null>(null);

    const addOrders = async (
        customerName: string,
        customerNumber: string,
        customerAddress: string,
        dateCreated: Date,
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
          notes: string[],
        },
    ) => {

        try {



        } catch (error) {

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
        employeeID: number,
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
          notes: string[],
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
        employeeID?: number | null,
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
        employeeID?: number | null,
    ) => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const getOrders = async () => {

        try {



        } catch (error) {

            console.error(error);
            throw error;

        }
    }

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