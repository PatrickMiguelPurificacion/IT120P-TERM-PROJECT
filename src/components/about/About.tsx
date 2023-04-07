import AboutCSS from './About.module.css'

function About(){
    
    return(
        <>
        <div className={AboutCSS.main_about}>
            <div className="container">
                <div className="row">
                    <div className={"col-md-6 text-center " + AboutCSS.main_about_1}>
                        <img src="../src/assets/about/about-us.jpg" />
                    </div>
                    <div className={"col-md-6 text-center " + AboutCSS.main_about_2}>
                        <p className="display-4 mb-5">ABOUT THE BUSINESS</p>
                        <h3>Objectives</h3>
                        <p className="m-4">lorem</p>
                        <h3>History</h3>
                        <p className="m-4">lorem</p>
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
                                <p>lorem</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-center display-2">VISION</h1>
                        <div className={"card shadow-2-strong " + AboutCSS.card_MV} style={{borderRadius: "15px"}}>
                            <div className={"card-body p-3 p-md-4 " + AboutCSS.card_inner_MV}>
                                <p>lorem</p>
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