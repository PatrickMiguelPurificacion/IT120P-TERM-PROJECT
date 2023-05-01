import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/UserContext'
import ServicesCSS from './Services.module.css'
import { Link } from 'react-router-dom';

function Services(){

    const {currentEmployee} = UserAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() =>{

        if(currentEmployee){

            setIsLoggedIn(true);

        }

    }, [currentEmployee])

    const services = [
        {
            Name: "PICKUP & DELIVERY",
            Description: "These services allow you to schedule a set pickup time for your laundry. You can have it picked up from your home, your work, or any other location that is within our service area, making it easy to get your laundry sent in when you need to, even if you don’t have the time to drop it off.",
            Procedure: "Put simply, a pick-up and delivery laundry service does what it says on the tin. Your local laundromat will collect your dirty laundry and bring it back to you after giving it a thorough wash, dry, and fold. Some added costs are involved compared to completing your own laundry or heading into the laundromat yourself, but many people find the extra spend worthwhile.",
            Delivery: "Laundry-Truck",
            ImageUrl: "../src/assets/services/Page2.png",
            Price: 300.00
        },
        {
            Name: "DRY CLEANING SERVICE",
            Description: "Dry cleaning is a professional laundry service that uses solvents instead of water to clean clothes made from delicate materials. This process is gentle on fabrics and removes stains without causing damage. Laundry businesses offer this service to customers who need to clean suits, dresses, and other delicate clothing items.",
            Procedure: "The dry cleaning process typically involves inspecting the garment for stains or damage, pre-treating any stains, and then placing the garment in a machine that uses solvents to clean it. Once the cleaning cycle is complete, the garment is dried and pressed, and then inspected again for any remaining stains or damage. Finally, the garment is packaged and returned to the customer.",
            Delivery: "Car",
            ImageUrl: "../src/assets/services/Page3.png",
            Price: 800.00
        },
        {
            Name: "ONLINE SERVICE",
            Description: "An online laundry service is a convenient solution for people who have busy lifestyles and need to outsource their laundry tasks. It allows customers to schedule laundry pickups and drop-offs at their preferred times and locations, often through a mobile app or website. The laundry is then cleaned, folded, and returned to the customer's doorstep, saving them time and effort.",
            Procedure: "To use an online laundry service, customers typically start by signing up for an account and selecting the services they need, such as washing, drying, folding, and ironing. They then schedule a pickup time and location, often through a mobile app or website. The laundry is picked up by a delivery person, taken to a cleaning facility, and then returned to the customer's specified location within a designated timeframe.",
            Delivery: "Ferry",
            ImageUrl: "../src/assets/services/Page4.png",
            Price: 500.00
        }
    ]

    return(
        <>
            <div className={ServicesCSS.main_services}>
                <div className="container">
                    <div className={"row text-center " + ServicesCSS.main_services_1}>
                        <p className="display-1 mt-5">LAUNDRY SERVICES</p>
                    </div>
                    <div className={"row " + ServicesCSS.main_services_2}>
                        <div className="col-md-6">
                            <h1 className="text-center">Types of Services</h1>
                            <ul className="ms-5 lead mt-5">
                                <li>Pickup and Delivery</li>
                                <li>Dry Cleaning Service</li>
                                <li>Online Service</li>
                            </ul>
                            <h1 className="text-center pt-5 mt-5">AVAILABLE ORDERS</h1>
                            <div className="text-center p-5">
                                <div className="bg-primary ms-0 p-3">EMAIL, PHONE, AND WALK-IN</div>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src="../src/assets/services/Page1.png" />
                        </div>
                    </div>
                </div>
            </div>
            {services.map((item, index) => {
                if(index % 2 == 0){
                    return(
                        <div className={ServicesCSS.services} key={index}>
                            <div className={ServicesCSS.services_header}>
                                <h1 className="display-3">{item.Name}</h1>
                            </div>
                            <div className="container">
                                <div className="row text-light">
                                    <div className="col-md-4 text-center">
                                        <p className="display-5 mt-5">PHP{item.Price}</p>
                                        <img src={item.ImageUrl} width="80%" />
                                        {isLoggedIn ?
                                            <Link to="/dashboard/order" onClick={window.location.reload}><button type="button" className="btn btn-primary mt-5 p-3">Create Order</button></Link>
                                        :
                                            <button type="button" className="btn btn-danger mt-5 p-3" disabled>Create Order</button>
                                        }
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row mt-5 p-5">
                                            <div className="col-md-6">
                                                <h2 className="text-center">Service Description</h2>
                                                <p className={"mt-4 p-3 " + ServicesCSS.text_justify}>{item.Description}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h2 className="text-center">Procedure</h2>
                                                <p className={"mt-4 p-3 ps-5 " + ServicesCSS.text_justify}>{item.Procedure}</p>
                                            </div>
                                        </div>
                                        <div className="row p-2 text-center">
                                            <h2>Type of Delivery</h2>
                                            <p className="mt-4 p-3">{item.Delivery}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    return (
                        <div className={ServicesCSS.services} key={index}>
                            <div className={ServicesCSS.services_header}>
                                <h1 className="display-3">{item.Name}</h1>
                            </div>
                            <div className="container">
                                <div className="row text-light">
                                    <div className="col-md-8">
                                        <div className="row mt-5 p-5">
                                            <div className="col-md-6">
                                                <h2 className="text-center">Service Description</h2>
                                                <p className={"mt-4 p-3 " + ServicesCSS.text_justify}>{item.Description}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h2 className="text-center">Procedure</h2>
                                                <p className={"mt-4 p-3 ps-5 " + ServicesCSS.text_justify}>{item.Procedure}</p>
                                            </div>
                                        </div>
                                        <div className="row p-2 text-center">
                                            <h2>Type of Delivery</h2>
                                            <p className="mt-4 p-3">{item.Delivery}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <p className="display-5 mt-5">PHP{item.Price}</p>
                                        <img src={item.ImageUrl} width="80%" />
                                        {isLoggedIn ?
                                            <Link to="/dashboard/order" onClick={window.location.reload}><button type="button" className="btn btn-primary mt-5 p-3">Create Order</button></Link>
                                        :
                                            <button type="button" className="btn btn-danger mt-5 p-3" disabled>Create Order</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default Services