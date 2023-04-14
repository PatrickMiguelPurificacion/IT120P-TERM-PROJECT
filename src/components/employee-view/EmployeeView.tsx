import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import EmployeeViewCSS from './EmployeeView.module.css'
import Employee from '../employee/Employee';
import { UserAuth } from '../../context/AuthContext';
import { StorageAuth } from '../../context/SotrageContext';

const Empview = () => {

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error.');
  const [successMessage, setSuccessMessage] = useState('Success.');

  const {currentEmployee, updateUser} = UserAuth();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFileValid, setIsFileValid] = useState(true);
  const [employeeUpdate, setEmployeeUpdate] = useState<{
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
    contact: string;
    address: string;
    role: string;
    managerID: number;
    profilePicture: File | string | null;
  }>({
    uuid: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: 'Select Gender',
    password: '',
    contact: '',
    address: '',
    role: '',
    managerID: -1,
    profilePicture: null
  })

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.files && e.target.files.length > 0) {

      const file = e.target.files[0];
      const newFile: File = new File([file], file.name, { lastModified: file.lastModified });

      if(file.type.startsWith('image/') && file.size < (5 * 1024 * 1024)){

        setIsFileValid(true);
  
      }else{
  
        setIsFileValid(false);
  
      }

      setEmployeeUpdate({ ...employeeUpdate, profilePicture: newFile });

    }

  }

  const updateEmployee: FormEventHandler<HTMLFormElement> = async (e) => {
    
    e.preventDefault();
    setErrorMessage('');
    try {
      const {
        uuid,
        firstName,
        lastName,
        email,
        gender,
        password,
        contact,
        address,
        role,
        managerID,
        profilePicture
      } = employeeUpdate;

      if (profilePicture !== null) {
        
        await updateUser(currentEmployee!.uuid, firstName, lastName, email, gender, password, contact, address, role, managerID, profilePicture as File)

      } else {
        
        await updateUser(currentEmployee!.uuid, firstName, lastName, email, gender, password, contact, address, role, managerID, new File([new Blob(undefined)], ''))

      }

    }catch(e: unknown){
        
        if(e instanceof Error){
            setErrorMessage(e.message);
        }

    }

  }

  useEffect(()=>{

    if(employeeUpdate.password.length > 5){

      setIsPasswordValid(true);

    }else{

      setIsPasswordValid(false);

    }

  },[employeeUpdate.password])

  useEffect(()=>{

    if(currentEmployee){

        setEmployeeUpdate({
            uuid: currentEmployee ? currentEmployee.uuid : '',
            firstName: currentEmployee ? currentEmployee.firstName : '',
            lastName: currentEmployee ? currentEmployee.lastName : '',
            email: currentEmployee ? currentEmployee.email : '',
            gender: currentEmployee ? currentEmployee.gender : 'Select Gender',
            password: '',
            contact: currentEmployee ? currentEmployee.contact : '',
            address: currentEmployee ? currentEmployee.address : '',
            role: currentEmployee ? currentEmployee.role : '',
            managerID: currentEmployee ? currentEmployee.managerID : -1,
            profilePicture: null
        });

    }

  },[currentEmployee])

  return (
    <>
      <div className={EmployeeViewCSS.Empview}>
        <Employee />
        <h1 className={EmployeeViewCSS.a}>EDIT EMPLOYEE INFORMATION PAGE</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-5 mb-5">
              {currentEmployee ?
                <img src={currentEmployee!.profilePicture} alt="Profile Picture" width="250" height="250"></img>
              :
                <img src='../src/assets/default-profile-picture.webp' alt="Profile Picture" width="250" height="250"></img>
              }
            </div>
          </div>
          <div className="row">           
            <form onSubmit={updateEmployee}>
              <div className="col-md-12 text-center">
                <label htmlFor="ProfilePhoto">Profile Photo: <input type="file" accept="image/*" onChange={onFileSelected} /></label> 
                <label htmlFor="EmployeeID">Employee ID: <p>{currentEmployee ? currentEmployee!.uuid : ''}</p></label>
              </div>
              <div className="row mb-5">
                <div className="col-md-6 text-light pt-5 text-center">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="FirstName">First Name:</label>
                      <input type="text" id="FirstName" name="Name" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, firstName: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.firstName : ''} />
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="LastName">Last Name:</label>
                      <input type="text" id="LastName" name="Name" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, lastName: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.lastName : ''} />
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Email">Email:</label>
                      <input type="text" id="Email" name="Email" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, email: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.email : ''} />
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="ManagerID">Manager ID:</label>
                      <input type="text" id="ManagerID" name="ManagerID" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, managerID: parseInt(e.target.value) })} defaultValue={currentEmployee ? currentEmployee!.managerID : ''} />
                    </div>
                </div>
                <div className="col-md-6 text-light pt-5">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Role">Role:</label>
                      <input className ={EmployeeViewCSS.f} type="text" id="Role" name="Role:" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, role: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.role : ''} />
                    </div>
                    <div className="form-outline">
                    <label className="form-label" htmlFor="Gender">Gender:</label>
                      <select className ={EmployeeViewCSS.f} id="Gender" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, gender: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.gender : ''}>
                          <option value="default" disabled>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Contact">Contact Number:</label>
                      <input className ={EmployeeViewCSS.f} type="text" id="Contact" name="Contact Number:" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, contact: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.contact : ''} />
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Address">Address:</label>
                      <input className={EmployeeViewCSS.f} type="text" id="Address" name="Address:" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, address: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.address : ''} />
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Password">Password:</label>
                      <input type="password" id="Password" name="Password" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, password: e.target.value })} defaultValue='' />
                    </div>
                    <div className="form-outline mt-3">
                      {isPasswordValid && isFileValid ? <input type="submit" className="btn btn-primary" value="Update" /> : <input type="submit" className="btn btn-danger" value="Update" disabled />}
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default Empview;