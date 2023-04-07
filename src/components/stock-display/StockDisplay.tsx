import React from 'react'
import StockDisplayCSS from './StockDisplay.module.css'
import Employee from '../employee/Employee'
import logo from '../../assets/stock-display/FabricFinesse.png';

const StockDisplay = () => {
  return (
    <div className={StockDisplayCSS.StockDisplay}>
      <Employee />
      <h1 className = {StockDisplayCSS.a}>ITEM STOCK DISPLAY PAGE</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <img src={logo}></img>
      <table className={StockDisplayCSS.displayTable}>
        <br></br>
        <tr>
          <th>Item</th>
          <th>Stocks</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>1</td>
          <td>99</td>
          <td><p className={StockDisplayCSS.full}>Full</p></td>
        </tr>
        <tr>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
        </tr>
        <tr>
          <td>2</td>
          <td>0</td>
          <td><p className={StockDisplayCSS.empty}>Empty</p></td>
        </tr>
        <tr>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
        </tr>
        <tr>
          <td>3</td>
          <td>99</td>
          <td><p className={StockDisplayCSS.full}>Full</p></td>
        </tr>
        <tr>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
        </tr>
        <tr>
          <td>4</td>
          <td>99</td>
          <td><p className={StockDisplayCSS.full}>Full</p></td>
        </tr>
        <tr>
        <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
        </tr>
        <tr>
          <td>5</td>
          <td>0</td>
          <td><p className={StockDisplayCSS.empty}>Empty</p></td>
        </tr>
        <tr>
        <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
          <td className = {StockDisplayCSS.emptyRow}></td>
        </tr>
        <tr>
          <td>6</td>
          <td>0</td>
          <td><p className={StockDisplayCSS.empty}>Empty</p></td>
        </tr>
      </table>
      <br></br>
      <br></br>
    </div>
  )
}

export default StockDisplay