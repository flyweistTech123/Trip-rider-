import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './LocatiolnType.css';
import HOC from '../../Components/HOC/HOC';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { FaPlusSquare } from 'react-icons/fa';

const AllLocation = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/State`);
                setStates(response.data.data);
            } catch (error) {
                console.error('Error fetching States:', error);
            }
        };
        
        fetchStates();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/City`);
                setCities(response.data.data);
            } catch (error) {
                console.error('Error fetching Cities:', error);
            }
        };
        
        fetchCities();
    }, []);

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
                        <h6>Select State & City</h6>
                        <div className='Location4'>
                            <div className='Location5'>
                                <label htmlFor="">State</label>
                                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state._id} value={state._id}>{state.state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='Location5'>
                                <label htmlFor="">City</label>
                                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city._id} value={city._id}>{city.city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(AllLocation);
