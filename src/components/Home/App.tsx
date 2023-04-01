import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import About from './about/About'
import Login from './login/Login'
import Register from './register/Register'
import Error from './error/Error'

function App() {

    let navbar = document.getElementById("main-navigation");
    let sticky = 0;

  useEffect(()=>{
        
    navbar = document.getElementById("main-navigation");
    sticky = navbar!.offsetTop;
    window.addEventListener('scroll', handleSticky);

  }, []);
  
  const handleSticky = () => {

    if(window.scrollY > sticky){
        navbar?.classList.add("sticky");
    }else{
        navbar?.classList.remove("sticky");
    }

  }

  return (
    <>
      <nav id="main-navigation" className="navbar navbar-expand-lg navbar-dark navigation">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src="../src/assets/logo.png"/></a>
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
                    <li className="nav-item">
                        <a className="nav-link active" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/register">Register</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/profile">Profile</a>
                    </li>
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

        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<Home />} />
                {/*<Route path="/services" element={} />*/}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/*<Route path="/profile" element={} />*/}
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>      
    </>
  )
}

export default App