import { Link } from 'react-router-dom'
import HomeCSS from './Home.module.css'
import { UserAuth } from '../../context/UserContext'
import { FormEventHandler, useEffect, useState } from 'react';
import Alert from '../alerts/Alerts';
import FormValidator from '../../scripts/formValidator';

function Home(){

    const {currentEmployee, contactAdmin} = UserAuth();
    const formValidator = new FormValidator();

    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [contactEmployee, setContactEmployee] = useState({
        uuid: '',
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });

    const FAQ = [
        {
            title: "What is FabricFinesse?", 
            message: "FabricFinesse is a web application that helps laundry businesses manage their system through cloud computing technology, allowing for flexibility and cost-saving."
        },
        {
            title: "How does FabricFinesse work?", 
            message: "FabricFinesse allows laundry business employees to access their system's data from anywhere, improving time management and work efficiency. Employees can view inventory, service status of customers, and order details to better cater to customer needs. The application also allows for resource management, equipment maintenance, and tracking of inventory such as detergent and fabric conditioner."
        },
        {
            title: "What types of laundry businesses does FabricFinesse cater to?", 
            message: "FabricFinesse focuses on wash-and-fold and dry cleaning laundry services, which involve more employee involvement compared to self-service laundromats."
        },
        {
            title: "What are the types of delivery options available with PICKUP & DELIVERY service?", 
            message: "FabricFinesse offers laundry-truck, car, ferry as types of delivery options for the PICKUP & DELIVERY service."
        },
        {
            title: "How does the PICKUP & DELIVERY service work?", 
            message: "Customers can schedule a set pickup time for their laundry from their home, work, or any other location within the service area. The laundry is picked up, cleaned, dried, folded, and then delivered back to the customer, providing a convenient solution for busy individuals."
        },
        {
            title: "What is dry cleaning?", 
            message: "Dry cleaning is a professional laundry service that uses solvents instead of water to clean delicate clothing items such as suits and dresses. It is a gentle process that removes stains without causing damage."
        },
        {
            title: "What is the procedure for dry cleaning with FabricFinesse?", 
            message: "The dry cleaning process with FabricFinesse typically involves inspecting the garment for stains or damage, pre-treating stains, cleaning the garment using solvents, drying and pressing the garment, and finally inspecting for remaining stains or damage before packaging and returning it to the customer."
        },
        {
            title: "What is an online laundry service?", 
            message: "An online laundry service is a convenient solution for outsourcing laundry tasks. Customers can schedule laundry pickups and drop-offs at their preferred times and locations through a mobile app or website, and the laundry is cleaned, folded, and returned to their doorstep."
        },
        {
            title: "How does an online laundry service work with FabricFinesse?", 
            message: "Customers can sign up for an account with FabricFinesse, select the services they need, schedule a pickup time and location through the mobile app or website, and the laundry is picked up, cleaned, and returned to the specified location within a designated timeframe."
        },
        {
            title: "What are the benefits of using FabricFinesse for laundry businesses?", 
            message: "FabricFinesse helps automate day-to-day laundry operations, improves customer experience, allows for better resource management, and enables employees to access the system's data from anywhere for more efficient time management and work. The cloud computing technology used by FabricFinesse also allows for flexibility and cost-saving."
        }
    ]

    const submitTicket: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        setAlertMessage({type: '', message: '', show: false});

        try {
            
            const {
                uuid,
                fullName,
                email,
                subject,
                message
              } = contactEmployee;

            // Validate Employee ID
            if (!uuid || uuid === '' || uuid === null || uuid === undefined || !formValidator.isValidEmployeeID(uuid)) {
                return setAlertMessage({type: 'error', message: 'Please enter a valid employee ID', show: true});
            }

            // Validate Full Name
            if (!fullName || fullName === '' || fullName === null || fullName === undefined || !formValidator.isValidFullName(fullName)) {
                return setAlertMessage({type: 'error', message: 'Please enter a valid full name (at least 4 characters)', show: true});
            }

            // Validate email
            if (!email || email === '' || email === null || email === undefined || !formValidator.isValidEmail(email)) {
                return setAlertMessage({type: 'error', message: 'Please enter a valid email address', show: true});
            }

            // Validate subject
            if (!subject || subject.length < 10 || subject === '' || subject === null || subject === undefined) {
                return setAlertMessage({type: 'error', message: 'The subject must be at least 10 characters long', show: true});
            }

            // Validate message
            if (!message || message.length < 25 || message === '' || message === null || message === undefined) {
                return setAlertMessage({type: 'error', message: 'The message must be at least 25 characters long', show: true});
            }

            await contactAdmin(uuid, fullName, email, subject, message).then(() =>{

                return setAlertMessage({type: 'success', message: 'Ticket Submitted.', show: true});
    
            }).catch((error)=>{
    
                return setAlertMessage({type: 'error', message: error.message, show: true});
    
            });

        }catch(e: unknown){
          
            if(e instanceof Error){
                return setAlertMessage({type: 'error', message: e.message, show: true});
            }
  
        }

    }

    useEffect(()=>{

        if(contactEmployee){

            setContactEmployee({
                uuid: currentEmployee?.uuid!,
                fullName: currentEmployee?.firstName! + ' ' + currentEmployee?.lastName!,
                email: currentEmployee?.email!,
                subject: '',
                message: ''
            })

        }

    },[currentEmployee])

    useEffect(()=>{

        if(alertMessage.show){
            setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
        }
  
    },[alertMessage.message])
    
    return(
        <>
            <div className={HomeCSS.main_home}>
                <div style={{position: 'fixed',top: '5%', left: '35%', width: '400px', zIndex:'1000'}}>
                    {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
                </div>
                <div className="container">
                    <div className="row">
                        <div className={"col-md-6 text-center " + HomeCSS.main_home_1}>
                            <img src="../src/assets/logo.png"/>
                            <p className="p-5">Welcome to the employee management system of FabricFinesse. Please login to start working!</p>
                            <div className="p-5">
                                {currentEmployee ? 
                                    <Link to="/dashboard/employee-display" onClick={window.location.reload}><button type="button" className="btn btn-primary">PROFILE</button></Link>
                                :
                                    <Link to="/login" onClick={window.location.reload}><button type="button" className="btn btn-primary">LOGIN</button></Link>
                                }
                                <Link to="/about" onClick={window.location.reload}><button type="button" className="btn btn-primary">LEARN MORE</button></Link>
                            </div>
                        </div>
                        <div className={"col-md-6 text-center " + HomeCSS.main_home_2}>
                            <img src="../src/assets/home/main-section-front.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={HomeCSS.FAQ_section} id="F-A-Q">
                <p className="text-center display-2">FREQUENTLY ASKED QUESTIONS</p>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="accordion" id="FAQ">
                            {FAQ.map((item, index)=>{
                                return(
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header" id={index.toLocaleString()}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index.toString()} aria-expanded="true" aria-controls="collapseOne">
                                                <strong>{item.title}</strong>
                                            </button>
                                        </h2>
                                        <div id={"collapse" + index.toString()} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#FAQ">
                                            <div className="accordion-body">
                                                {item.message}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className={HomeCSS.contact_admin_section}>
                    <p className="text-center display-2">CONTACT AN ADMIN</p>
                    <div className="container">
                    <div className="row">
                        <p className="text-center w-responsive mx-auto mb-5">
                            Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
                        </p>
                        <form id="contact-form" name="contact-form" onSubmit={submitTicket}>
                            <div className="col-md-9 mb-md-0 mb-5 m-auto">
                                <div className="row p-2">
                                    <div className="col-md-12">
                                        <div className="md-form mb-0">
                                            <input type="text" id="employeeId" name="employeeId" placeholder="Employee ID" className="form-control" readOnly={currentEmployee !== null} onChange={(e) => setContactEmployee({ ...contactEmployee, uuid: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.uuid : ''} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <div className="col-md-6">
                                        <div className="md-form mb-0">
                                            <input type="text" id="name" name="name" placeholder="Full Name" className="form-control" readOnly={currentEmployee !== null} onChange={(e) => setContactEmployee({ ...contactEmployee, fullName: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.firstName + ' ' + currentEmployee!.lastName : ''} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="md-form mb-0">
                                            <input type="text" id="email" name="email" placeholder="Email Address" className="form-control" readOnly={currentEmployee !== null} onChange={(e) => setContactEmployee({ ...contactEmployee, email: e.target.value })} defaultValue={currentEmployee ? currentEmployee!.email : ''} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <div className="col-md-12">
                                        <div className="md-form mb-0">
                                            <input type="text" id="subject" name="subject" placeholder="Subject" className="form-control" onChange={(e) => setContactEmployee({ ...contactEmployee, subject: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <div className="col-md-12">
                                        <div className="md-form">
                                            <textarea id="message" name="message" placeholder='Put your message here.' rows={5} className="form-control md-textarea" onChange={(e) => setContactEmployee({ ...contactEmployee, message: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-md-left m-5">
                                    <button type="submit" className="btn btn-primary">SEND</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home