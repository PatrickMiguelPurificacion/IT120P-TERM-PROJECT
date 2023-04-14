import RegisterCSS from './Register.module.css'
import { UserAuth } from '../../context/AuthContext'
import { FormEventHandler, useContext, useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'

function Register(){
    
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Error.');
    const [successMessage, setSuccessMessage] = useState('Success.');
    const [isValid, setIsValid] = useState(false);

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'Select Gender',
        contact: '',
        address: ''
    })

    const navigate = useNavigate();

    const { createUser, currentEmployee } = UserAuth();

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

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setErrorMessage('');

        try{

            const {
                firstName,
                lastName,
                email,
                gender,
                password,
                contact,
                address
            } = employee;

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
                return setErrorMessage('Please enter a valid email address)');
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

            await createUser(firstName, lastName, email, password, gender, contact, address);
            navigate('/home')

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setErrorMessage(e.message);
            }

        }

    }

    useEffect(()=>{

        if(employee.password === employee.confirmPassword && (employee.password.length > 0 || employee.confirmPassword.length > 0)){

            setIsValid(true);

        }else{

            setIsValid(false);

        }

    },[employee.password, employee.confirmPassword])
    
    useEffect(() => {

        if(currentEmployee){

            navigate('/home');
    
        }

    },[currentEmployee])

    return(
        <>
            <div className={RegisterCSS.main_register}>
                <div className="container">
                    {showError && <div className="alert alert-danger alerts text-center" role="alert">{errorMessage}</div>}              
                    {showSuccess && <div className="alert alert-success alerts text-center" role="alert">{successMessage}</div>}
                    <div className="row">
                        <div className={"col-md-6 text-center " + RegisterCSS.main_register_1}>
                            <img src="../src/assets/register/main-section-register.jpg" />
                        </div>
                        <div className={"col-md-6 " + RegisterCSS.main_register_2}>
                            <div className={"card shadow-2-strong " + RegisterCSS.card_register} style={{borderRadius: "15px"}}>
                                <div className={"card-body p-3 p-md-4 " + RegisterCSS.card_inner_register}>
                                    <img src="../src/assets/logo.png" className={"mx-auto d-block " + RegisterCSS.logo}></img>
                                    <p className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Register your employee information</p>
                                    <form id="login-form" name="login-form" autoComplete="on" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="FirstName" onChange={(e) => setEmployee({...employee, firstName: e.target.value})} className="form-control form-control-lg" placeholder="First Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="LastName" onChange={(e) => setEmployee({...employee, lastName: e.target.value})} className="form-control form-control-lg" placeholder="Last Name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input type="email" id="Email" onChange={(e) => setEmployee({...employee, email: e.target.value})} className="form-control form-control-lg" placeholder="Email Address" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="Address" onChange={(e) => setEmployee({...employee, address: e.target.value})} className="form-control form-control-lg" placeholder="Address" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="cold-md-12 mb-4 pb-2">
                                            <div className="form-group">
                                                <select className="form-control form-control-lg" id="Gender" defaultValue={'default'} onChange={(e) => setEmployee({...employee, gender: e.target.value})}>
                                                    <option value="default" disabled>Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="Contact" onChange={(e) => setEmployee({...employee, contact: e.target.value})} className="form-control form-control-lg" placeholder="Contact Number" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="password" id="Password" onChange={(e) => setEmployee({...employee, password: e.target.value})} className="form-control form-control-lg" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="password" id="ConfirmPassword" onChange={(e) => setEmployee({...employee, confirmPassword: e.target.value})} className="form-control form-control-lg" placeholder="Confirm Password" />
                                                </div>
                                            </div>
                                        </div>
                                        {!isValid &&
                                            <div className="mt-4 pt-2 text-center">
                                                <input className="btn btn-danger btn-lg" type="submit" value="Register" disabled/>
                                            </div>
                                        }
                                        {isValid &&
                                            <div className="mt-4 pt-2 text-center">
                                                <input className="btn btn-primary btn-lg" type="submit" value="Register" />
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
