import React from 'react'
import './Empview.css'
const Empview = () => {
  return (
    <div className='Empview'>
      <h1 className='a'>EMPLOYEE INFORMATION PAGE</h1>
      <br></br>
      <h2 className='b'>Edit Profile Picture </h2>
      <br></br>
       <br></br>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Prof Pic" width="250" height="250"></img>
      <div className='form-container'>
        <div className='form-wrapper'>
          <form className='d'>
            <label htmlFor="fname">Employee ID:</label>
            <input className ='c' type="text" id="Employee ID" name="Employee ID" />
            <br />
            <br />
            <label htmlFor="fname">Name:</label>
            <input className ='c' type="text" id="Name" name="Name" />
            <br />
            <br />
            <label htmlFor="fname">Email:</label>
            <input className ='c' type="text" id="Email" name="Email" />
            <br />
            <br />
            <input type="submit" value="Edit" />
          </form>
        </div>
        <div className='form-wrapper'>
          <form className='g'>
            <label htmlFor="fname">Role:</label>
            <input className ='f' type="text" id="Role:" name="Role:" />
            <br />
            <br />
            <label htmlFor="fname">Contact Number:</label>
            <input className ='f' type="text" id="Contact Number:" name="Contact Number:" />
            <br />
            <br />
            <label htmlFor="fname">Address:</label>
            <input className ='f' type="text" id="Address:" name="Address:" />
            <br />
            <br />
            <input type="submit" value="View" />
          </form>
        </div>
      </div>
      </div>
     
      
    
  )
}

export default Empview;