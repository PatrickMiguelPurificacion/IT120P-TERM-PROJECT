import React, { FormEventHandler, useEffect, useState } from 'react'
import StockPageCSS from './StockPage.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/stock-page/FabricFinesse.png';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../alerts/Alerts';

const StockPage = () => {

    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [formState, setFormState] = useState('None');
    const [isItemValid, setIsItemValid] = useState(false);
    const navigate = useNavigate();

    const goToInvTable = () =>{

        navigate("/dashboard/stock-display");

    }

    const addItem: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const updateItem: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const deleteItem: FormEventHandler<HTMLFormElement> = async (e) => {

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
        <Employee/>
        <h1 className = {StockPageCSS.a}>ITEM STOCK PAGE</h1>
        <div className={StockPageCSS.StockDisplay} key={refreshCounter}>
            <div style={{position: 'fixed',top: '5%', left: '40%', width: '400px', zIndex:'1000'}}>
                {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
            </div>
            <div className="container">
                <div className="row pt-5">
                    <img className={"mx-auto d-block " + StockPageCSS.logo} src={logo} />
                </div>
                <div className="row">
                    {formState === 'None' &&
                        <div className="col-md-12">
                            <div className={"row text-center mx-auto " + StockPageCSS.itemSelection}>
                                <div className="col-md-6 align-self-center">
                                      <div className={"ps-5 pe-5 p-3 " + StockPageCSS.inventory} onClick={goToInvTable}>VIEW INVENTORY</div>
                                </div>
                                <div className="col-md-6 align-self-center">
                                    <div className={"ps-5 pe-5 p-3 " + StockPageCSS.add_item} onClick={()=>{setFormState('Add')}}>ADD ITEM</div>
                                </div>
                            </div>
                            <div className="row text-center mx-auto">
                                <div className="col-md-6 align-self-center">
                                    <div className={"ps-5 pe-5 p-3 " + StockPageCSS.update_item} onClick={()=>{setFormState('Update')}}>UPDATE ITEM</div>
                                </div>
                                <div className="col-md-6 align-self-center">
                                    <div className={"ps-5 pe-5 p-3 " + StockPageCSS.delete_item} onClick={()=>{setFormState('Delete')}}>DELETE ITEM</div>
                                </div>
                            </div>
                        </div>
                    }
                    {formState === 'Add' &&
                        <div className="col-md-12">
                            <div className="text-center mt-5 mb-5">
                                <h1><strong>ADD AN ITEM</strong></h1>
                            </div>
                            <div className="row text-center">
                                <div className="col-md-6">
                                    <form className="form" onSubmit={addItem}>
                                        <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM NAME</label>
                                                  <p><input type="text" id="ItemName" placeholder="Item Name" /></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM BRAND</label>
                                                  <p><input type="text" id="ItemBrand" placeholder="Item Brand" /></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM CODE</label>
                                                  <p><input type="text" id="ItemCode" placeholder="Item Code" /></p>
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">QUANTITY</label>
                                                  <p><input type="text" inputMode='numeric' id="Quantity" placeholder="Quantity" /></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">UNIT PRICE</label>
                                                  <p><input type="text" inputMode='numeric' id="ItemUnitPrice" placeholder="Unit Price" /></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">PURPOSE</label>
                                                  <p><input type="text" id="Purpose" placeholder="Item Purpose" /></p>
                                              </div>
                                          </div>
                                        </div>
                                        <div className="form-outline m-5">
                                            {isItemValid ? 
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
                                  <h1><strong>UPDATE ITEM</strong></h1>
                              </div>
                              <div className="row text-center">
                                  <div className="col-md-6">
                                      <form className="form" onSubmit={updateItem}>
                                          <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM ID</label>
                                                    <p><input type="text" id="ItemId" placeholder="Item ID" /></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM NAME</label>
                                                    <p><input type="text" id="ItemName" placeholder="Item Name" /></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM BRAND</label>
                                                    <p><input type="text" id="ItemBrand" placeholder="Item Brand" /></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM CODE</label>
                                                    <p><input type="text" id="ItemCode" placeholder="Item Code" /></p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-outline">
                                                    <label className="form-label">QUANTITY</label>
                                                    <p><input type="text" inputMode='numeric' id="Quantity" placeholder="Quantity" /></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">UNIT PRICE</label>
                                                    <p><input type="text" inputMode='numeric' id="ItemUnitPrice" placeholder="Unit Price" /></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">TOTAL PRICE</label>
                                                    <p><input type="text" inputMode='numeric' id="ItemTotalPrice" placeholder="Total Price" /></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">PURPOSE</label>
                                                    <p><input type="text" id="Purpose" placeholder="Item Purpose" /></p>
                                                </div>
                                            </div>
                                          </div>
                                          <div className="form-outline m-5">
                                              {isItemValid ? 
                                                  <button type="submit" className="btn btn-primary ps-5 pe-5 p-3">UPDATE</button>
                                              : 
                                                  <button type="button" className="btn btn-danger ps-5 pe-5 p-3" disabled>UPDATE</button>
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
                    {formState === 'Delete' &&
                        <div className="col-md-12">
                            <div className="text-center mt-5 mb-5">
                                  <h1><strong>DELETE ITEM</strong></h1>
                            </div>
                            <div className="row text-center">
                                <div className="col-md-6">
                                    <form className="form" onSubmit={deleteItem}>
                                        <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM ID</label>
                                                  <p><input type="text" id="ItemId" placeholder="Item ID" /></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM NAME</label>
                                                  <p><input type="text" id="ItemName" placeholder="Item Name" /></p>
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM BRAND</label>
                                                  <p><input type="text" id="ItemBrand" placeholder="Item Brand" /></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM CODE</label>
                                                  <p><input type="text" id="ItemCode" placeholder="Item Code" /></p>
                                              </div>
                                          </div>
                                        </div>
                                        <div className="form-outline m-5">
                                            {isItemValid ? 
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

export default StockPage