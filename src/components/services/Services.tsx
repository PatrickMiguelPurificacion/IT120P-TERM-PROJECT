import './Services.css'

function Services(){

    const services = [
        {
            Name: "SERVICE 1",
            Description: "Desc 1",
            Procedure: "Procedure 1",
            Delivery: "Truck",
            ImageUrl: "../src/assets/temp-image.jpg",
            Price: 100.00
        },
        {
            Name: "SERVICE 2",
            Description: "Desc 3",
            Procedure: "Procedure 3",
            Delivery: "Motor",
            ImageUrl: "../src/assets/temp-image.jpg",
            Price: 1000.00
        },
        {
            Name: "SERVICE 3",
            Description: "Desc 3",
            Procedure: "Procedure 3",
            Delivery: "Ferry",
            ImageUrl: "../src/assets/temp-image.jpg",
            Price: 10000.00
        }
    ]

    return(
        <>
            <div className="main-services">
                <div className="container">
                    <div className="row text-center main-services-1">
                        <p className="display-1 mt-5">LAUNDRY SERVICES</p>
                    </div>
                    <div className="row main-services-2">
                        <div className="col-md-6">
                            <h1 className="text-center">Types of Services</h1>
                            <ul className="ms-5 lead mt-5">
                                <li>Service 1</li>
                                <li>Service 2</li>
                                <li>Service 3</li>
                            </ul>
                            <h1 className="text-center pt-5 mt-5">AVAILABLE ORDERS</h1>
                            <div className="text-center p-5">
                                <button className="btn btn-primary ms-0 p-3">EMAIL</button>
                                <button className="btn btn-primary ms-5 p-3">PHONE</button>
                                <button className="btn btn-primary ms-5 p-3">WALK-IN</button>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src="../src/assets/temp-image.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            {services.map((item, index) => (
            <div className="services" key={index}>
                <div className="services-header">
                    <h1 className="display-3">{item.Name}</h1>
                </div>
                <div className="container">
                    <div className="row text-light">
                        <div className="col-md-4 text-center">
                            <p className="display-5 mt-5">PHP{item.Price}</p>
                            <img src="../src/assets/temp-image.jpg" width="80%" />
                            <button className="btn btn-primary mt-5 p-3">Create Order</button>
                        </div>
                        <div className="col-md-8">
                            <div className="row mt-5 p-5">
                                <div className="col-md-6">
                                    <h2 className="text-center">Service Description</h2>
                                    <p className="mt-4 p-3">{item.Description}</p>
                                </div>
                                <div className="col-md-6">
                                    <h2 className="text-center">Procedure</h2>
                                    <p className="mt-4 p-3 ps-5">{item.Procedure}</p>
                                </div>
                            </div>
                            <div className="row mt-5 p-5 text-center">
                                <h2>Type of Delivery</h2>
                                <p className="mt-4 p-3">{item.Delivery}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </>
    )
}

export default Services