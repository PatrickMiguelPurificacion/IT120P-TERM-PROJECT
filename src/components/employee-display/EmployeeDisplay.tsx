import React from 'react'
import Employee from '../employee/Employee'
import EmployeeDisplayCSS from './EmployeeDisplay.module.css'
import { UserAuth } from '../../context/UserContext'

const Empdisplay = () => {

  const {currentEmployee} = UserAuth();

  return (
    <>
    <Employee />
    <h1 className={EmployeeDisplayCSS.a}>EMPLOYEE INFORMATION VIEW PAGE</h1>
      <div className={EmployeeDisplayCSS.Empdisplay}>
        <div className="container">
            <div className="row text-center">
              <div><img src={currentEmployee && currentEmployee!.profilePicture !== '' ? currentEmployee!.profilePicture : '../src/assets/default-profile-picture.webp'} className={EmployeeDisplayCSS.profile_picture} alt="Profile Picture" /></div>
            </div>
            <div className="row text-center">
              <div className="col-md-6">
                <div>
                  <h5>Employee ID</h5>
                  <p><input className ={EmployeeDisplayCSS.c} type="text" id="Employee ID" name="Employee ID" readOnly defaultValue={currentEmployee ? currentEmployee!.uuid : ''} /></p>
                </div>
                <div>
                  <h5>Name</h5>
                  <p><input className ={EmployeeDisplayCSS.c} type="text" id="Name" name="Name" readOnly defaultValue={currentEmployee ? currentEmployee!.firstName + " " + currentEmployee!.lastName : ''} /></p>
                </div>
                <div>
                  <h5>Email</h5>
                  <p><input className ={EmployeeDisplayCSS.c} type="text" id="Email" name="Email" readOnly defaultValue={currentEmployee ? currentEmployee!.email : ''} /></p>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <h5>Role</h5>
                  <p><input className ={EmployeeDisplayCSS.f} type="text" id="Role:" name="Role:" readOnly defaultValue={currentEmployee ? currentEmployee!.role : ''} /></p>
                </div>
                <div>
                  <h5>Contact Number</h5>
                  <p><input className ={EmployeeDisplayCSS.f} type="text" id="Contact Number:" name="Contact Number:" readOnly defaultValue={currentEmployee ? currentEmployee!.contact : ''} /></p>
                </div>
                <div>
                  <h5>Address</h5>
                  <p><input className ={EmployeeDisplayCSS.f} type="text" id="Address:" name="Address:" readOnly defaultValue={currentEmployee ? currentEmployee!.address : ''} /></p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Empdisplay