import React from 'react'
import './StockDisplay.css'

const StockDisplay = () => {
  return (
    <div className='StockDisplay'>
      <h1 className = "a">ITEM STOCK DISPLAY PAGE</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <img src="src\components\ItemStockDisplay\FabricFinesse.png"></img>
      <table className="displayTable">
        <br></br>
        <tr>
          <th>Item</th>
          <th>Stocks</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>1</td>
          <td>99</td>
          <td><p className='full'>Full</p></td>
        </tr>
        <tr>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
        </tr>
        <tr>
          <td>2</td>
          <td>0</td>
          <td><p className='empty'>Empty</p></td>
        </tr>
        <tr>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
        </tr>
        <tr>
          <td>3</td>
          <td>99</td>
          <td><p className='full'>Full</p></td>
        </tr>
        <tr>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
        </tr>
        <tr>
          <td>4</td>
          <td>99</td>
          <td><p className='full'>Full</p></td>
        </tr>
        <tr>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
        </tr>
        <tr>
          <td>5</td>
          <td>0</td>
          <td><p className='empty'>Empty</p></td>
        </tr>
        <tr>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
          <td className = "emptyRow"></td>
        </tr>
        <tr>
          <td>6</td>
          <td>0</td>
          <td><p className='empty'>Empty</p></td>
        </tr>
      </table>
      <br></br>
      <br></br>
    </div>
  )
}

export default StockDisplay