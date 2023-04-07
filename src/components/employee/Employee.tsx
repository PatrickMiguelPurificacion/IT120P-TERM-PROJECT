import EmployeeCSS from './Employee.module.css'

function Employee(){

    return(
        <>
            <div className={EmployeeCSS.wrapper}>
                <div className={EmployeeCSS.sidebar}>
                    <span className={EmployeeCSS.brand_name}><b>Fabric</b><b>Finesse</b></span>
                    <a className="active" href="/home">Home</a>
                    <a href="/dashboard/employee-view">Employee View</a>
                    <a href="/dashboard/employee-display">Employee Display</a>
                    <a href="/dashboard/employee-log">Employee Log</a>
                    <a href="/dashboard/order">Orders </a>
                    <a href="/dashboard/order-display">Order Display</a>
                    <a href="/dashboard/stock">Stocks </a>
                    <a href="/dashboard/stock-display">Stock Display</a>
                </div>
            </div>
        </>
    )
}

export default Employee