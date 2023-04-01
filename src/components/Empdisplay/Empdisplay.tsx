import React from 'react'
import './Empdisplay.css'
const Empdisplay = () => {
  return (
    <div className='Empdisplay'>
        <h1 className='a'>EMPLOYEE INFORMATION VIEW PAGE</h1>
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
          </form>
        </div>
      </div>
      <div className='button-container'>
        <button>Edit</button>
      </div>
    </div>
  )
}

export default Empdisplay