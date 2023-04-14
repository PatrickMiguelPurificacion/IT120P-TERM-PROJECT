import { useEffect } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import wcmatch from 'wildcard-match'
import Home from './home/Home'
import About from './about/About'
import Login from './login/Login'
import Register from './register/Register'
import Services from './services/Services'
import Error from './error/Error'
import Employee from './employee/Employee'
import EmployeeView from './employee-view/EmployeeView'
import EmployeeDisplay from './employee-display/EmployeeDisplay'
import EmployeeLog from './employee-log/EmployeeLog'
import OrderPage from './order-page/OrderPage'
import OrderDisplay from './order-display/OrderDisplay'
import StockPage from './stock-page/StockPage'
import StockDisplay from './stock-display/StockDisplay'
import { UserAuth } from '../context/AuthContext'

function App() {

    let navbar = document.getElementById("main-navigation");
    let sticky = 0;
    let location = window.location.pathname;
    const isDashboard = wcmatch('/dashboard/*');
    
    const {currentEmployee, logout} = UserAuth();

    const handleLogout = async () => {

        try {

            await logout();

          } catch (error) {
            console.error('Error logging out:', error);
          }

    }

    const handleSticky = () => {

        if(window.scrollY > sticky){
            navbar?.classList.add("sticky");
        }else{
            navbar?.classList.remove("sticky");
        }

    }

    useEffect(()=>{
        
        if(!isDashboard(location)){
            navbar = document.getElementById("main-navigation");
            sticky = navbar!.offsetTop;
            window.addEventListener('scroll', handleSticky);
        }
        

    }, []);

  return (
    <>
        {!isDashboard(location) && <nav id="main-navigation" className="navbar navbar-expand-lg navbar-dark navigation">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src="../src/assets/logo.png"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 navigation-items ms-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/home#F-A-Q">FAQ</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/services">Laundry Services</a>
                    </li>
                    {!currentEmployee && 
                        <>
                            <li className="nav-item">
                                <a className="nav-link active" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/register">Register</a>
                            </li>
                        </>
                    }
                    {currentEmployee &&
                        <>
                            <li className="nav-item">
                                <a className="nav-link active" href="/dashboard/employee-display">{currentEmployee.firstName}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/home" onClick={handleLogout}>Logout</a>
                            </li>
                        </>
                    }
                    {/*<li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Employee
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Dashboard</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                     <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
                    </li> */}                    
                </ul>
                </div>
            </div>
        </nav>
        }
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/dashboard/employee" element={<Employee />} />
                
                <Route path="/dashboard/employee-view" element={<EmployeeView />} />
                <Route path="/dashboard/employee-display" element={<EmployeeDisplay />} />
                <Route path="/dashboard/employee-log" element={<EmployeeLog />} />

                <Route path="/dashboard/order" element={<OrderPage />} />
                <Route path="/dashboard/order-display" element={<OrderDisplay />} />
                
                <Route path="/dashboard/stock" element={<StockPage />} />
                <Route path="/dashboard/stock-display" element={<StockDisplay />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    </>
  )
}

export default App