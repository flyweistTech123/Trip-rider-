import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import './Termsandconditions.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const Agreement = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <h6>Agreement</h6>

                    <Link to={'/useragreement'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>User Agreement</h5>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/driveragreement'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Driver Agreement</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/vendoragreement'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Vendor Agreement</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HOC(Agreement)