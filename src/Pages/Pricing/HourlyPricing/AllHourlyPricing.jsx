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


const AllHourlyPricing = () => {
    const navigate = useNavigate()
    const [hourlypriceData, setHourlypriceData] = useState([]);

    useEffect(() => {
        fetchHourlypriceData();
    }, []);

    const fetchHourlypriceData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/getHourlyPricing')
            .then(response => {
                setHourlypriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Hourly Pricing data:', error);
            });
    };

    const deleteDriver = (hourlypriceId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/removeHourlyPricing/${hourlypriceId}`)
            .then(response => {
                fetchHourlypriceData();
                toast.success("Hourly Pricing deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting Hourly Pricing:', error);
                toast.error("Error deleting Hourly Pricing");
            });
    };





    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Hourly Price</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={()=>navigate('/addhourlypricing')}>Add Pricing</button>
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
                                    <th>Distance</th>
                                    <th>Hours</th>
                                    <th>Price</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hourlypriceData.map(hourlyprice => (
                                    <tr key={hourlyprice.id}>
                                        <td>{hourlyprice?.vehicle?.name}</td>
                                        <td>{hourlyprice?.city?.city}</td>
                                        <td>{hourlyprice.km} Km</td>
                                        <td>{hourlyprice.hours}</td>
                                        <td  style={{ color: '#F52D56' }}>₹ {hourlyprice.price}</td>
                                        <td className='rider9'>
                                            <div className='rider10' onClick={() => deleteDriver(hourlyprice._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider10'>
                                                <Link to={`/updatehourlypricing/${hourlyprice._id}`} className='sidebar-link' >
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

export default HOC(AllHourlyPricing)