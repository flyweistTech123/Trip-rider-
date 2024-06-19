import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Pricing.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';



// import img from '../../Images/img5.png'


const Taxes = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Taxes</h6>
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


                    <div className='taxes'>
                        <div className='taxes1'>
                            <div className='taxes2'>
                                <label htmlFor="">Base Fare</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='5'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                            <div className='taxes2'>
                                <label htmlFor="">Night Charge</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='18'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                        </div>
                        <div className='taxes1'>
                            <div className='taxes2'>
                                <label htmlFor="">Parking Charge</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='0'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                            <div className='taxes2'>
                                <label htmlFor="">KM</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='5'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                        </div>
                        <div className='taxes1'>
                            <div className='taxes2'>
                                <label htmlFor="">Time</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='5'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                            <div className='taxes2'>
                                <label htmlFor="">Platform Charges</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='18'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                        </div>
                        <div className='taxes1'>
                            <div className='taxes2'>
                                <label htmlFor="">Other Charges</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='5'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                            <div className='taxes2'>
                                <label htmlFor="">Surge Charges</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='18'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                        </div>
                        <div className='taxes1'>
                            <div className='taxes2'>
                                <label htmlFor="">Service Tax</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='5'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                            <div className='taxes2'>
                                <label htmlFor="">Tolle</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='18'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                        </div>
                        <div className='taxes1'>
                            <div className='taxes2'>
                                <label htmlFor="">Ride Time Charges</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='5'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                            <div className='taxes2'>
                                <label htmlFor="">Cancellation Charges</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='18'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                        </div>
                        <div className='taxes1'>
                            <div className='taxes2'>
                                <label htmlFor="">Waiting Charges</label>
                                <div className='taxes3'>
                                    <input type="text" name="" id=""  placeholder='5'/>
                                    <div className='taxes4'>%</div>
                                </div>
                            </div>
                        </div>
                        <div className='taxes5'>
                            <button onClick={() => navigate('/pricing')}>Cancel</button>
                            <button onClick={() => navigate('/pricing')}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Taxes)