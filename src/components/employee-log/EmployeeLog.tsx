import Employee from '../employee/Employee';
import EmployeeLogCSS from './EmployeeLog.module.css'
import { FormEventHandler, useEffect, useState } from 'react';
import { UserAuth } from '../../context/UserContext';
import { format } from 'date-fns';
import Alert from '../alerts/Alerts';
import ReactPaginate from 'react-paginate';

const EmployeeLog = () => {

    const {currentEmployee, logEmployee, saveEmployeeLog, getEmployeeLog} = UserAuth();
    const [employeeLog, setEmployeeLog] = useState<{
        uuid: string,
        fullName: string,
        timeIn: Date,
        timeOut: Date | null
    }>({
        uuid: '',
        fullName: '',
        timeIn: new Date(),
        timeOut: null
    });

    const [currentLogs, setCurrentLogs] = useState([{
        uuid: '',
        fullName: '',
        timeIn: new Date(),
        timeOut:  new Date(0,0,0)
    }]);
    
    const [alertMessage, setAlertMessage] = useState({type: '', message:'', show: false});
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const submitLog: FormEventHandler<HTMLFormElement> = async (e) =>{

        e.preventDefault();
        setAlertMessage({type: '', message:'', show: false});

        try{

          const {
            uuid,
            fullName,
            timeIn,
            timeOut
          } = employeeLog;

          await saveEmployeeLog(uuid, fullName, timeIn as Date, timeOut as Date).then(()=>{

              setRefreshCounter(prevCounter => prevCounter + 1);
              getEmployeeLog(currentEmployee!.uuid);
              return setAlertMessage({type: 'success', message: 'Logged Successfully.', show: true});

          }).catch((error)=>{

              return setAlertMessage({type: 'error', message: error.message, show: true});

          });

        }catch(e: unknown){
          
          if(e instanceof Error){
              return setAlertMessage({type: 'error', message: e.message, show: true});
          }

      }

    }

    const handlePageClick = (event: { selected: number; }) => {
      
      const newOffset = event.selected * 5 % logEmployee!.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);

    }

    useEffect(() =>{

      setTimeout(() => {
          setInterval(() => {
              setCurrentDate(format(new Date(), 'MMM dd, yyyy'));
              setCurrentTime(format(new Date(), 'hh:mm:ss a'));
          }, 1000)
      })
      
    },[])

    useEffect(()=>{

      if(currentEmployee){
  
          setEmployeeLog({
              uuid: currentEmployee ? currentEmployee.uuid : '',
              fullName: currentEmployee!.firstName + " " + currentEmployee!.lastName,
              timeIn: new Date(),
              timeOut: new Date()
          });
  
      }
  
    },[currentEmployee, currentDate, currentTime])

    useEffect(()=>{

      if(alertMessage.show){
          setTimeout(()=>{setAlertMessage({type: '', message: '', show: false})}, 5000)
      }

    },[alertMessage.message]);

    useEffect(()=>{

      if(currentEmployee){

          getEmployeeLog(currentEmployee.uuid);

      }

    },[currentEmployee]);

    useEffect(() => {

      if(logEmployee){

          const endOffset = itemOffset + 5;
          setCurrentLogs(logEmployee!.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(logEmployee!.length / 5));

      }
      
    }, [logEmployee, itemOffset, 5]);
    
    return (
      <>
        <Employee />
        <h1 className={EmployeeLogCSS.a}>EMPLOYEE LOG UPDATE</h1>
        <div className={EmployeeLogCSS.log} key={refreshCounter}>
          <div style={{position: 'fixed',top: '5%', left: '40%', width: '400px', zIndex:'1000'}}>
              {alertMessage.show && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}
          </div>
          <div className="container">
            <div className="row text-center mb-5">
              <div>
                {currentEmployee && currentEmployee!.profilePicture !== '' ?
                  <img src={currentEmployee!.profilePicture} className={EmployeeLogCSS.profile_picture} alt="Profile Picture"></img>
                :
                  <img src='../src/assets/default-profile-picture.webp' className={EmployeeLogCSS.profile_picture} alt="Profile Picture"></img>
                }
              </div>
              <div>
                <p className="h1">TODAY IS</p>
                <p className="h2">{currentDate} at {currentTime}</p>
              </div>
            </div>
            <div className="row text-center">
              <form className="form" onSubmit={submitLog}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="email">Employee ID</label>
                        <p><input type="text" id="employeeID" placeholder="" name="employeeID" readOnly defaultValue={currentEmployee ? currentEmployee!.uuid : ''}/></p>
                    </div>
                    <div className="form-outline">
                        <label className="form-label" htmlFor="pwd">Name</label>
                        <p><input type="text" id="name" placeholder="" name="name" readOnly defaultValue={currentEmployee ? currentEmployee!.firstName + " " + currentEmployee!.lastName : ''} /></p>
                    </div>
                    <div className="form-outline">
                        <label className="form-label" htmlFor="email">Email</label>
                        <p><input type="email" id="email" placeholder="" name="email" readOnly defaultValue={currentEmployee ? currentEmployee!.email : ''} /> </p>
                    </div>         
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline">
                        <label className="form-label" htmlFor="pwd">Role</label>
                        <p><input type="text" id="role" placeholder="" name="role" readOnly defaultValue={currentEmployee ? currentEmployee!.role : ''} /></p>
                    </div>
                    <div className="form-outline">
                        <label className="form-label" htmlFor="email">Contact Number</label>
                        <p><input type="text" id="contact" placeholder="" name="pnumber" readOnly defaultValue={currentEmployee ? currentEmployee!.contact : ''} /></p>
                    </div>
                    <div className="form-outline">
                        <label className="form-label" htmlFor="pwd">Address</label>
                        <p><input type="text" id="address" placeholder="" name="address" readOnly defaultValue={currentEmployee ? currentEmployee!.address : ''} /></p>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-5 mb-5 p-3">SUBMIT</button>
              </form>
              <div className="text-center">
                {currentLogs ?
                  <>
                      <table className="table table-light table-responsive-md">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentLogs!.map((log, index)=>{
                            return(
                              <tr key={index}>
                                <td>
                                  {log.timeIn ? log.timeIn.toLocaleDateString() : "Not Available"}
                                </td>
                                <td>
                                  {log.timeIn ? log.timeIn.toLocaleTimeString() : "Not Available"}
                                </td>
                                <td>
                                  {log.timeOut.getTime() > 0 ? log.timeOut.toLocaleTimeString() : "Not Available"}
                                </td>
                              </tr>
                            )
                          }).reverse()}
                        </tbody>
                      </table>
                      <ReactPaginate
                              nextLabel="next >"
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={3}
                              marginPagesDisplayed={2}
                              pageCount={pageCount}
                              previousLabel="< previous"
                              pageClassName="page-item"
                              pageLinkClassName="page-link"
                              previousClassName="page-item"
                              previousLinkClassName="page-link"
                              nextClassName="page-item"
                              nextLinkClassName="page-link"
                              breakLabel="..."
                              breakClassName="page-item"
                              breakLinkClassName="page-link"
                              containerClassName="pagination"
                              activeClassName="active"
                              renderOnZeroPageCount={null}
                            />
                  </>
                :
                  <>
                      <div className="text-light text-center">
                        <h1>There are currently no logs at the moment.</h1>
                      </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default EmployeeLog