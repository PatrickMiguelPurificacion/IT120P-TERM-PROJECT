import React from 'react'
import'./OrderDisplay.css'
const OrderDisplay = () => {
  return (
    <div className='OrderDisplay'>
      <h1 className='a'>ORDERS DISPLAY PAGE</h1>
      <br></br>
      <br></br>
      <br></br>
      <h2 className='b'>FABRIC FINESSE</h2>
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
          <td> <p className='done'>DONE</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2</td>
          <td>EMILY</td>
          <td><p className='pending'>PENDING</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td>AARON</td>
          <td> <p className='done'>DONE</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td>JOSH</td>
          <td><p className='pending'>PENDING</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>5</td>
          <td>JEREMEY</td>
          <td> <p className='done'>DONE</p></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>6</td>
          <td>PAT</td>
          <td><p className='pending'>PENDING</p></td>
        </tr>
      </table>
      
    </div>
  )
}

export default OrderDisplay