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
    const {order, allOrders, addOrders, updateOrders, deleteOrders, getOrder, getOrders}=OrderAuth();
    const {currentEmployee} = UserAuth();
    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [formState, setFormState] = useState('None');
    const [isOrderValid, setIsOrderValid] = useState(false);
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
    const [updateOrder, setUpdateOrder]= useState<{
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
        dateCreated: null,
        dateCompleted: null,
        employeeID: null,
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
    const [deleteOrder,setDeleteOrder]= useState<{
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
            status} = updateOrder;

            await updateOrders(id,customerName,customerNumber,customerAddress,dateCreated as Date,dateCompleted as Date,employeeID,updateOrder.instructions,updateOrder.laundryInfo,status).then(() =>{

                setRefreshCounter(prevCounter => prevCounter + 1);
                getOrder(id,customerName,employeeID);
                return setAlertMessage({type: 'success', message: 'User Updated Successfully.', show: true});
  
            }).catch((error)=>{
                
                return setAlertMessage({type: 'error', message: error.message, show: true});
  
            });


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
            } = deleteOrder;
            
            await deleteOrders(id,customerName,employeeID).then(() =>{

                setRefreshCounter(prevCounter => prevCounter + 1);
                getOrder(id,customerName,employeeID);
                return setAlertMessage({type: 'success', message: 'User Deleted Successfully.', show: true});
  
            }).catch((error)=>{
                
                return setAlertMessage({type: 'error', message: error.message, show: true});
  
            });

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const searchOrder: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{
            getOrder(order!.id, order!.customerName,order!.employeeID).then(()=>{

                setRefreshCounter(prevCounter => prevCounter + 1);
                return setAlertMessage({type: 'success', message: 'Order Found Successfully.', show: true});
    
            }).catch((error: { message: any })=>{
    
                return setAlertMessage({type: 'error', message: error.message, show: true});
    
            });

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }



    useEffect(() =>{

        if (addOrder.customerName && addOrder.customerAddress && addOrder.customerNumber && addOrder.instructions.bleaching && addOrder.instructions.dryCleaning && addOrder.instructions.drying && addOrder.instructions.ironing && addOrder.instructions.specialCare && addOrder.instructions.stainRemoval && addOrder.instructions.storage && addOrder.instructions.washing && addOrder.instructions.notes  && addOrder.laundryInfo.accesories && addOrder.laundryInfo.activeWear && addOrder.laundryInfo.tops && addOrder.laundryInfo.bottoms && addOrder.laundryInfo.dresses && addOrder.laundryInfo.formalWear && addOrder.laundryInfo.sleepWear && addOrder.laundryInfo.swimWear && addOrder.laundryInfo.undergarments && addOrder.laundryInfo.Notes)
        {
            setIsOrderValid(true);
        }
        
        
      },[addOrder])
      
      useEffect(() =>{

        if (updateOrder.id && updateOrder.customerName && updateOrder.employeeID)
        {
            setIsOrderValid(true);
        }
        
        
      },[updateOrder])


      useEffect(() =>{

        if (deleteOrder.id && deleteOrder.customerName && deleteOrder.employeeID)
        {
            setIsOrderValid(true);
        }
        
        
      },[deleteOrder])

    useEffect(()=>{
        
      if(alertMessage.show){
          setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
      }

    },[alertMessage.message]);

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
                                                      <p><input type="text" id="CustomerName" placeholder="Customer Name"  onChange={(e) =>setUpdateOrder({ ...updateOrder, customerName: e.target.value })}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NUMBER</label>
                                                      <p><input type="text" id="CustomerNumber" placeholder="Customer Number" onChange={(e) =>setUpdateOrder({ ...updateOrder, customerName: e.target.value })}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER ADDRESS</label>
                                                      <p><input type="text" id="CustomerAddress" placeholder="Customer Address" onChange={(e) =>setUpdateOrder({ ...updateOrder, customerName: e.target.value })}/></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">DATE ORDER</label>
                                                      <p><input type="text" id="DateCreated" placeholder="Date Created" readOnly /></p>
                                                      <p><input type="text" id="DateCompleted" placeholder="Date Completed" readOnly /></p>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">INSTRUCTIONS</label>
                                                      <p><input type="text" id="Bleaching" placeholder="Bleaching"  onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,bleaching: e.target.value} })}/>
                                                      <input type="text" id="DryCleaning" placeholder="Dry Cleaning" onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,dryCleaning: e.target.value} })} />
                                                      <input type="text" id="Drying" placeholder="Drying"  onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,drying: e.target.value} })}/>
                                                      <input type="text" id="Ironing" placeholder="Ironing" onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,ironing: e.target.value} })} />
                                                      <input type="text" id="SpecialCare" placeholder="Special Care"  onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,specialCare: e.target.value} })}/>
                                                      <input type="text" id="StainRemoval" placeholder="Stain Removal"  onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,stainRemoval: e.target.value} })}/>
                                                      <input type="text" id="Storage" placeholder="Storage"  onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,storage: e.target.value} })}/>
                                                      <input type="text" id="Washing" placeholder="Washing"  onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,washing: e.target.value} })}/></p>
                                                      <input type="text" id="Notes" placeholder="Notes"  onChange={(e) => setUpdateOrder({ ...updateOrder,instructions:{...updateOrder.instructions,notes: [e.target.value]} })}/>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">LAUNDRY INFORMATION</label>
                                                      <p><input type="text" id="Accessories" placeholder="Accessories" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,accesories: [e.target.value]}})} />
                                                      <input type="text" id="Activewear" placeholder="Activewear"onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,activeWear: [e.target.value]}})} />
                                                      <input type="text" id="Tops" placeholder="Tops" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,tops: [e.target.value]}})}/>
                                                      <input type="text" id="Bottoms" placeholder="Bottoms" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,bottoms: [e.target.value]}})}/>
                                                      <input type="text" id="Dresses" placeholder="Dresses" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,dresses: [e.target.value]}})}/>
                                                      <input type="text" id="Formalwear" placeholder="Formalwear" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,formalWear: [e.target.value]}})}/>
                                                      <input type="text" id="Sleepwear" placeholder="Sleepwear" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,sleepWear: [e.target.value]}})}/>
                                                      <input type="text" id="Swimwear" placeholder="Swimwear" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,swimWear: [e.target.value]}})}/>
                                                      <input type="text" id="Undergarments" placeholder="Undergarments" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,undergarments: [e.target.value]}})}/></p>
                                                      <input type="text" id="Notes" placeholder="Notes" onChange={(e) => setUpdateOrder({ ...updateOrder, laundryInfo: {...updateOrder.laundryInfo,Notes: [e.target.value]}})} />
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
                                              <input type="text" id="OrderID" placeholder="Order ID" onChange={(e) =>setUpdateOrder({ ...updateOrder, id: e.target.value })} />
                                          </div>
                                          <div className="col-md-4">
                                              <label className="form-label">EMPLOYEE ID</label>
                                              <input type="text" id="EmployeeID" placeholder="Employee ID" onChange={(e) =>setUpdateOrder({ ...updateOrder, employeeID: e.target.value })} />
                                          </div>
                                          <div className="col-md-4">
                                              <label className="form-label">STATUS</label>
                                              <input type="text" id="OrderID" placeholder="Status" onChange={(e) =>setUpdateOrder({ ...updateOrder, status: e.target.value })}/>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-12">
                                              Test
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      }
                      {formState === 'Delete' &&
                          <div className="col-md-12">
                              <div className="text-center mt-5 mb-5">
                                    <h1><strong>DELETE ITEM</strong></h1>
                              </div>
                              <div className="row text-center">
                                  <div className="col-md-6">
                                      <form className="form" onSubmit={orderDelete}>
                                          <div className="form-outline row mb-5">
                                              <div className="col-md-4">
                                                  <label className="form-label">ORDER ID</label>
                                                  <input type="text" id="OrderID" placeholder="Order ID" onChange={(e) =>setDeleteOrder({ ...deleteOrder, id: e.target.value })}/>
                                              </div>
                                              <div className="col-md-4">
                                                  <label className="form-label">EMPLOYEE ID</label>
                                                  <input type="text" id="EmployeeID" placeholder="Employee ID"onChange={(e) =>setDeleteOrder({ ...deleteOrder, employeeID: e.target.value })} />
                                              </div>
                                              <div className="col-md-4">
                                                  <label className="form-label">CUSTOMER NAME</label>
                                                  <input type="text" id="CustomerName" placeholder="Customer Name" onChange={(e) =>setDeleteOrder({ ...deleteOrder, customerName: e.target.value })}/>
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
                                      Test
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