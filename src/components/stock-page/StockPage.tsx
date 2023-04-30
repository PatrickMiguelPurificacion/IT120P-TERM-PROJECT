import { FormEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/stock-page/FabricFinesse.png';
import { InventoryAuth } from '../../context/InventoryContext';
import Alert from '../alerts/Alerts';
import Employee from '../employee/Employee';
import StockPageCSS from './StockPage.module.css';

const StockPage = () => {

    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [formState, setFormState] = useState('None');
    const [isItemValid, setIsItemValid] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [itemId, setItemId] = useState('');

    const navigate = useNavigate();
    const {updateItem, deleteItem, addItems, updateItems, deleteItems, getItem}= InventoryAuth ();
    const [ItemsAdd, setaddItem] = useState<{
        name: string;
        brand: string[];
        code: string[];
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        purpose: string[];
      }>({
        name: '',
        brand: [],
        code: [],
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        purpose: [],
      });
      
      //declaring for items update
      const [ItemsUpdate, setItemsUpdate] = useState<{
        id: string;
        name: string;
        brand: string[];
        code: string[];
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        purpose: string[];
      }>({
        id: '',
        name: '',
        brand: [],
        code: [],
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        purpose: [],
      });

      // delete items
      const [itemsDelete, setItemsDelete] = useState<{
        id: string;
        name: string;
        brand: string[];
        code: string[];
      }>({
        id: '',
        name: '',
        brand: [],
        code: [],
        
      });
    const goToInvTable = () =>{

        navigate("/dashboard/stock-display");

    }
    
    const addItem: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});
      
        try{
            const {
      
                name,
                brand,
                code,
                quantity,
                unitPrice,
                purpose,
              } = ItemsAdd;
      
              await addItems( name, brand,code, quantity,unitPrice,purpose ).then(()=>{
      
                setRefreshCounter(prevCounter => prevCounter + 1);
                setaddItem({name:'', brand:[], code:[], quantity:0, unitPrice:0, totalPrice:0,purpose:[]});
                setIsEditable(false);
                setIsItemValid(false);
                return setAlertMessage({type: 'success', message: 'Item Added Successfully.', show: true});
      
            }).catch((error)=>{
      
                return setAlertMessage({type: 'error', message: error.message, show: true});
      
            });
        }catch(e: unknown){
      
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }
      
        }
    }
    
    const searchItem = async (type: string) =>{

        try{

            setAlertMessage({type: '', message: '', show: false});

            await getItem(itemId, type).then(()=>{

                setIsEditable(true);
                setRefreshCounter(prevCounter => prevCounter + 1);
                return setAlertMessage({type: 'success', message: 'Item Found.', show: true});

            });
            
        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }


    const itemUpdate: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});
       
        try{
            const {
                id,
                name,
                brand,
                code,
                quantity,
                unitPrice,
                totalPrice,
                purpose,
              } = ItemsUpdate;
              await updateItems(id,name,brand,code,quantity,unitPrice,totalPrice,purpose)
              .then(()=>{
                  if(updateItem){
                    setItemsUpdate(updateItem);
                  }
                  setRefreshCounter(prevCounter => prevCounter + 1);
                  return setAlertMessage({type: 'success', message: 'Item Updated Successfully.', show: true});
              })
        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }

        }

    }

    const itemDelete: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try{
            const {
                id,
                name,
                brand,
                code,
              } = itemsDelete;
              await deleteItems(id,name,brand,code).then(()=>{

                setRefreshCounter(prevCounter => prevCounter + 1);
                setItemsDelete({id:'',name:'',code:[],brand:[]});
                setIsEditable(false);
                setIsItemValid(false);
                return setAlertMessage({type: 'success', message: 'Item Deleted Successfully.', show: true});

            })
      }catch(e: unknown){
          
          if(e instanceof Error){
              return setAlertMessage({type: 'error', message: e.message, show: true});
          }

      }

    }

    useEffect(() =>{

        if (ItemsAdd.name && ItemsAdd.brand && ItemsAdd.code && ItemsAdd.quantity && ItemsAdd.unitPrice && ItemsAdd.purpose)
        {
            setIsItemValid(true);
        }

    },[ItemsAdd])

    useEffect(()=>{

      if(alertMessage.show){
          setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
      }

    },[alertMessage.message]);
    
    useEffect(() =>{

    if (ItemsUpdate.name && ItemsUpdate.brand && ItemsUpdate.code && ItemsUpdate.id && ItemsUpdate.quantity && ItemsUpdate.unitPrice && ItemsUpdate.totalPrice)
    {
        setIsItemValid(true);
    }
    
    },[ItemsUpdate])

    useEffect(()=>{

    if(alertMessage.show){
        setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
    }

    },[alertMessage.message]);
    
    useEffect(() =>{

        if (itemsDelete.id && itemsDelete.name && itemsDelete.brand && itemsDelete.code)
        {
            setIsItemValid(true);

        }
        
    },[itemsDelete])

    useEffect(() => {
        
        if (updateItem !== null) {
          
            setItemsUpdate(updateItem);

        }

    }, [updateItem]);

    useEffect(() => {
        
        if (deleteItem !== null) {
          
            setItemsDelete(deleteItem);

        }

    }, [deleteItem]);

    useEffect(() =>{

        setIsEditable(false);
        setIsItemValid(false);
        setaddItem({name:'', brand:[], code:[], quantity:0, unitPrice:0, totalPrice:0,purpose:[]});
        setItemsUpdate({id:'',name:'',code:[],brand:[],quantity:0,totalPrice:0,unitPrice:0,purpose:[]});
        setItemsDelete({id:'',name:'',code:[],brand:[]});

    }, [formState])

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
                                <div className="col-sm-6 col-md-12">
                                    <form className="form" onSubmit={addItem}>
                                        <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM NAME</label>
                                                  <p><input type="text" id="ItemName" placeholder="Item Name" onChange={(e) => setaddItem({ ...ItemsAdd, name: e.target.value })}/></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM BRAND</label>
                                                  <p><input type="text" id="ItemBrand" placeholder="Item Brand" onChange={(e) => setaddItem({ ...ItemsAdd, brand: [e.target.value] })}/> </p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM CODE</label>
                                                  <p><input type="text" id="ItemCode" placeholder="Item Code" onChange={(e) => setaddItem({ ...ItemsAdd, code: [e.target.value] })}/></p>
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">QUANTITY</label>
                                                  <p><input type="text" inputMode='numeric' id="Quantity" placeholder="Quantity" onChange={(e) => setaddItem({ ...ItemsAdd, quantity: parseInt(e.target.value) })}/></p>

                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">UNIT PRICE</label>
                                                  <p><input type="text" inputMode='numeric' id="ItemUnitPrice" placeholder="Unit Price" onChange={(e) => setaddItem({ ...ItemsAdd, unitPrice: parseInt(e.target.value) })}/></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">PURPOSE</label>
                                                  <p><input type="text" id="Purpose" placeholder="Item Purpose" onChange={(e) => setaddItem({ ...ItemsAdd, purpose: [e.target.value] })}/></p>
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
                                      <form className="form" onSubmit={itemUpdate}>
                                          <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM ID</label>
                                                    <p><input type="text" id="ItemId" placeholder="Item ID" onChange={(e) => setItemsUpdate({ ...ItemsUpdate, id: e.target.value })} value={ItemsUpdate.id} readOnly /></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM NAME</label>
                                                    <p><input type="text" id="ItemName" placeholder="Item Name" onChange={(e) => setItemsUpdate({ ...ItemsUpdate, name: (e.target.value) })} disabled={!isEditable} value={ItemsUpdate.name}/></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM BRAND</label>
                                                    <p><input type="text" id="ItemBrand" placeholder="Item Brand" onChange={(e) => setItemsUpdate({ ...ItemsUpdate, brand: [e.target.value] })} disabled={!isEditable} value={ItemsUpdate.brand}/> </p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">ITEM CODE</label>
                                                    <p><input type="text" id="ItemCode" placeholder="Item Code" onChange={(e) => setItemsUpdate({ ...ItemsUpdate, code: [e.target.value] })} disabled={!isEditable} value={ItemsUpdate.code}/></p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-outline">
                                                    <label className="form-label">QUANTITY</label>
                                                    <p><input type="text" inputMode='numeric' id="Quantity" placeholder="Quantity" onChange={(e) => setItemsUpdate({ ...ItemsUpdate, quantity: Number(e.target.value) })} disabled={!isEditable} value={ItemsUpdate.quantity}/></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">UNIT PRICE</label>
                                                    <p><input type="text" inputMode='numeric' id="ItemUnitPrice" placeholder="Unit Price"  onChange={(e) => setItemsUpdate({ ...ItemsUpdate, unitPrice: Number(e.target.value) })} disabled={!isEditable} value={ItemsUpdate.unitPrice}/></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">TOTAL PRICE</label>
                                                    <p><input type="text" inputMode='numeric' id="ItemTotalPrice" placeholder="Total Price"  onChange={(e) => setItemsUpdate({ ...ItemsUpdate, totalPrice: parseFloat(e.target.value) })} readOnly value={ItemsUpdate.totalPrice}/></p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label">PURPOSE</label>
                                                    <p><input type="text" id="Purpose" placeholder="Item Purpose" onChange={(e) => setItemsUpdate({ ...ItemsUpdate, purpose: [e.target.value] })} disabled={!isEditable} value={ItemsUpdate.purpose}/></p>
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
                                    <label>SEARCH ITEM ID</label>
                                    <p><input type="text" id="ItemId" placeholder="Item ID" onChange={(e) => setItemId(e.target.value)}
                                        onKeyDown={event => {
                                            if (event.key === 'Enter') {
                                              searchItem('update');
                                            }
                                          }}
                                    /></p>
                                    {updateItem ? 
                                        <div>
                                            Item Found.
                                        </div>
                                    :
                                        <div>
                                            Item Not Found.
                                        </div>
                                    }
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
                                    <form className="form" onSubmit={itemDelete}>
                                        <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM ID</label>
                                                  <p><input type="text" id="ItemId" placeholder="Item ID" onChange={(e) => setItemsDelete({ ...itemsDelete, id: e.target.value })} value={itemsDelete.id} readOnly/></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM NAME</label>
                                                  <p><input type="text" id="ItemName" placeholder="Item Name" onChange={(e) => setItemsDelete({ ...itemsDelete, name: e.target.value })} value={itemsDelete.name} readOnly/></p>
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM BRAND</label>
                                                  <p><input type="text" id="ItemBrand" placeholder="Item Brand"onChange={(e) => setItemsDelete({ ...itemsDelete, brand: [e.target.value] })} value={itemsDelete.brand} readOnly/></p>
                                              </div>
                                              <div className="form-outline">
                                                  <label className="form-label">ITEM CODE</label>
                                                  <p><input type="text" id="ItemCode" placeholder="Item Code"onChange={(e) => setItemsDelete({ ...itemsDelete,code: [e.target.value] })} value={itemsDelete.code} readOnly/></p>
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
                                    <label>SEARCH ITEM ID</label>
                                    <p><input type="text" id="ItemId" placeholder="Item ID" onChange={(e) => setItemId(e.target.value)}
                                        onKeyDown={event => {
                                            if (event.key === 'Enter') {
                                              searchItem('delete');
                                            }
                                          }}
                                    /></p>
                                    {deleteItem ? 
                                        <div>
                                            Item Found.
                                        </div>
                                    :
                                        <div>
                                            Item Not Found.
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
export default StockPage