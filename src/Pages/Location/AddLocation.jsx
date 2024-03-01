import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './LocatiolnType.css';
import HOC from '../../Components/HOC/HOC';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { FaPlusSquare } from 'react-icons/fa';

const AddLocation = () => {
    const [state, setState] = useState('');
    const [City, setCity] = useState('');

    
    const navigate = useNavigate();

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Location</h6>
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
                    <div className='Location3'>
                        <h6>Add New State & City</h6>
                        <div className='Location4'>
                            <div className='Location5'>
                                <label htmlFor="">State</label>
                                <input type="text" placeholder='Enter New State' />
                            </div>
                            <div className='Location5'>
                                <label htmlFor="">City</label>
                                <input type="text" placeholder='Enter New City' />
                            </div>
                        </div>

                        <div className='Location6'>
                            <button onClick={() => navigate('/allhourlypricing')}>Cancel</button>
                            <button>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(AddLocation);
