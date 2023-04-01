import React from 'react'
import './StockPage.css'

const StockPage = () => {

  return (
    <div className='StockDisplay'>
      <h1 className = "a">ITEM STOCK PAGE</h1>
      <br /><br />
      <br /><br />
      
      <img src="src\components\ItemStockDisplay\FabricFinesse.png"></img>
          <form className='g'>
            <br />
            <label>ITEM ID:</label>
            <input type="text" id="Item Brand" name="Item Brand" />
            <br />
            <br />
            <label>ITEM BRAND:</label>
            <input type="text" id="Item Brand" name="Item Brand" />
            <br />
            <br />
            <label>QUANTITY:</label>
            <input type="number" id="Quantity" name="Quantity" />
            <br />
            <br />
          </form>

          <table>
          <tr>
            <td><input type="submit" value="EDIT" /></td>
            <td><input type="submit" value="DISPLAY" /></td>
          </tr>
          </table>
          <br />
        </div>
  )
}

export default StockPage