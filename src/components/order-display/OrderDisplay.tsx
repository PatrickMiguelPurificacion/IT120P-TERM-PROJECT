import React, { useCallback, useEffect, useState } from 'react'
import OrderDisplayCSS from './OrderDisplay.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/order-display/FabricFinesse.png'
import ReactPaginate from 'react-paginate'
import Alert from '../alerts/Alerts'
import { OrderAuth } from '../../context/OrderContext'
import { UserAuth } from '../../context/UserContext'

const OrderDisplay = () => {
  
    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const {getOrders, allOrders} = OrderAuth();
    const {currentEmployee} = UserAuth();
    const [currentOrders, setCurrentOrders] = useState([{
        id: "",
        customerName: "",
        employeeId: "",
        status:"",
    }]);

    const handlePageClick = (event: { selected: number; }) => {
      
      const newOffset = event.selected * 5 % allOrders!.length;
      setItemOffset(newOffset);

    }

    useEffect(()=>{

        if(currentEmployee){
            getOrders();
        }

    },[currentEmployee]);
    
    useEffect(()=>{

      if(alertMessage.show){
          setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
      }

    },[alertMessage.message]);

    useEffect(() => {

        if(allOrders){

            const endOffset = itemOffset + 5;
            setCurrentOrders(allOrders!.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(allOrders!.length / 5));

        }

    }, [allOrders, itemOffset, 5]);

    return (
      <>
        <Employee />
        <h1 className = {OrderDisplayCSS.a}>ORDERS DISPLAY PAGE</h1>
        <div className={OrderDisplayCSS.OrderDisplay}  key={refreshCounter}>
            <div style={{position: 'fixed',top: '5%', left: '40%', width: '400px', zIndex:'1000'}}>
                {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
            </div>
            <div className="container">
                <div className="row pt-5">
                    <img className={"mx-auto d-block " + OrderDisplayCSS.logo} src={logo} />
                </div>
                <div className="row mt-5">
                    {allOrders ?
                        <>
                            <table className="table table-light table-bordered table-responsive">
                                <thead>
                                    <tr>
                                      <th>Order Id</th>
                                      <th>Customer Name</th>
                                      <th>Employee ID</th>
                                      <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((item, index) =>{
                                        return(
                                          <tr key={index}>
                                              <td>{item.id}</td>
                                              <td>{item.customerName}</td>
                                              <td>{item.employeeId}</td>
                                              <td>{item.status}</td>
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
                              <h1>There are currently no orders at the moment.</h1>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
      </>
    )
}

export default OrderDisplay