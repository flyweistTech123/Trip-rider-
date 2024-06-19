import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Pricing.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';



// import img from '../../Images/img5.png'


const Basepricing = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Base Pricing</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
                            </div>
                        </div>
                    </div>


                    <div className='dailyprice'>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Time Charge</label>
                                <input type="text" placeholder='Enter time charge' />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Night Charge</label>
                                <input type="text" placeholder='Enter night charge' />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Parking Charge</label>
                                <input type="text" placeholder='Enter parking charge' />
                            </div>
                            <div className='dailyprice2'>
                                <label htmlFor="">City</label>
                                <select name="" id="">
                                    <option value="">Select City</option>
                                </select>
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Booking Fees</label>
                                <input type="text" placeholder='Enter time charge' />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Toll Charges</label>
                                <input type="text" placeholder='Enter night charge' />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Tax</label>
                                <input type="text" placeholder='Enter Tax' />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">GST</label>
                                <input type="text" placeholder='Enter GST' />
                            </div>
                        </div>




                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/pricing')}>Cancel</button>
                            <button onClick={() => navigate('/pricing')}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Basepricing)