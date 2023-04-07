import Employee from '../employee/Employee';
import EmployeeLogCSS from './EmployeeLog.module.css'
import avatar from "../../assets/employee-log/avatar.webp"

function buttonClick() {
  alert('You\'ve clicked the button!');
}

const EmployeeLog = () => {
    return (
      <>
        <Employee />
        <div className={EmployeeLogCSS.log}>
          <div className={EmployeeLogCSS.content}>
            <div className={EmployeeLogCSS.profile_picture}>
              <img src={avatar}></img>
            </div>

            <form className={EmployeeLogCSS.form_inline}>
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

          <input type="button" className={EmployeeLogCSS.button} onClick={buttonClick} defaultValue="SUBMIT" />
        </form>

        <div className={EmployeeLogCSS.table_responsive}>
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
        </>
    )
}

export default EmployeeLog