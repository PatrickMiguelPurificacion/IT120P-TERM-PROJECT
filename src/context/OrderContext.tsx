import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { DocumentData, FieldValue, Query, arrayUnion, collection, deleteDoc, doc, documentId, getDoc, getDocs, limit, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../scripts/firebase-init';
import { StorageAuth } from './StorageContext';
import { id } from 'date-fns/locale';

interface Order{
  id: string;  
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
  id: string;  
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
  id: string;  
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
      id: string,
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
      id: string,
      customerName: string,
      employeeID: string,
    ) => Promise<void>;
    getOrder:(
      id: string,
      type: string
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
        id: string,
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
            const order ={
              Customer_Name: customerName, 
            Contact_Number: customerNumber,
            Address: customerAddress,
            Date_Created: dateCreated,
            Date_Completed: dateCompleted,
            Employee_ID: employeeID,
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
            const orderDocRef= doc(ordersCollection,id);
            await updateDoc(orderDocRef, order);
            await getOrder(id,'update');
            


        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const deleteOrders = async (
        id: string,
        customerName: string ,
        employeeID?: string ,
    ) => {
    
        try {
          const ordersCollection = collection(db, 'Orders');
          const orderDocRef= doc(ordersCollection,id);
          await deleteDoc(orderDocRef);
          console.log(`Document with ID ${id} successfully deleted`);
          setDeleteOrder(null);
  
        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    const getOrder = async (
        id: string,
        type: string
    ) => {

        try {
          const ordersDocRef = query(collection(db,'Orders'), where(documentId(), "==", id));
          const orderQuery = await getDocs(ordersDocRef);

          if (!orderQuery.empty) {
            orderQuery.forEach((orderData) => {
              if (orderData.id === id){
                if(type === 'update'){
                    if(orderData.data().dateCompleted){
                      return setUpdateOrder({
                        id: orderData.id,
                        customerName: orderData.data().Customer_Name,
                        customerNumber: orderData.data().Contact_Number,
                        customerAddress: orderData.data().Address,
                        dateCreated: orderData.data().Date_Created.toDate(),
                        dateCompleted: orderData.data().DateCompleted.toDate(),
                        employeeID: orderData.data().Employee_ID,
                        instructions: {
                             bleaching: orderData.data().Instructions.Bleaching,
                             dryCleaning: orderData.data().Instructions.Dry_Cleaning,
                             drying: orderData.data().Instructions.Drying,
                             ironing: orderData.data().Instructions.Ironing,
                             specialCare: orderData.data().Instructions.Special_Care,
                             stainRemoval: orderData.data().Instructions.Stain_Removal,
                             storage: orderData.data().Instructions.Storage,
                             washing: orderData.data().Instructions.Washing,
                             notes: orderData.data().Instructions._Notes,
                         },
                        laundryInfo: {
                             accesories: orderData.data().LaundryInfo.Accessories,
                             activeWear: orderData.data().LaundryInfo.Activewear,
                             tops: orderData.data().LaundryInfo.Tops,
                             bottoms: orderData.data().LaundryInfo.Bottoms,
                             dresses: orderData.data().LaundryInfo.Dresses,
                             formalWear: orderData.data().LaundryInfo.Formalwear,
                             sleepWear: orderData.data().LaundryInfo.Sleepwear,
                             swimWear: orderData.data().LaundryInfo.Swimwear,
                             undergarments: orderData.data().LaundryInfo.Undergarments,
                             Notes: orderData.data().LaundryInfo._Notes,
                        },
                        status: orderData.data().Status,
    
                        });

                    }
                    else{
                      return setUpdateOrder({
                        id: orderData.id,
                        customerName: orderData.data().Customer_Name,
                        customerNumber: orderData.data().Contact_Number,
                        customerAddress: orderData.data().Address,
                        dateCreated: orderData.data().Date_Created.toDate(),
                        dateCompleted: new Date(0),
                        employeeID: orderData.data().Employee_ID,
                        instructions: {
                             bleaching: orderData.data().Instructions.Bleaching,
                             dryCleaning: orderData.data().Instructions.Dry_Cleaning,
                             drying: orderData.data().Instructions.Drying,
                             ironing: orderData.data().Instructions.Ironing,
                             specialCare: orderData.data().Instructions.Special_Care,
                             stainRemoval: orderData.data().Instructions.Stain_Removal,
                             storage: orderData.data().Instructions.Storage,
                             washing: orderData.data().Instructions.Washing,
                             notes: orderData.data().Instructions._Notes,
                         },
                        laundryInfo: {
                             accesories: orderData.data().LaundryInfo.Accessories,
                             activeWear: orderData.data().LaundryInfo.Activewear,
                             tops: orderData.data().LaundryInfo.Tops,
                             bottoms: orderData.data().LaundryInfo.Bottoms,
                             dresses: orderData.data().LaundryInfo.Dresses,
                             formalWear: orderData.data().LaundryInfo.Formalwear,
                             sleepWear: orderData.data().LaundryInfo.Sleepwear,
                             swimWear: orderData.data().LaundryInfo.Swimwear,
                             undergarments: orderData.data().LaundryInfo.Undergarments,
                             Notes: orderData.data().LaundryInfo._Notes,
                        },
                        status: orderData.data().Status,
    
                        });
                    }
                      
                    
                }else{

                  return setDeleteOrder({
                    id: orderData.data().Order_ID,
                    customerName: orderData.data().Customer_Name,
                    employeeID: orderData.data().Employee_ID
                  });
                }
              }
          });
        }
        else{
          throw new Error ('Order not Found. ')
        }
      }catch (error) {
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
        
        if (!existingOrdersSnap.empty) {

          existingOrdersSnap.forEach((doc) => {
           
              const id = doc.id;
              const customerName = doc.data().Customer_Name;
              const employeeId = doc.data().Employee_ID;
              const status = doc.data().Status;
              setAllOrders((prevOrderDisplay) => [
                ...prevOrderDisplay as OrderDisplay[],
                {
                  id: id,
                  customerName: customerName,
                  employeeId:employeeId,
                  status: status,              
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