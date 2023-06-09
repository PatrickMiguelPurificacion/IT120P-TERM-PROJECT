import React, { ChangeEvent, useEffect, useState } from 'react'
import StockDisplayCSS from './StockDisplay.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/stock-display/FabricFinesse.png';
import Alert from '../alerts/Alerts';
import { InventoryAuth } from '../../context/InventoryContext';
import ReactPaginate from 'react-paginate';
import { UserAuth } from '../../context/UserContext';

const StockDisplay = () => {

    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const {getItems, allItems} = InventoryAuth();
    const {currentEmployee} = UserAuth();
    const [currentItems, setCurrentItems] = useState([{
          id: "",
          name: '',
          brand: [''],
          code: [''],
          quantity: 0,
          unitPrice: 0,
          totalPrice: 0,
          purpose: [''],
    }]);

    const handlePageClick = (event: { selected: number; }) => {
      
      const newOffset = event.selected * 5 % allItems!.length;
      setItemOffset(newOffset);

    }

    useEffect(()=>{

        if(isLoaded){
            getItems();
        }

    },[isLoaded]);

    useEffect(()=>{

        setCurrentItems([]);
        setRefreshCounter(prevCounter => prevCounter + 1);
        setIsLoaded(true);

    },[]);

    useEffect(()=>{

      if(alertMessage.show){
          setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
      }

    },[alertMessage.message]);

    useEffect(() => {

        if(allItems){

            const endOffset = itemOffset + 5;
            setCurrentItems(allItems!.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(allItems!.length / 5));

        }
    }, [allItems, itemOffset, 5]);

    return (
      <>
        <Employee />
        <h1 className = {StockDisplayCSS.a}>ITEM STOCKS DISPLAY PAGE</h1>
        <div className={StockDisplayCSS.StockDisplay}  key={refreshCounter}>
            <div style={{position: 'fixed',top: '5%', left: '40%', width: '400px', zIndex:'1000'}}>
                {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
            </div>
            <div className="container">
                <div className="row pt-5">
                    <img className={"mx-auto d-block " + StockDisplayCSS.logo} src={logo} />
                </div>
                <div className="row mt-5">
                    {allItems ?
                        <>
                            <table className="table table-light table-bordered table-responsive">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Code</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total Price</th>
                                        <th>Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) =>{
                                        return(
                                          <tr key={index}>
                                              <td>{item.id}</td>
                                              <td>{item.name}</td>
                                              <td>{item.brand}</td>
                                              <td>{item.code}</td>
                                              <td>{item.quantity}</td>
                                              <td>{item.unitPrice}</td>
                                              <td>{item.totalPrice}</td>
                                              <td>{item.purpose}</td>
                                          </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <ReactPaginate
                              nextLabel="next >"
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={3}
                              marginPagesDisplayed={2}
                              pageCount={pageCount}
                              previousLabel="< previous"
                              pageClassName="page-item"
                              pageLinkClassName="page-link"
                              previousClassName="page-item"
                              previousLinkClassName="page-link"
                              nextClassName="page-item"
                              nextLinkClassName="page-link"
                              breakLabel="..."
                              breakClassName="page-item"
                              breakLinkClassName="page-link"
                              containerClassName="pagination"
                              activeClassName="active"
                              renderOnZeroPageCount={null}
                            />
                        </>
                    :
                        <>
                            <div className="text-light text-center">
                              <h1>Loading Items...</h1>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
      </>
    )
}

export default StockDisplay