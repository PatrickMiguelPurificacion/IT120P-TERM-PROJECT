import { Link } from 'react-router-dom'
import './Login.css'

function Login(){

    let showError = false;
    let showSuccess = false;
    
    let errorMessage = "Error.";
    let successMessage = "Success.";
    
    let isValid = false;
    
    return(
        <>
            <div className="main-login">
                <div className="container">
                    {showError && <div className="alert alert-danger alerts text-center" role="alert">{errorMessage}</div>}              
                    {showSuccess && <div className="alert alert-success alerts text-center" role="alert">{successMessage}</div>}
                    <div className="row">
                        <div className="col-md-6 text-center main-login-1">
                            <img src="../src/assets/login/main-section-login.webp" />
                        </div>
                        <div className="col-md-6 main-login-2">
                            <div className="card shadow-2-strong card-login" style={{borderRadius: "15px"}}>
                                <div className="card-body p-3 p-md-4 card-inner-login">
                                    <img src="../src/assets/logo.png" className="logo mx-auto d-block"></img>
                                    <p className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Sign in to your account</p>
                                    <form id="login-form" name="login-form" autoComplete="on">
                                        <div className="row">
                                            <div className="col-md-12 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="Email">Email</label>
                                                    <input type="text" id="Email" className="form-control form-control-lg" placeholder="Enter Email Address" />
                                                </div>
                                                <div className="col-md-12 text-danger">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="Password">Password</label>
                                                    <input type="password" id="Password" className="form-control form-control-lg" placeholder="Enter Password" />
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
                                                <p><Link to="/register">Sign up</Link> one now!</p>
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