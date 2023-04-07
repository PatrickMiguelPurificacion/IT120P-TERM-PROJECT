import RegisterCSS from './Register.module.css'

function Register(){
    
    let showError = false;
    let showSuccess = false;
    
    let errorMessage = "Error.";
    let successMessage = "Success.";
    
    let isValid = false;
    
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
                                    <form id="login-form" name="login-form" autoComplete="on">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="FirstName" className="form-control form-control-lg" placeholder="First Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="LastName" className="form-control form-control-lg" placeholder="Last Name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input type="email" id="Email" className="form-control form-control-lg" placeholder="Email Address" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="Address" className="form-control form-control-lg" placeholder="Address" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="cold-md-12 mb-4 pb-2">
                                            <div className="form-group">
                                                <select className="form-control form-control-lg" id="Gender">
                                                    <option selected disabled>Select Gender</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="password" id="Password" className="form-control form-control-lg" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="password" id="ConfirmPassword" className="form-control form-control-lg" placeholder="Confirm Password" />
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