import React from 'react'
import StockPageCSS from './StockPage.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/stock-page/FabricFinesse.png';

const StockPage = () => {

  return (
    <div className={StockPageCSS.StockDisplay}>
      <Employee/>
      <h1 className = {StockPageCSS.a}>ITEM STOCK PAGE</h1>
      <br /><br />
      <br /><br />
      
      <img src={logo}></img>
          <form className={StockPageCSS.g}>
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

          <table className={StockPageCSS.h}>
          <tr>
            <td><input type="submit" className={StockPageCSS.i} value="EDIT" /></td>
            <td><input type="submit" className={StockPageCSS.i} value="DISPLAY" /></td>
          </tr>
          </table>
          <br />
        </div>
  )
}

export default StockPage