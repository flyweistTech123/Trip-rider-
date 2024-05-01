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
import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';




// import img from '../../Images/img5.png'


const Alldailypricing = () => {
    const navigate = useNavigate()
    const [dailypriceData, setDailypriceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchDailypriceData();
    }, []);

    const fetchDailypriceData = () => {
        axios.get(`${BaseUrl}api/v1/Pricing`, getAuthHeaders())
            .then(response => {
                setDailypriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Daily Price data:', error);
            })
            .finally(() => {
                setLoading(false);
            });

    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPriceData = dailypriceData.filter(price =>
        price?.vehicle?.name && price?.vehicle?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deletePrice = (dailypriceId) => {
        axios.delete(`${BaseUrl}api/v1/Pricing/${dailypriceId}`, getAuthHeaders())
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
                            <button onClick={() => navigate('/adddailypricing')}>Add Pricing</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Vehicle' value={searchQuery}
                                    onChange={handleSearch} />
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
                                    <th>Price/Km</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Daily Pricing...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredPriceData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Price not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredPriceData.map(dailyprice => (
                                                <tr key={dailyprice.id}>
                                                    <td>{dailyprice?.vehicle?.name}</td>
                                                    <td>{dailyprice?.city?.city}</td>
                                                    <td>{dailyprice.toKm} Km</td>
                                                    <td>{dailyprice.fromKm} Km</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {dailyprice.pricePerKm}/Km</td>
                                                    {/* <td style={{ color: '#F52D56' }}>₹ {dailyprice.price}</td> */}
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deletePrice(dailyprice._id)}>
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
                                            ))
                                            :
                                            dailypriceData.map(dailyprice => (
                                                <tr key={dailyprice.id}>
                                                    <td>{dailyprice?.vehicle?.name}</td>
                                                    <td>{dailyprice?.city?.city}</td>
                                                    <td>{dailyprice.toKm} Km</td>
                                                    <td>{dailyprice.fromKm} Km</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {dailyprice.pricePerKm}/Km</td>
                                                    {/* <td style={{ color: '#F52D56' }}>₹ {dailyprice.price}</td> */}
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deletePrice(dailyprice._id)}>
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
                                            ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Alldailypricing)