import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import './Privacypolicy.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const RefundPolicy = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <h6>Refund policy</h6>

                    <Link to={'/userrefundpolicy'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>User Refund policy</h5>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/driverrefundpolicy'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Driver Refund policy</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/vendorrefundpolicy'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Vendor Refund policy</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HOC(RefundPolicy)