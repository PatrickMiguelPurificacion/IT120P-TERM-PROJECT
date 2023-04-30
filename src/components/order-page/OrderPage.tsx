import React, { FormEventHandler, useEffect, useState } from 'react'
import OrderPageCSS from './OrderPage.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/order-page/FabricFinesse.png'
import { useNavigate } from 'react-router-dom'
import Alert from '../alerts/Alerts'
import { OrderAuth } from '../../context/OrderContext'
import FormValidator from '../../scripts/formValidator';
import { UserAuth } from '../../context/UserContext'
const OrderPage = () => {
    const {order, allOrders, updateOrder, deleteOrder, addOrders, updateOrders, deleteOrders, getOrder, getOrders}=OrderAuth();
    const {currentEmployee} = UserAuth();
    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [formState, setFormState] = useState('None');
    const [isOrderValid, setIsOrderValid] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [orderId, setOrderId] = useState('');
    const formValidator = new FormValidator();
    //ADD
     const [addOrder, setaddOrder] = useState<{
        customerName: string,
        customerNumber: string,
        customerAddress: string,
        dateCreated: Date,
        instructions:{
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
      }}>({
        customerName: '',
        customerNumber:'' ,
        customerAddress:'' ,
        dateCreated: new Date(),
        instructions: {
          bleaching: 'none',
          dryCleaning: 'none',
          drying: 'none',
          ironing: 'none',
          specialCare: 'none',
          stainRemoval: 'none',
          storage: 'none',
          washing: 'none',
          notes: ['none'],
        },
        laundryInfo: {
          accesories: ['none'],
          activeWear: ['none'],
          tops: ['none'],
          bottoms: ['none'],
          dresses: ['none'],
          formalWear: ['none'],
          sleepWear: ['none'],
          swimWear: ['none'],
          undergarments: ['none'],
          Notes: ['none'],
      }})
      //UPDATE
    const [OrderUpdates, setOrderUpdates]= useState<{
        id: string;  
        customerName: string;
        customerNumber: string;
        customerAddress: string;
        dateCreated: Date|null;
        dateCompleted: Date|null;
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
      }>({
        id: '',  
        customerName: '',
        customerNumber: '',
        customerAddress: '',
        dateCreated: new Date(0,0,0),
        dateCompleted: new Date(0,0,0),
        employeeID: '',
        instructions: {
          bleaching: '',
          dryCleaning: '',
          drying: '',
          ironing: '',
          specialCare: '',
          stainRemoval: '',
          storage: '',
          washing: '',
          notes: [''],
        },
        laundryInfo: {
          accesories: [''],
          activeWear: [''],
          tops: [''],
          bottoms: [''],
          dresses: [''],
          formalWear: [''],
          sleepWear: [''],
          swimWear: [''],
          undergarments: [''],
          Notes: [''],
        },
        status: ''

       })


    //DELETE
    const [DeleteOrder,setDeleteOrder]= useState<{
        id: string;
        customerName: string ;
        employeeID: string;
    }>({
        id:'',
        customerName:'',
        employeeID:''

    })

   
   
    const navigate = useNavigate();

    const goToOrderTable = () =>{

        navigate("/dashboard/order-display");

    }

    const orderAdd: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{
            const{
            customerName ,
            customerNumber,
            customerAddress ,
            dateCreated,
            instructions: {
                 bleaching,
                 dryCleaning,
                 drying,
                 ironing,
                 specialCare,
                stainRemoval,
                storage,
                 washing,
                notes
            },
            laundryInfo: {
                accesories,
                activeWear,
                tops,
                bottoms,
                dresses,
                formalWear,
                sleepWear,
                swimWear,
                undergarments,
                Notes
            }
         } = addOrder;

         await addOrders(customerName ,customerNumber,customerAddress ,new Date(),currentEmployee!.uuid,addOrder.instructions,addOrder.laundryInfo).then(()=>{

            setRefreshCounter(prevCounter => prevCounter + 1);
            setaddOrder({ customerName: '',
            customerNumber:'' ,
            customerAddress:'' ,
            dateCreated: new Date(),
            instructions: {
              bleaching: '',
              dryCleaning: '',
              drying: '',
              ironing: '',
              specialCare: '',
              stainRemoval: '',
              storage: '',
              washing: '',
              notes: [''],
            },
            laundryInfo: {
              accesories: [''],
              activeWear: [''],
              tops: [''],
              bottoms: [''],
              dresses: [''],
              formalWear: [''],
              sleepWear: [''],
              swimWear: [''],
              undergarments: [''],
              Notes: ['']}})
              setIsEditable(false);
              setIsOrderValid(false);
            return setAlertMessage({type: 'success', message: 'Order Added Successfully.', show: true});

        }).catch((error: { message: any })=>{

            return setAlertMessage({type: 'error', message: error.message, show: true});

        });
          
         

        }
        catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const searchOrder = async (type: string) => {

        try{
            setAlertMessage({type: '', message: '', show: false});

            await getOrder(orderId, type).then(()=>{

                setIsEditable(true);
                setRefreshCounter(prevCounter => prevCounter + 1);
                return setAlertMessage({type: 'success', message: 'Order Found.', show: true});

            });

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const orderUpdate: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{
            const{
            id,  
            customerName,
            customerNumber,
            customerAddress,
            dateCreated,
            dateCompleted,
            employeeID,
            instructions: {
                bleaching,
                dryCleaning,
                drying,
                ironing,
                specialCare,
                stainRemoval,
                storage,
                washing,
                notes ,
             },
            laundryInfo: {
                accesories ,
                activeWear ,
                tops ,
                bottoms ,
                dresses ,
                formalWear ,
                sleepWear ,
                swimWear ,
                undergarments ,
                Notes ,
            },
            status} = OrderUpdates;

            await updateOrders(id,customerName,customerNumber,customerAddress,dateCreated as Date,dateCompleted as Date,employeeID,OrderUpdates.instructions,OrderUpdates.laundryInfo,status).then(() =>{

                
                if(updateOrder){
                    setOrderUpdates(updateOrder);
                }
                setRefreshCounter(prevCounter => prevCounter + 1);
                return setAlertMessage({type: 'success', message: 'Order Updated Successfully.', show: true});
  
            })
        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        } 

    }

    const orderDelete: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{
            const{
                id,
                customerName,
                employeeID
            } = DeleteOrder;
            
            await deleteOrders(id,customerName,employeeID).then(() =>{

                setRefreshCounter(prevCounter => prevCounter + 1);
                setDeleteOrder({id: '', customerName: '', employeeID:''});
                setIsEditable(false);
                setIsOrderValid(false);
                return setAlertMessage({type: 'success', message: 'User Deleted Successfully.', show: true});
  
            })
        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    
    useEffect(() =>{

        if (addOrder.customerName && addOrder.customerAddress && addOrder.customerNumber)
        {
            setIsOrderValid(true);
        }
        
        
      },[addOrder])
      
      useEffect(() =>{

        if (OrderUpdates.id && OrderUpdates.customerName && OrderUpdates.employeeID)
        {
            setIsOrderValid(true);
            console.log(updateOrder);
        }
        
        
      },[updateOrder])


      useEffect(() =>{

        if (DeleteOrder.id && DeleteOrder.customerName && DeleteOrder.employeeID)
        {
            setIsOrderValid(true);
        }
        
        
      },[DeleteOrder])

      useEffect(() => {
        
        if (updateOrder !== null) {
          
            setOrderUpdates(updateOrder);

        }

    }, [updateOrder]);

    useEffect(() => {
        
        if (deleteOrder !== null) {
          
            setDeleteOrder(deleteOrder);

        }

    }, [deleteOrder]);
    

    useEffect(()=>{
        
      if(alertMessage.show){
          setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
      }

    },[alertMessage.message]);

    useEffect(() =>{

        setIsEditable(false);
        setIsOrderValid(false);
        setaddOrder({ customerName: '',
            customerNumber:'' ,
            customerAddress:'' ,
            dateCreated: new Date(),
            instructions: {
              bleaching: '',
              dryCleaning: '',
              drying: '',
              ironing: '',
              specialCare: '',
              stainRemoval: '',
              storage: '',
              washing: '',
              notes: [''],
            },
            laundryInfo: {
              accesories: [''],
              activeWear: [''],
              tops: [''],
              bottoms: [''],
              dresses: [''],
              formalWear: [''],
              sleepWear: [''],
              swimWear: [''],
              undergarments: [''],
              Notes: ['']}});
        setOrderUpdates({id: '',  
                        customerName: '',
                        customerNumber: '',
                        customerAddress: '',
                        dateCreated: new Date(0),
                        dateCompleted: new Date(0),
                        employeeID: '',
                        instructions: {
                          bleaching: '',
                          dryCleaning: '',
                          drying: '',
                          ironing: '',
                          specialCare: '',
                          stainRemoval: '',
                          storage: '',
                          washing: '',
                          notes: [],
                        },
                        laundryInfo: {
                          accesories: [],
                          activeWear: [],
                          tops: [],
                          bottoms: [],
                          dresses: [],
                          formalWear: [],
                          sleepWear: [],
                          swimWear: [],
                          undergarments: [],
                          Notes: [],
                        },
                        status: ''});
        setDeleteOrder({id:'',
                        customerName:'',
                        employeeID:''});

    }, [formState])

    return (
      <>
          <Employee />
          <h1 className={OrderPageCSS.a}>ORDERS PAGE</h1>
          <div className={OrderPageCSS.OrderPage}>
              <div style={{position: 'fixed',top: '5%', left: '40%', width: '400px', zIndex:'1000'}}>
                  {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
              </div>
              <div className="container">
                  <div className="row pt-5">
                      <img className={"mx-auto d-block " + OrderPageCSS.logo} src={logo} />
                  </div>
                  <div className="row">
                      {formState === 'None' &&
                          <div className="col-md-12">
                              <div className={"row text-center mx-auto " + OrderPageCSS.orderSelection}>
                                  <div className="col-md-6 align-self-center">
                                        <div className={"ps-5 pe-5 p-3 " + OrderPageCSS.table} onClick={goToOrderTable}>VIEW ORDERS TABLE</div>
                                  </div>
                                  <div className="col-md-6 align-self-center">
                                      <div className={"ps-5 pe-5 p-3 " + OrderPageCSS.add_order} onClick={()=>{setFormState('Add')}}>ADD ORDER</div>
                                  </div>
                              </div>
                              <div className="row text-center mx-auto">
                                  <div className="col-md-6 align-self-center">
                                      <div className={"ps-5 pe-5 p-3 " + OrderPageCSS.update_order} onClick={()=>{setFormState('Update')}}>UPDATE ORDER</div>
                                  </div>
                                  <div className="col-md-6 align-self-center">
                                      <div className={"ps-5 pe-5 p-3 " + OrderPageCSS.delete_order} onClick={()=>{setFormState('Delete')}}>DELETE ORDER</div>
                                  </div>
                              </div>
                          </div>
                      }
                      {formState === 'Add' &&
                          <div className="col-md-12">
                              <div className="text-center mt-5 mb-5">
                                  <h1><strong>ADD AN ORDER</strong></h1>
                              </div>
                              <div className="row text-center">
                                  <div className="col-md-6">
                                      <form className="form" onSubmit={orderAdd}>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NAME</label>
                                                      <p><input type="text" id="CustomerName" placeholder="Customer Name" onChange={(e) => setaddOrder({ ...addOrder, customerName: e.target.value })}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NUMBER</label>
                                                      <p><input type="text" id="CustomerNumber" placeholder="Customer Number" onChange={(e) => setaddOrder({ ...addOrder, customerNumber: e.target.value })}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER ADDRESS</label>
                                                      <p><input type="text" id="CustomerAddress" placeholder="Customer Address" onChange={(e) => setaddOrder({ ...addOrder, customerAddress: e.target.value })} /></p>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">INSTRUCTIONS</label>
                                                      <p><input type="text" id="Bleaching" placeholder="Bleaching" onChange={(e) => setaddOrder({ ...addOrder,instructions:{...addOrder.instructions,bleaching: e.target.value} })} />
                                                      <input type="text" id="DryCleaning" placeholder="Dry Cleaning" onChange={(e) => setaddOrder({ ...addOrder, instructions:{...addOrder.instructions,dryCleaning: e.target.value} })}/>
                                                      <input type="text" id="Drying" placeholder="Drying" onChange={(e) => setaddOrder({ ...addOrder, instructions:{...addOrder.instructions,drying: e.target.value} })}/>
                                                      <input type="text" id="Ironing" placeholder="Ironing"onChange={(e) => setaddOrder({ ...addOrder, instructions:{...addOrder.instructions,ironing: e.target.value} })} />
                                                      <input type="text" id="SpecialCare" placeholder="Special Care" onChange={(e) => setaddOrder({ ...addOrder, instructions:{...addOrder.instructions,specialCare: e.target.value} })}/>
                                                      <input type="text" id="StainRemoval" placeholder="Stain Removal" onChange={(e) => setaddOrder({ ...addOrder, instructions:{...addOrder.instructions,stainRemoval: e.target.value} })}/>
                                                      <input type="text" id="Storage" placeholder="Storage"onChange={(e) => setaddOrder({ ...addOrder, instructions:{...addOrder.instructions,storage: e.target.value} })} />
                                                      <input type="text" id="Washing" placeholder="Washing" onChange={(e) => setaddOrder({ ...addOrder, instructions:{...addOrder.instructions,washing: e.target.value} })}/></p>
                                                      <input type="text" id="Notes" placeholder="Notes" onChange={(e) =>setaddOrder({ ...addOrder, instructions: {...addOrder.instructions,notes: [e.target.value]}})}/>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">LAUNDRY INFORMATION</label>
                                                      <p><input type="text" id="Accessories" placeholder="Accessories" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,accesories: [e.target.value]}})}/>
                                                      <input type="text" id="Activewear" placeholder="Activewear" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,activeWear: [e.target.value]}})}/>
                                                      <input type="text" id="Tops" placeholder="Tops" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,tops: [e.target.value]}})}/>
                                                      <input type="text" id="Bottoms" placeholder="Bottoms" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,bottoms: [e.target.value]}})}/>
                                                      <input type="text" id="Dresses" placeholder="Dresses" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,dresses: [e.target.value]}})}/>
                                                      <input type="text" id="Formalwear" placeholder="Formalwear" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,formalWear: [e.target.value]}})}/>
                                                      <input type="text" id="Sleepwear" placeholder="Sleepwear" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,sleepWear: [e.target.value]}})}/>
                                                      <input type="text" id="Swimwear" placeholder="Swimwear" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,swimWear: [e.target.value]}})}/>
                                                      <input type="text" id="Undergarments" placeholder="Undergarments" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,undergarments: [e.target.value]}})}/></p>
                                                      <input type="text" id="Notes" placeholder="Notes" onChange={(e) => setaddOrder({ ...addOrder, laundryInfo: {...addOrder.laundryInfo,Notes: [e.target.value]}})}/>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="form-outline m-5">
                                              {isOrderValid ? 
                                                  <button type="submit" className="btn btn-primary ps-5 pe-5 p-3">ADD</button>
                                              : 
                                                  <button type="button" className="btn btn-danger ps-5 pe-5 p-3" disabled>ADD</button>
                                              }
                                              <button className="btn btn-primary ms-5 ps-5 pe-5 p-3" onClick={()=>{setFormState('None')}}>BACK</button>
                                          </div>
                                      </form>
                                  </div>
                                  <div className="col-md-6">
                                      <img src=''></img>
                                  </div>
                              </div>
                          </div>
                      }
                      {formState === 'Update' &&
                          <div className="col-md-12">
                              <div className="row text-center mt-5 mb-5">
                                  <h1><strong>UPDATE ORDER</strong></h1>
                              </div>
                              <div className="row text-center">
                                  <div className="col-md-6">
                                      <form className="form" onSubmit={orderUpdate}>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NAME</label>
                                                      <p><input type="text" id="CustomerName" placeholder="Customer Name"  onChange={(e) =>setOrderUpdates({ ...OrderUpdates, customerName: e.target.value })}  value={OrderUpdates.customerName}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NUMBER</label>
                                                      <p><input type="text" id="CustomerNumber" placeholder="Customer Number" onChange={(e) =>setOrderUpdates({ ...OrderUpdates, customerNumber: e.target.value })}  disabled={!isEditable}  value={OrderUpdates.customerNumber}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER ADDRESS</label>
                                                      <p><input type="text" id="CustomerAddress" placeholder="Customer Address" onChange={(e) =>setOrderUpdates({ ...OrderUpdates, customerAddress: e.target.value })} disabled={!isEditable}  value={OrderUpdates.customerAddress}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">DATE ORDER</label>
                                                      <p><input type="text" id="DateCreated" placeholder="Date Created" readOnly  value={OrderUpdates.dateCreated!.getTime() > 0 ? OrderUpdates.dateCreated!.toLocaleDateString() : 'Not Available'}/></p>
                                                      <p><input type="text" id="DateCompleted" placeholder="Date Completed" readOnly value={OrderUpdates.dateCompleted!.getTime() > 0 ? OrderUpdates.dateCompleted!.toLocaleDateString() : 'Not Available'} /></p>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">INSTRUCTIONS</label>
                                                      <p><input type="text" id="Bleaching" placeholder="Bleaching"  onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,bleaching: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.bleaching}/>
                                                      <input type="text" id="DryCleaning" placeholder="Dry Cleaning" onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,dryCleaning: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.dryCleaning}/>
                                                      <input type="text" id="Drying" placeholder="Drying"  onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,drying: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.drying}/>
                                                      <input type="text" id="Ironing" placeholder="Ironing" onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,ironing: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.ironing}/>
                                                      <input type="text" id="SpecialCare" placeholder="Special Care"  onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,specialCare: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.specialCare}/>
                                                      <input type="text" id="StainRemoval" placeholder="Stain Removal"  onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,stainRemoval: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.stainRemoval}/>
                                                      <input type="text" id="Storage" placeholder="Storage"  onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,storage: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.storage}/>
                                                      <input type="text" id="Washing" placeholder="Washing"  onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,washing: e.target.value} })} disabled={!isEditable}  value={OrderUpdates.instructions.washing}/></p>
                                                      <input type="text" id="Notes" placeholder="Notes"  onChange={(e) => setOrderUpdates({ ...OrderUpdates,instructions:{...OrderUpdates.instructions,notes: [e.target.value]} })} disabled={!isEditable}  value={OrderUpdates.instructions.notes}/>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">LAUNDRY INFORMATION</label>
                                                      <p><input type="text" id="Accessories" placeholder="Accessories" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,accesories: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.accesories} />
                                                      <input type="text" id="Activewear" placeholder="Activewear"onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,activeWear: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.activeWear}/>
                                                      <input type="text" id="Tops" placeholder="Tops" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,tops: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.tops}/>
                                                      <input type="text" id="Bottoms" placeholder="Bottoms" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,bottoms: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.bottoms}/>
                                                      <input type="text" id="Dresses" placeholder="Dresses" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,dresses: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.dresses}/>
                                                      <input type="text" id="Formalwear" placeholder="Formalwear" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,formalWear: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.formalWear}/>
                                                      <input type="text" id="Sleepwear" placeholder="Sleepwear" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,sleepWear: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.sleepWear}/>
                                                      <input type="text" id="Swimwear" placeholder="Swimwear" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,swimWear: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.swimWear}/>
                                                      <input type="text" id="Undergarments" placeholder="Undergarments" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,undergarments: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.undergarments}/></p>
                                                      <input type="text" id="Notes" placeholder="Notes" onChange={(e) => setOrderUpdates({ ...OrderUpdates, laundryInfo: {...OrderUpdates.laundryInfo,Notes: [e.target.value]}})} disabled={!isEditable}  value={OrderUpdates.laundryInfo.Notes} />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="form-outline m-5">
                                              {isOrderValid ? 
                                                  <button type="submit" className="btn btn-primary ps-5 pe-5 p-3">UPDATE</button>
                                              : 
                                                  <button type="button" className="btn btn-danger ps-5 pe-5 p-3" disabled>UPDATE</button>
                                              }
                                              <button className="btn btn-primary ms-5 ps-5 pe-5 p-3" onClick={()=>{setFormState('None')}}>BACK</button>
                                              
                                          </div>
                                      </form>
                                  </div>
                                  <div className="col-md-6">
                                      <div className="form-outline row mb-5">
                                          <div className="col-md-4">
                                              <label className="form-label">ORDER ID </label>
                                              <input type="text" id="OrderID" placeholder="Order ID" onChange={(e) =>setOrderUpdates({ ...OrderUpdates, id: e.target.value })} value={OrderUpdates.id} readOnly />
                                          </div>
                                          <div className="col-md-4">
                                              <label className="form-label">EMPLOYEE ID</label>
                                              <input type="text" id="EmployeeID" placeholder="Employee ID" onChange={(e) =>setOrderUpdates({ ...OrderUpdates, employeeID: e.target.value })} value ={OrderUpdates.employeeID != null ? OrderUpdates.employeeID: 'not available'} readOnly />
                                          </div>
                                          <div className="col-md-4">
                                              <label className="form-label">STATUS</label>
                                              <input type="text" id="OrderID" placeholder="Status" onChange={(e) =>setOrderUpdates({ ...OrderUpdates, status: e.target.value })} disabled={!isEditable} value={OrderUpdates.status} />
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                    <label>SEARCH ORDER ID</label>
                                    <p><input type="text" id="OrderId" placeholder="Order ID" onChange={(e) => setOrderId(e.target.value)}
                                        onKeyDown={event => {
                                            if (event.key === 'Enter') {
                                              searchOrder('update');
                                            }
                                          }}
                                    /></p>
                                    {updateOrder ? 
                                        <div>
                                            Order Found.
                                        </div>
                                    :
                                        <div>
                                            Order Not Found.
                                        </div>
                                    }
                                  </div>
                                  </div>
                              </div>
                          </div>
                      }
                      {formState === 'Delete' &&
                          <div className="col-md-12">
                              <div className="text-center mt-5 mb-5">
                                    <h1><strong>DELETE ORDER</strong></h1>
                              </div>
                              <div className="row text-center">
                                  <div className="col-md-6">
                                      <form className="form" onSubmit={orderDelete}>
                                          <div className="form-outline row mb-5">
                                              <div className="col-md-4">
                                                  <label className="form-label">ORDER ID</label>
                                                  <input type="text" id="OrderID" placeholder="Order ID" onChange={(e) =>setDeleteOrder({ ...DeleteOrder, id: e.target.value })} value ={DeleteOrder.id} readOnly />
                                              </div>
                                              <div className="col-md-4">
                                                  <label className="form-label">EMPLOYEE ID</label>
                                                  <input type="text" id="EmployeeID" placeholder="Employee ID"onChange={(e) =>setDeleteOrder({ ...DeleteOrder, employeeID: e.target.value })} value={DeleteOrder.employeeID} readOnly />
                                              </div>
                                              <div className="col-md-4">
                                                  <label className="form-label">CUSTOMER NAME</label>
                                                  <input type="text" id="CustomerName" placeholder="Customer Name" onChange={(e) =>setDeleteOrder({ ...DeleteOrder, customerName: e.target.value })} value={DeleteOrder.customerName} readOnly/>
                                              </div>
                                          </div>
                                          <div className="form-outline m-5">
                                              {isOrderValid ? 
                                                  <button type="submit" className="btn btn-primary ps-5 pe-5 p-3">DELETE</button>
                                              : 
                                                  <button type="button" className="btn btn-danger ps-5 pe-5 p-3" disabled>DELETE</button>
                                              }
                                              <button className="btn btn-primary ms-5 ps-5 pe-5 p-3" onClick={()=>{setFormState('None')}}>BACK</button>
                                          </div>
                                      </form>
                                  </div>
                                  <div className="col-md-6">
                                    <label>SEARCH ORDER ID</label>
                                    <p><input type="text" id="OrderId" placeholder="Order ID" onChange={(e) => setOrderId(e.target.value)}
                                        onKeyDown={event => {
                                            if (event.key === 'Enter') {
                                              searchOrder('delete');
                                            }
                                          }}
                                    /></p>
                                    {deleteOrder ? 
                                        <div>
                                            Order Found.
                                        </div>
                                    :
                                        <div>
                                            Order Not Found.
                                        </div>
                                    }
                                  </div>
                              </div>
                          </div>
                      }
                  </div>
              </div>
          </div>
      </>
    )
}

export default OrderPage