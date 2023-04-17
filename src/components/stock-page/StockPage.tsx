import React from 'react'
import StockPageCSS from './StockPage.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/stock-page/FabricFinesse.png';
import { Link, useNavigate } from 'react-router-dom';

const StockPage = () => {

  return (
    <div className={StockPageCSS.StockDisplay}>
      <Employee/>
      <h1 className = {StockPageCSS.a}>ITEM STOCK PAGE</h1>
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
        <input type="text" inputMode='numeric' id="Quantity" name="Quantity" />
        <br />
        <br />
      </form>
      <table className={StockPageCSS.h}>
        <tr>
          <td><button type="button" className="btn btn-primary">UPDATE</button></td>
          <td><Link to="/dashboard/stock-display" onClick={window.location.reload}><button type="button" className="btn btn-primary">DISPLAY</button></Link></td>
        </tr>
      </table>
    </div>
  )
}

export default StockPage