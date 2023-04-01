import { Link } from 'react-router-dom'
import './Home.css'

function Home(){
    
    return(
        <>
            <div className="main-home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center main-home-1">
                            <img src="../src/assets/logo.png"/>
                            <p className="p-5">Welcome to the employee management system of FabricFinesse. Please login to start working!</p>
                            <div className="p-5">
                                <Link to="/login"><button type="button" className="btn btn-primary">LOGIN</button></Link>
                                <Link to="/about"><button type="button" className="btn btn-primary">LEARN MORE</button></Link>
                            </div>
                        </div>
                        <div className="col-md-6 text-center main-home-2">
                            <img src="../src/assets/home/main-section-front.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="FAQ-section" id="F-A-Q">
                <p className="text-center display-2">FREQUENTLY ASKED QUESTIONS</p>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="accordion" id="FAQ">
                                <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Accordion Item #1
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#FAQ">
                                    <div className="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                                </div>
                                <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Accordion Item #2
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#FAQ">
                                    <div className="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                                </div>
                                <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Accordion Item #3
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#FAQ">
                                    <div className="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="contact-admin-section">
                    <p className="text-center display-2">CONTACT AN ADMIN</p>
                    <div className="container">
                    <div className="row">
                        <p className="text-center w-responsive mx-auto mb-5">
                            Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
                        </p>
                        <form id="contact-form" name="contact-form">
                        <div className="col-md-9 mb-md-0 mb-5 m-auto">
                            <div className="row p-2">
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <input type="text" id="employeeId" name="employeeId" placeholder="Employee ID" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-2">
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="text" id="name" name="name" placeholder="Full Name" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="text" id="email" name="email" placeholder="Email Address" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-2">
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <input type="text" id="subject" name="subject" placeholder="Subject" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-2">
                                <div className="col-md-12">
                                    <div className="md-form">
                                        <textarea id="message" name="message" placeholder='Put your message here.' rows={5} className="form-control md-textarea"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-md-left m-5">
                                <button className="btn btn-primary">SEND</button>
                            </div>
                            <div className="status"></div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home