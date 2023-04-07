import React from 'react'
import Employee from '../employee/Employee'
import EmployeeDisplayCSS from './EmployeeDisplay.module.css'

const Empdisplay = () => {
  return (
    <>
      <div className={EmployeeDisplayCSS.Empdisplay}>
      <Employee />
          <h1 className={EmployeeDisplayCSS.a}>EMPLOYEE INFORMATION VIEW PAGE</h1>
        <br></br>
        <br></br>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Prof Pic" width="250" height="250"></img>
        <div className={EmployeeDisplayCSS.form_container}>
          <div className={EmployeeDisplayCSS.form_wrapper}>
            <form className={EmployeeDisplayCSS.d}>
              <label htmlFor="EmpID">Employee ID:</label>
              <input className ={EmployeeDisplayCSS.c} type="text" id="Employee ID" name="Employee ID" />
              <br />
              <br />
              <label htmlFor="name">Name:</label>
              <input className ={EmployeeDisplayCSS.c} type="text" id="Name" name="Name" />
              <br />
              <br />
              <label htmlFor="email">Email:</label>
              <input className ={EmployeeDisplayCSS.c} type="text" id="Email" name="Email" />
              <br />
              <br />
            </form>
          </div>
          <div className={EmployeeDisplayCSS.form_wrapper}>
            <form className={EmployeeDisplayCSS.g}>
              <label htmlFor="role">Role:</label>
              <input className ={EmployeeDisplayCSS.f} type="text" id="Role:" name="Role:" />
              <br />
              <br />
              <label htmlFor="contact-num">Contact Number:</label>
              <input className ={EmployeeDisplayCSS.f} type="text" id="Contact Number:" name="Contact Number:" />
              <br />
              <br />
              <label htmlFor="address">Address:</label>
              <input className ={EmployeeDisplayCSS.f} type="text" id="Address:" name="Address:" />
              <br />
              <br />
            </form>
          </div>
        </div>
        <div className={EmployeeDisplayCSS.button_container}>
          <button>Edit</button>
        </div>
      </div>
    </>
  )
}

export default Empdisplay