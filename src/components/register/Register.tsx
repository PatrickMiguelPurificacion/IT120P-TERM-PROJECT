import RegisterCSS from './Register.module.css'
import { UserAuth } from '../../context/UserContext'
import { FormEventHandler, useContext, useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import Alert from '../alerts/Alerts';
import FormValidator from '../../scripts/formValidator';

function Register(){
    
    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
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
    const formValidator = new FormValidator();
    const { createUser, currentEmployee } = UserAuth();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

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

            await createUser(firstName, lastName, email, password, gender, contact, address).then(() =>{

                return setAlertMessage({type: 'success', message: 'Successful Registration.', show: true});
    
            }).catch((error)=>{
    
                return setAlertMessage({type: 'error', message: error.message, show: true});
    
            });
            navigate('/home');

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
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

    useEffect(()=>{

        if(alertMessage.show){
            setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
        }

    },[alertMessage.message])

    return(
        <>
            <div className={RegisterCSS.main_register}>
                <div style={{position: 'fixed',top: '5%', left: '35%', width: '400px', zIndex:'1000'}}>
                    {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
                </div>
                <div className="container">
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
