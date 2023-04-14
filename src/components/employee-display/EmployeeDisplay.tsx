import React from 'react'
import Employee from '../employee/Employee'
import EmployeeDisplayCSS from './EmployeeDisplay.module.css'
import { UserAuth } from '../../context/AuthContext'

const Empdisplay = () => {

  const {currentEmployee} = UserAuth();

  return (
    <>
      <div className={EmployeeDisplayCSS.Empdisplay}>
      <Employee />
          <h1 className={EmployeeDisplayCSS.a}>EMPLOYEE INFORMATION VIEW PAGE</h1>
        <br></br>
        <br></br>
        <img src={currentEmployee && currentEmployee!.profilePicture !== '' ? currentEmployee!.profilePicture : '../src/assets/default-profile-picture.webp'} alt="Prof Pic" width="250" height="250"></img>
        <div className={EmployeeDisplayCSS.form_container}>
          <div className={EmployeeDisplayCSS.form_wrapper}>
            <form className={EmployeeDisplayCSS.d}>
              <label htmlFor="EmpID">Employee ID:</label>
              <input className ={EmployeeDisplayCSS.c} type="text" id="Employee ID" name="Employee ID" readOnly defaultValue={currentEmployee ? currentEmployee!.uuid : ''} />
              <br />
              <br />
              <label htmlFor="name">Name:</label>
              <input className ={EmployeeDisplayCSS.c} type="text" id="Name" name="Name" readOnly defaultValue={currentEmployee ? currentEmployee!.firstName + " " + currentEmployee!.lastName : ''} />
              <br />
              <br />
              <label htmlFor="email">Email:</label>
              <input className ={EmployeeDisplayCSS.c} type="text" id="Email" name="Email" readOnly defaultValue={currentEmployee ? currentEmployee!.email : ''} />
              <br />
              <br />
            </form>
          </div>
          <div className={EmployeeDisplayCSS.form_wrapper}>
            <form className={EmployeeDisplayCSS.g}>
              <label htmlFor="role">Role:</label>
              <input className ={EmployeeDisplayCSS.f} type="text" id="Role:" name="Role:" readOnly defaultValue={currentEmployee ? currentEmployee!.role : ''} />
              <br />
              <br />
              <label htmlFor="contact-num">Contact Number:</label>
              <input className ={EmployeeDisplayCSS.f} type="text" id="Contact Number:" name="Contact Number:" readOnly defaultValue={currentEmployee ? currentEmployee!.contact : ''} />
              <br />
              <br />
              <label htmlFor="address">Address:</label>
              <input className ={EmployeeDisplayCSS.f} type="text" id="Address:" name="Address:" readOnly defaultValue={currentEmployee ? currentEmployee!.address : ''} />
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Empdisplay