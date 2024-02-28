import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import { Link } from 'react-router-dom';
import HOC from '../../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

import { useNavigate } from 'react-router-dom';




// import img from '../../Images/img5.png'


const Alldailypricing = () => {
    const navigate = useNavigate()
    const [dailypriceData, setDailypriceData] = useState([]);

    useEffect(() => {
        fetchDailypriceData();
    }, []);

    const fetchDailypriceData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/Pricing')
            .then(response => {
                setDailypriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Daily Price data:', error);
            });
    };

    const deleteDriver = (dailypriceId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/Pricing/${dailypriceId}`)
            .then(response => {
                fetchDailypriceData();
                toast.success("Daily Price deleted successfully");
            })
            .catch(error => {
                console.error('Error to delete Daily Price:', error);
                toast.error("Error to delete Daily Price");
            });
    };





    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Daily Pricing</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={()=>navigate('/adddailypricing')}>Add Pricing</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Pricing' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Vehicle Name</th>
                                    <th>City</th>
                                    <th>To</th>
                                    <th>From</th>
                                    <th>Price</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailypriceData.map(dailyprice => (
                                    <tr key={dailyprice.id}>
                                        <td>{dailyprice.vehicle.name}</td>
                                        <td>{dailyprice.city.city}</td>
                                        <td>{dailyprice.toKm} Km</td>
                                        <td>{dailyprice.fromKm} Km</td>
                                        <td style={{ color: '#F52D56' }}>₹ {dailyprice.price}</td>
                                        <td className='rider9'>
                                            <div className='rider10' onClick={() => deleteDriver(dailyprice._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider10'>
                                                <Link to={`/updatedailypricing/${dailyprice._id}`} className='sidebar-link' >
                                                    <MdEdit color='#667085' size={20} />
                                                    <p>Edit</p>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Alldailypricing)