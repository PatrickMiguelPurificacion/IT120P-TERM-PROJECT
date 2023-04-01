import React from 'react'
import './OrderPage.css'
const OrderPage = () => {
  return (
    <div className='OrderPage'>
      <h1 className='a'>EMPLOYEE INFORMATION PAGE</h1>
      <br></br>
      <h2 className='b'>FABRICFINESSE</h2>
      <br></br>
       <br></br>
      <div className='form-container'>
        <div className='form-wrapper'>
          <form className='d'>
            <label htmlFor="fname">ORDER ID:</label>
            <input className ='c' type="text" id="Employee ID" name="Employee ID" />
            <br />
            <br />
            <label htmlFor="fname">TYPES OF SERVICE:</label>
            <input className ='c' type="text" id="Name" name="Name" />
            <br />
            <br />
            <label htmlFor="fname">QUANTITY:</label>
            <input className ='c' type="text" id="Email" name="Email" />
            <br />
            <br />
            <input type="submit" value="CREATE" />
          </form>
        </div>
        <div className='form-wrapper'>
          <form className='g'>
            <label htmlFor="fname">TYPE OF CLOTHING:</label>
            <input className ='f' type="text" id="Role:" name="Role:" />
            <br />
            <br />
            <label htmlFor="fname">CONTACT NUMBER:</label>
            <input className ='f' type="text" id="Contact Number:" name="Contact Number:" />
            <br />
            <br />
            <label htmlFor="fname">PICKUP ADDRESS</label>
            <input className ='f' type="text" id="Address:" name="Address:" />
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