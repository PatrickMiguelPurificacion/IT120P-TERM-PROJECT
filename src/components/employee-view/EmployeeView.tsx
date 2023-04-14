import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import EmployeeViewCSS from './EmployeeView.module.css'
import Employee from '../employee/Employee';
import { UserAuth } from '../../context/AuthContext';
import { StorageAuth } from '../../context/StorageContext';

const Empview = () => {

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error.');
  const [successMessage, setSuccessMessage] = useState('Success.');

  const [isFileValid, setIsFileValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const {currentEmployee, updateUser} = UserAuth();
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
        return setErrorMessage("File must be an image that is less than 5MB.");
  
      }

      setEmployeeUpdate({ ...employeeUpdate, profilePicture: newFile });

    }

  }

  const isValidFirstName = (firstName: string) =>{
   
    const firstNamePattern = /^[a-zA-Z]+$/;

    if(firstName.length < 4){

        return false;

    }

    return firstNamePattern.test(firstName);
    
}

const isValidLastName = (lastName: string) =>{
   
    const lastNamePattern = /^[a-zA-Z]+$/;

    if(lastName.length < 4){

        return false;

    }

    return lastNamePattern.test(lastName);
    
}

  const isValidEmail = (email: string) =>{
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
    
  }

  const isValidGender = (gender: string) =>{
   
    const validGenders = ["male", "female", "other"];
    return validGenders.includes(gender.toLowerCase());
    
  }

  const isValidPassword = (password: string) =>{
   
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
    return passwordPattern.test(password);
    
  }

  const isValidContact = (contact: string) =>{
   
    const contactPattern = /^[0-9]{10}$/;
    return contactPattern.test(contact);
    
  }

  const isValidAddress = (address: string) =>{
   
    const addressPattern = /^[a-zA-Z0-9\s,-]+$/;
    return addressPattern.test(address);
    
  }

  const isValidManagerID = (managerID: number) =>{
   
    const managerIDPattern = /^[0-9]+$/;
    return managerIDPattern.test(managerID.toString());
    
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

        // Validate first name
        if (!firstName || firstName === '' || firstName === null || firstName === undefined || !isValidFirstName(firstName)) {
          return setErrorMessage('Please enter a valid first name (at least 4 characters)');
        }

        // Validate last name
        if (!lastName || lastName === '' || lastName === null || lastName === undefined || !isValidLastName(lastName)) {
          return setErrorMessage('Please enter a valid last name (at least 4 characters)');
        }

        // Validate email
        if (!email || email === '' || email === null || email === undefined || !isValidEmail(email)) {
          return setErrorMessage('Please enter a valid email address');
        }

        // Validate gender
        if (!gender || gender === 'Select Gender' || gender === null || gender === undefined || !isValidGender(gender)) {
          return setErrorMessage('Please select a valid gender');
        }

        // Validate password
        if (password && password === '' || password === null || password === undefined || !isValidPassword(password)) {
          return setErrorMessage('Please enter a valid password (at least 8 characters, 1 digit, 1 lowercase, 1 uppercase, 1 special character, and no whitespace)');
        }

        // Validate contact
        if (!contact || contact === '' || contact === null || contact === undefined || !isValidContact(contact)) {
          return setErrorMessage('Please enter a valid contact number');
        }

        // Validate address
        if (!address || address=== '' || address === null || address === undefined || !isValidAddress(address)) {
          return setErrorMessage('Please enter a valid address');
        }

        // Validate manager ID
        if (!managerID || managerID < 0 || managerID === null || managerID === undefined || !isValidManagerID(managerID)) {
          return setErrorMessage('Please enter a valid manager ID');
        }

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
                      <input type="text" inputMode='numeric' pattern="[0-9]+" id="ManagerID" name="ManagerID" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, managerID: parseInt(e.target.value) })} defaultValue={currentEmployee ? currentEmployee!.managerID : ''} />
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
                      <input className ={EmployeeViewCSS.f} type="text" inputMode='numeric' pattern="[0-9]+" id="Contact" name="Contact Number:" onChange={(e) => setEmployeeUpdate({ ...employeeUpdate, contact: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.contact : ''} />
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