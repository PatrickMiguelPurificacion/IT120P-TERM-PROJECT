import './employeeLog.css'
import avatar from "./avatar.webp"

function buttonClick() {
  alert('You\'ve clicked the button!');
}

const EmployeeLog = () => {
    return (
        <div>
          <div className="wrapper">
        <div className="sidebar">
            <span className='brand-name'><b>Fabric</b><b>Finesse</b></span>
          <a className="active" href="">Home</a>
          <a href="#">Profile</a>
          <a href="#">Orders</a>
          <a href="#">Log</a>
          <a href="#">Stocks</a>
        </div>
        <div className="navbar">
            <h1>EMPLOYEE LOGIN PAGE</h1>
            </div>
            </div>

        <div className="content">
          <div className="profile-picture">
            <img src={avatar}></img>
          </div>

          <form className="form-inline">
        <label htmlFor="email">Employee ID</label>
        <input type="email" id="employeeID" placeholder="" name="employeeID" />
        <label htmlFor="pwd">Name</label>
        <input type="email" id="name" placeholder="" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="" name="email" />
        <label htmlFor="pwd">Role</label>
        <input type="email" id="role" placeholder="" name="role" />

        <label htmlFor="email">Contact Number</label>
        <input type="email" id="pnumber" placeholder="" name="pnumber" />
        <label htmlFor="pwd">Address</label>
        <input type="email" id="address" placeholder="" name="address" />

        <input type="button" className="button" onClick={buttonClick} defaultValue="SUBMIT" />
      </form>

      <div className="table-responsive">
        <table>
        <tr>
        <th>Date</th>
      <th>Start Time</th>
      <th>End Time</th>
        </tr>

        <tr>
        <td>08/12/2012</td>
      <td>Jackson</td>
      <td>13:49</td>
        </tr>

        <tr>
        <td>08/12/2012</td>
      <td>Jackson</td>
      <td>13:49</td>
        </tr>

        <tr>
        <td>08/12/2012</td>
      <td>Jackson</td>
      <td>13:49</td>
        </tr>
        </table>

      </div>
        </div>
        </div>
    )
}

export default EmployeeLog