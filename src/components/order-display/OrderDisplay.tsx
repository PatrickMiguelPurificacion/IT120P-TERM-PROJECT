import React from 'react'
import OrderDisplayCSS from './OrderDisplay.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/order-display/FabricFinesse.png'

const OrderDisplay = () => {
  return (
    <div className={OrderDisplayCSS.OrderDisplay}>
      <Employee/>
      <h1 className={OrderDisplayCSS.a}>ORDERS DISPLAY PAGE</h1>
      <br></br>
      <br></br>
      <br></br>
      <div className={OrderDisplayCSS.logo}>
        <img src={logo} />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <table>
      <tr>
          <td></td>
          <td></td>
          <td></td>
      </tr>
        <tr>
          <th>ORDER ID</th>
          <th>CUSTOMER NAME</th>
          <th>STATUS</th>
        </tr>
        <tr>
          <td>1</td>
          <td>BRAD</td>
          <td> <p className={OrderDisplayCSS.done}>DONE</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2</td>
          <td>EMILY</td>
          <td><p className={OrderDisplayCSS.pending}>PENDING</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td>AARON</td>
          <td> <p className={OrderDisplayCSS.done}>DONE</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td>JOSH</td>
          <td><p className={OrderDisplayCSS.pending}>PENDING</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>5</td>
          <td>JEREMEY</td>
          <td> <p className={OrderDisplayCSS.done}>DONE</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>6</td>
          <td>PAT</td>
          <td><p className={OrderDisplayCSS.pending}>PENDING</p></td>
        </tr>
      </table>
      
    </div>
  )
}

export default OrderDisplay