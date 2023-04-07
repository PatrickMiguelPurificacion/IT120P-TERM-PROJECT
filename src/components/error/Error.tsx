import ErrorCSS from './Error.module.css'

function Error(){
    
    return(
        <div className={ErrorCSS.error}>
        <div className={"d-flex flex-row align-items-center " + ErrorCSS.page_wrap}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center text-light">
                        <span className="display-1 d-block">404</span>
                        <div className="mb-4 lead">The page you are looking for was not found.</div>
                        <a href="/" className="btn btn-link">Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Error