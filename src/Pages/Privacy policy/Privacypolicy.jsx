import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Privacypolicy.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const Privacypolicy = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <h6>Privacy policy</h6>

                    <Link to={'/userprivacypolicy'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>User Privacy policy</h5>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/driverprivacypolicy'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Driver Privacy policy</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/vendorprivacypolicy'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Vendor Privacy policy</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HOC(Privacypolicy)