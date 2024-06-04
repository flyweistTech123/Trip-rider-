import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Termsandconditions.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const Termsandconditions = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <h6>Terms and Conditions</h6>

                    <Link to={'/usertermsandconditions'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>User Terms and Conditions</h5>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/drivertermsandconditions'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Driver Terms and Conditions</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/vendortermsandconditions'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Vendor Terms and Conditions</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HOC(Termsandconditions)