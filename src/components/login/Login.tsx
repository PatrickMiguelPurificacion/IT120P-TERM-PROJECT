import { Link, useNavigate } from 'react-router-dom'
import LoginCSS from './Login.module.css'
import { UserAuth } from '../../context/AuthContext';
import { FormEventHandler, useEffect, useState } from 'react';

function Login(){

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Error.');
    const [successMessage, setSuccessMessage] = useState('Success.');
    const [isValid, setIsValid] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {signIn, currentEmployee} = UserAuth();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();

        try{

            await signIn(email, password).catch((error)=>{

                return setErrorMessage(error.message);

            });
            navigate('/home')

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setErrorMessage(e.message);
            }

        }

    }

    useEffect(()=>{

        if(email && password){

            setIsValid(true);

        }else{

            setIsValid(false);

        }

    },[email, password])

    useEffect(() => {

        if(currentEmployee){

            navigate('/home');
    
        }

    },[currentEmployee])
    
    return(
        <>
            <div className={LoginCSS.main_login}>
                <div className="container">
                    {showError && <div className="alert alert-danger alerts text-center" role="alert">{errorMessage}</div>}              
                    {showSuccess && <div className="alert alert-success alerts text-center" role="alert">{successMessage}</div>}
                    <div className="row">
                        <div className={"col-md-6 text-center " + LoginCSS.main_login_1}>
                            <img src="../src/assets/login/main-section-login.webp" />
                        </div>
                        <div className={"col-md-6 " + LoginCSS.main_login_2}>
                            <div className={"card shadow-2-strong " + LoginCSS.card_login} style={{borderRadius: "15px"}}>
                                <div className={"card-body p-3 p-md-4 " + LoginCSS.card_inner_login}>
                                    <img src="../src/assets/logo.png" className={"mx-auto d-block " + LoginCSS.logo}></img>
                                    <p className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Sign in to your account</p>
                                    <form id="login-form" name="login-form" autoComplete="on" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="Email">Email</label>
                                                    <input type="text" id="Email" onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" placeholder="Enter Email Address" />
                                                </div>
                                                <div className="col-md-12 text-danger">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="Password">Password</label>
                                                    <input type="password" id="Password" onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" placeholder="Enter Password" />
                                                </div>
                                                <div className="col-md-12 text-danger text-justify">
                                                </div>
                                            </div>
                                        </div>
                                        {!isValid &&
                                            <div className="mt-4 pt-2 text-center">
                                                <input className="btn btn-danger btn-lg" type="submit" value="Login" disabled/>
                                            </div>
                                        }
                                        {isValid &&
                                            <div className="mt-4 pt-2 text-center">
                                                <input className="btn btn-primary btn-lg" type="submit" value="Login" />
                                            </div>
                                        }
                                        <div className="row mt-5 text-center">
                                            <div className="col-md-12">
                                                <p>Don't have an account yet?</p>
                                                <p><Link to="/register" onClick={window.location.reload}>Sign up</Link> one now!</p>
                                            </div>
                                        </div>
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

export default Login