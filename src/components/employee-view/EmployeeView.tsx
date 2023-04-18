import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import EmployeeViewCSS from './EmployeeView.module.css'
import Employee from '../employee/Employee';
import { UserAuth } from '../../context/UserContext';
import { StorageAuth } from '../../context/StorageContext';
import Alert from '../alerts/Alerts';
import FormValidator from '../../scripts/formValidator';

const Empview = () => {

  const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
  const [refreshCounter, setRefreshCounter] = useState(0);

  const [isFileValid, setIsFileValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [newPassword, setNewPassword]= useState('');

  const {currentEmployee, updateEmployee, getEmployee, updateUser, updateUserPassword} = UserAuth();
  const formValidator = new FormValidator();
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
        return setAlertMessage({type: 'error', message: 'File must be an image that is less than 5MB.', show: true});
  
      }

      setEmployeeUpdate({ ...employeeUpdate, profilePicture: newFile });

    }

  }

  const updateEmployeeInfo: FormEventHandler<HTMLFormElement> = async (e) => {
    
    e.preventDefault();
    setAlertMessage({type: '', message: '', show: false});

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

        // Validate first name
        if (!firstName || firstName === '' || firstName === null || firstName === undefined || !formValidator.isValidFirstName(firstName)) {
            return setAlertMessage({type: 'error', message: 'Please enter a valid first name (at least 4 characters)', show: true});
        }

        // Validate last name
        if (!lastName || lastName === '' || lastName === null || lastName === undefined || !formValidator.isValidLastName(lastName)) {
            return setAlertMessage({type: 'error', message: 'Please enter a valid last name (at least 4 characters)', show: true});
        }

        // Validate email
        if (!email || email === '' || email === null || email === undefined || !formValidator.isValidEmail(email)) {
            return setAlertMessage({type: 'error', message: 'Please enter a valid email address', show: true});
        }

        // Validate gender
        if (!gender || gender === 'Select Gender' || gender === null || gender === undefined || !formValidator.isValidGender(gender)) {
            return setAlertMessage({type: 'error', message: 'Please select a valid gender', show: true});
        }

        // Validate password
        if (password && password === '' || password === null || password === undefined || !formValidator.isValidPassword(password)) {
            return setAlertMessage({type: 'error', message: 'Please enter a valid password (at least 8 characters, 1 digit, 1 lowercase, 1 uppercase, 1 special character, and no whitespace)', show: true});
        }

        // Validate contact
        if (!contact || contact === '' || contact === null || contact === undefined || !formValidator.isValidContact(contact)) {
            return setAlertMessage({type: 'error', message: 'Please enter a valid contact number', show: true});
        }

        // Validate address
        if (!address || address=== '' || address === null || address === undefined || !formValidator.isValidAddress(address)) {
            return setAlertMessage({type: 'error', message: 'Please enter a valid address', show: true});
        }

        // Validate manager ID
        if (!managerID || managerID < 0 || managerID === null || managerID === undefined || !formValidator.isValidManagerID(managerID)) {
            return setAlertMessage({type: 'error', message: 'Please enter a valid manager ID', show: true});
        }

        if (profilePicture !== null) {
          
          await updateUser(currentEmployee!.uuid, firstName, lastName, email, gender, password, contact, address, role, managerID, profilePicture as File).then(() =>{

              setRefreshCounter(prevCounter => prevCounter + 1);
              getEmployee(uuid);
              return setAlertMessage({type: 'success', message: 'User Updated Successfully.', show: true});

          }).catch((error)=>{

              return setAlertMessage({type: 'error', message: error.message, show: true});

          });

        } else {
          
          await updateUser(currentEmployee!.uuid, firstName, lastName, email, gender, password, contact, address, role, managerID, new File([new Blob(undefined)], '')).then(() =>{

              setRefreshCounter(prevCounter => prevCounter + 1);
              getEmployee(uuid);
              return setAlertMessage({type: 'success', message: 'User Updated Successfully.', show: true});

          }).catch((error)=>{
              
              return setAlertMessage({type: 'error', message: error.message, show: true});

          });

        }

        if(newPassword && formValidator.isValidPassword(newPassword)){

          await updateUserPassword(email, password, newPassword).then(()=>{
            
              setRefreshCounter(prevCounter => prevCounter + 1);
              getEmployee(uuid);
              return setAlertMessage({type: 'success', message: 'Password Changed Successfully. Use the new password to update your profile!', show: true});

          }).catch((error)=>{

              return setAlertMessage({type: 'error', message: error.message, show: true});

          });

        }

    }catch(e: unknown){
        
        if(e instanceof Error){
            return setAlertMessage({type: 'error', message: e.message, show: true});
        }

    }

  }

  useEffect(()=>{

    if(employeeUpdate.password.length > 7){

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

  },[currentEmployee, updateEmployee])

  useEffect(()=>{

      if(alertMessage.show){
          setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
      }

  },[alertMessage.message]);

  return (
    <>
    <Employee />
      <h1 className={EmployeeViewCSS.a}>EDIT EMPLOYEE INFORMATION PAGE</h1>
      <div className={EmployeeViewCSS.Empview} key={refreshCounter}>
        <div style={{position: 'fixed',top: '5%', left: '40%', width: '400px', zIndex:'1000'}}>
            {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-5 mb-3">
              {currentEmployee && currentEmployee!.profilePicture !== '' ?
                <img src={currentEmployee!.profilePicture} alt="Profile Picture" width="250" height="250"></img>
              :
                <img src='../src/assets/default-profile-picture.webp' alt="Profile Picture" width="250" height="250"></img>
              }
            </div>
          </div>
          <div className="row">           
            <form className="form" onSubmit={updateEmployeeInfo}>
              <div className="col-md-12 text-center mt-5">
                <label htmlFor="ProfilePhoto" className="pe-5">Profile Photo <p><input type="file" accept="image/*" onChange={onFileSelected} /></p></label> 
                <label htmlFor="EmployeeID" className="ps-5">Employee ID <p>{currentEmployee ? currentEmployee!.uuid : ''}</p></label>
              </div>
              <div className="row mb-5">
                <div className="col-md-6 text-light pt-3 text-center">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="FirstName">First Name</label>
                      <p><input type="text" className={EmployeeViewCSS.f} id="FirstName" name="Name" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, firstName: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.firstName : ''} /></p>
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="LastName">Last Name</label>
                      <p><input type="text" className={EmployeeViewCSS.f} id="LastName" name="Name" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, lastName: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.lastName : ''} /></p>
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Email">Email</label>
                      <p><input type="text" className={EmployeeViewCSS.f} id="Email" name="Email" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, email: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.email : ''} /></p>
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="ManagerID">Manager ID</label>
                      <p><input type="text" className={EmployeeViewCSS.f} inputMode='numeric' pattern="[0-9]+" id="ManagerID" name="ManagerID" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, managerID: parseInt(e.target.value) })} defaultValue={currentEmployee ? currentEmployee!.managerID : ''} /></p>
                    </div>
                </div>
                <div className="col-md-6 text-light pt-3 text-center">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Role">Role</label>
                      <p><input className={EmployeeViewCSS.f} type="text" id="Role" name="Role:" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, role: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.role : ''} /></p>
                    </div>
                    <div className="form-outline">
                    <label className="form-label" htmlFor="Gender">Gender</label>
                      <p>
                        <select className ={EmployeeViewCSS.f} id="Gender" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, gender: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.gender : ''}>
                            <option value="default" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                      </p>
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Contact">Contact Number</label>
                      <p><input className ={EmployeeViewCSS.f} type="text" inputMode='numeric' pattern="[0-9]+" id="Contact" name="Contact Number:" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, contact: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.contact : ''} /></p>
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Address">Address</label>
                      <p><input className={EmployeeViewCSS.f} type="text" id="Address" name="Address:" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, address: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.address : ''} /></p>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Password">Password</label>
                      <p><input type="password" id="Password" name="Password" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, password: e.target.value })} defaultValue='' /></p>
                    </div>
                    <div className="form-outline">
                      <label className="form-label" htmlFor="Password">New Password</label>
                      <p><input type="password" id="NewPassword" name="NewPassword" onChange={(e) => setNewPassword(e.target.value)} placeholder="Change Password" defaultValue='' /></p>
                    </div>
                    <div className="form-outline mt-5">
                      {isPasswordValid && isFileValid ? <button type="submit" className="btn btn-primary">Update</button> : <button type="submit" className="btn btn-danger" value="Update" disabled>Update</button>}
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