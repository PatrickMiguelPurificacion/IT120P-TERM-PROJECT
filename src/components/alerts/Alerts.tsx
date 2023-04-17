import AlertsCSS from './Alerts.module.css'
import React, { useState, cloneElement, ReactElement, ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type: string;
}

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  
    const [isShow, setIsShow] = useState(true);

    const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setIsShow(false);
    };
    return (
        <div className={`alert alert-dismissible fade show px-2 py-2 ${AlertsCSS[type]} ${!isShow && AlertsCSS.hide}`}>
            {type === 'success' && 
                <h4 className="alert-heading">Success!</h4>
            }
            {type === 'error' && 
                <h4 className="alert-heading">Error!</h4>
            }
            {type === 'primary' && 
                <h4 className="alert-heading">Attention!</h4>
            }
            <hr />
            {children} <a href="#" className="close" data-dismiss="alert" aria-label="close" onClick={handleClose}>&times;</a>
        </div>
    );
};

export default Alert;