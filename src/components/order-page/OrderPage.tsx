import React, { FormEventHandler, useEffect, useState } from 'react'
import OrderPageCSS from './OrderPage.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/order-page/FabricFinesse.png'
import { useNavigate } from 'react-router-dom'
import Alert from '../alerts/Alerts'

const OrderPage = () => {

    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [formState, setFormState] = useState('None');
    const [isOrderValid, setIsOrderValid] = useState(false);
    const navigate = useNavigate();

    const goToOrderTable = () =>{

        navigate("/dashboard/order-display");

    }

    const addOrder: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const updateOrder: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const deleteOrder: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

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
                                      <form className="form" onSubmit={addOrder}>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NAME</label>
                                                      <p><input type="text" id="CustomerName" placeholder="Customer Name" /></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NUMBER</label>
                                                      <p><input type="text" id="CustomerNumber" placeholder="Customer Number" /></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER ADDRESS</label>
                                                      <p><input type="text" id="CustomerAddress" placeholder="Customer Address" /></p>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">INSTRUCTIONS</label>
                                                      <p><input type="text" id="Bleaching" placeholder="Bleaching" />
                                                      <input type="text" id="DryCleaning" placeholder="Dry Cleaning" />
                                                      <input type="text" id="Drying" placeholder="Drying" />
                                                      <input type="text" id="Ironing" placeholder="Ironing" />
                                                      <input type="text" id="SpecialCare" placeholder="Special Care" />
                                                      <input type="text" id="StainRemoval" placeholder="Stain Removal" />
                                                      <input type="text" id="Storage" placeholder="Storage" />
                                                      <input type="text" id="Washing" placeholder="Washing" /></p>
                                                      <input type="text" id="Notes" placeholder="Notes" />
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">LAUNDRY INFORMATION</label>
                                                      <p><input type="text" id="Accessories" placeholder="Accessories" />
                                                      <input type="text" id="Activewear" placeholder="Activewear" />
                                                      <input type="text" id="Tops" placeholder="Tops" />
                                                      <input type="text" id="Bottoms" placeholder="Bottoms" />
                                                      <input type="text" id="Dresses" placeholder="Dresses" />
                                                      <input type="text" id="Formalwear" placeholder="Formalwear" />
                                                      <input type="text" id="Sleepwear" placeholder="Sleepwear" />
                                                      <input type="text" id="Swimwear" placeholder="Swimwear" />
                                                      <input type="text" id="Undergarments" placeholder="Undergarments" /></p>
                                                      <input type="text" id="Notes" placeholder="Notes" />
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
                                      Test
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
                                      <form className="form" onSubmit={updateOrder}>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NAME</label>
                                                      <p><input type="text" id="CustomerName" placeholder="Customer Name" /></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER NUMBER</label>
                                                      <p><input type="text" id="CustomerNumber" placeholder="Customer Number" /></p>
                                                  </div>
                                                  <div className="form-outline">
                                                      <label className="form-label">CUSTOMER ADDRESS</label>
                                                      <p><input type="text" id="CustomerAddress" placeholder="Customer Address" /></p>
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
                                                      <p><input type="text" id="Bleaching" placeholder="Bleaching" />
                                                      <input type="text" id="DryCleaning" placeholder="Dry Cleaning" />
                                                      <input type="text" id="Drying" placeholder="Drying" />
                                                      <input type="text" id="Ironing" placeholder="Ironing" />
                                                      <input type="text" id="SpecialCare" placeholder="Special Care" />
                                                      <input type="text" id="StainRemoval" placeholder="Stain Removal" />
                                                      <input type="text" id="Storage" placeholder="Storage" />
                                                      <input type="text" id="Washing" placeholder="Washing" /></p>
                                                      <input type="text" id="Notes" placeholder="Notes" />
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="form-outline">
                                                      <label className="form-label">LAUNDRY INFORMATION</label>
                                                      <p><input type="text" id="Accessories" placeholder="Accessories" />
                                                      <input type="text" id="Activewear" placeholder="Activewear" />
                                                      <input type="text" id="Tops" placeholder="Tops" />
                                                      <input type="text" id="Bottoms" placeholder="Bottoms" />
                                                      <input type="text" id="Dresses" placeholder="Dresses" />
                                                      <input type="text" id="Formalwear" placeholder="Formalwear" />
                                                      <input type="text" id="Sleepwear" placeholder="Sleepwear" />
                                                      <input type="text" id="Swimwear" placeholder="Swimwear" />
                                                      <input type="text" id="Undergarments" placeholder="Undergarments" /></p>
                                                      <input type="text" id="Notes" placeholder="Notes" />
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
                                              <label className="form-label">ORDER ID</label>
                                              <input type="text" id="OrderID" placeholder="Order ID" />
                                          </div>
                                          <div className="col-md-4">
                                              <label className="form-label">EMPLOYEE ID</label>
                                              <input type="text" id="EmployeeID" placeholder="Employee ID" />
                                          </div>
                                          <div className="col-md-4">
                                              <label className="form-label">STATUS</label>
                                              <input type="text" id="OrderID" placeholder="Status" />
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
                                      <form className="form" onSubmit={deleteOrder}>
                                          <div className="form-outline row mb-5">
                                              <div className="col-md-4">
                                                  <label className="form-label">ORDER ID</label>
                                                  <input type="text" id="OrderID" placeholder="Order ID" />
                                              </div>
                                              <div className="col-md-4">
                                                  <label className="form-label">EMPLOYEE ID</label>
                                                  <input type="text" id="EmployeeID" placeholder="Employee ID" />
                                              </div>
                                              <div className="col-md-4">
                                                  <label className="form-label">CUSTOMER NAME</label>
                                                  <input type="text" id="CustomerName" placeholder="Customer Name" />
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