import { Link, useNavigate } from 'react-router-dom'
import LoginCSS from './Login.module.css'
import { UserAuth } from '../../context/UserContext';
import { FormEventHandler, useEffect, useState } from 'react';
import Alert from '../alerts/Alerts';

function Login(){

    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [isValid, setIsValid] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {signIn, currentEmployee} = UserAuth();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();

        try{

            await signIn(email, password).then(() =>{

                setAlertMessage({type: 'success', message: 'Sign In Successful.', show: true});
                navigate('/home')

            }).catch((error)=>{

                setAlertMessage({type: 'error', message: "Wrong email or password.", show: true});

            });

        }catch(e: unknown){
            
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
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

    useEffect(()=>{

        if(alertMessage.show){
            setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
        }

    },[alertMessage.message])
    
    return(
        <>
            <div className={LoginCSS.main_login}>
                <div style={{position: 'fixed',top: '5%', left: '35%', width: '400px', zIndex:'1000'}}>
                    {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
                </div>
                <div className="container">
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