import AboutCSS from './About.module.css'

function About(){
    
    return(
        <>
        <div className={AboutCSS.main_about}>
            <div className="container pb-5">
                <div className="row">
                    <div className={"col-md-6 text-center " + AboutCSS.main_about_1}>
                        <img src="../src/assets/about/about-us.jpg" />
                    </div>
                    <div className={"col-md-6 " + AboutCSS.main_about_2}>
                        <p className="display-4 mb-5 text-center">ABOUT THE BUSINESS</p>
                        <h3>Objectives</h3>
                        <p className={"m-4 " + AboutCSS.text_justify}> To become the region's leading provider of laundry services by providing exceptional customer experiences, utilizing eco-friendly practices, and leveraging technology to streamline operations and increase efficiency, all while remaining committed to sustainability and social responsibility.<br /><br /> In addition to our dedication to sustainability, we are also committed to social responsibility. We will cultivate diversity, inclusivity, and employee growth in the workplace and actively support community activities and philanthropic organizations that align with our values.</p>
                        <h3>History</h3>
                        <p className={"m-4 " + AboutCSS.text_justify}> Founded in <u>2004</u> by Leroy Jenkins, our laundry shop started as a small business that offered basic laundry services at the municipality of Misamis Oriental. As demand for our services grew, we expanded our offerings to include dry cleaning, alterations, and commercial laundry services. Over the years, we've built a reputation for providing exceptional customer service and high-quality laundry services, which has led to a loyal customer base and numerous awards and accolades. In <u>2009</u>, we opened our second location, and in <u>2014</u>, we launched our online ordering platform, which has helped us to further streamline operations and increase efficiency.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={AboutCSS.MV_section}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-center display-2">MISSION</h1>
                        <div className={"card shadow-2-strong " + AboutCSS.card_MV} style={{borderRadius: "15px"}}>
                            <div className={"card-body p-3 p-md-4 " + AboutCSS.card_inner_MV}>
                                <p className={"m-4 " + AboutCSS.text_justify}>Our mission at FabricFinesse is to provide top-quality laundry services that simplify and improve the lives of our customers. We are committed to delivering exceptional customer experiences by providing personalized and convenient laundry solutions, utilizing the latest technology and equipment to ensure the highest quality results, and maintaining a strong focus on sustainability and social responsibility. Through our dedication to these core values, we aim to become the go-to laundry service provider in our community, while cultivating a positive and supportive work environment that fosters employee growth and professional development.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-center display-2">VISION</h1>
                        <div className={"card shadow-2-strong " + AboutCSS.card_MV} style={{borderRadius: "15px"}}>
                            <div className={"card-body p-3 p-md-4 " + AboutCSS.card_inner_MV}>
                                <p className={"m-4 " + AboutCSS.text_justify}>To create a future where laundry is no longer a chore, but a seamlessly integrated part of everyday life. We envision a world where people can enjoy more free time and a better quality of life, by entrusting their laundry needs to us. Our vision is to become the most innovative, reliable, and customer-centric laundry service provider in the industry, by leveraging cutting-edge technology, eco-friendly practices, and a passionate team dedicated to exceeding customer expectations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default About