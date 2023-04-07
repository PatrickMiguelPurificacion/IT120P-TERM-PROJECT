import React from 'react'
import OrderPageCSS from './OrderPage.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/order-page/FabricFinesse.png'

const OrderPage = () => {
  return (
    <div className={OrderPageCSS.OrderPage}>
      <Employee />
      <h1 className={OrderPageCSS.a}>ORDERS PAGE</h1>
      <br></br>
      <div className={OrderPageCSS.logo}>
        <img src={logo} />
      </div>
      <br></br>
       <br></br>
      <div className={OrderPageCSS.form_container}>
        <div className={OrderPageCSS.form_wrapper}>
          <form className={OrderPageCSS.d}>
            <label htmlFor="fname">ORDER ID:</label>
            <input className={OrderPageCSS.c} type="text" id="Employee ID" name="Employee ID" />
            <br />
            <br />
            <label htmlFor="fname">TYPES OF SERVICE:</label>
            <input className={OrderPageCSS.c} type="text" id="Name" name="Name" />
            <br />
            <br />
            <label htmlFor="fname">QUANTITY:</label>
            <input className={OrderPageCSS.c}  type="text" id="Email" name="Email" />
            <br />
            <br />
            <input type="submit" value="CREATE" />
          </form>
        </div>
        <div className={OrderPageCSS.form_wrapper}>
          <form className={OrderPageCSS.g}>
            <label htmlFor="fname">TYPE OF CLOTHING:</label>
            <input className ={OrderPageCSS.f} type="text" id="Role:" name="Role:" />
            <br />
            <br />
            <label htmlFor="fname">CONTACT NUMBER:</label>
            <input className ={OrderPageCSS.f} type="text" id="Contact Number:" name="Contact Number:" />
            <br />
            <br />
            <label htmlFor="fname">PICKUP ADDRESS</label>
            <input className ={OrderPageCSS.f} type="text" id="Address:" name="Address:" />
            <br />
            <br />
            <input type="submit" value="DISPLAY" />
          </form>
        </div>
      </div>
      </div>
  )
}

export default OrderPage