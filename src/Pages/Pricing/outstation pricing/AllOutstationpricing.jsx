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


const AllOutstationpricing = () => {
    const navigate = useNavigate()
    const [outstationpriceeData, setOutstationpriceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchOutstationpriceData();
    }, []);

    const fetchOutstationpriceData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/OutStationPricing/get')
            .then(response => {
                setOutstationpriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching outstation Price data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPriceData = outstationpriceeData.filter(price =>
        price?.vehicle?.name && price?.vehicle?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const deletePrice = (outstationpriceId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/OutStationPricing/delete/${outstationpriceId}`)
            .then(response => {
                fetchOutstationpriceData();
                toast.success("Outstation Price deleted successfully");
            })
            .catch(error => {
                console.error('Error to delete Outstation Price:', error);
                toast.error("Error to delete Outstation Price");
            });
    };





    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All OutStation Pricing</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/addoutstationpricing')}>Add Pricing</button>
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
                                    <th>km Limit</th>
                                    <th>km Price</th>
                                    <th>Hours Limit</th>
                                    <th>Hours Price</th>
                                    <th>Price</th>
                                    <th>Type</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Outstation Pricing...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredPriceData.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Price not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredPriceData.map(outstationprice => (
                                                <tr key={outstationprice.id}>
                                                    <td>{outstationprice?.vehicle?.name}</td>
                                                    <td>{outstationprice?.city?.city}</td>
                                                    <td>{outstationprice.kmLimit} Km</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {outstationprice.kmPrice}</td>
                                                    <td>{outstationprice.hrLimit} hr</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {outstationprice.hrPrice}</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {outstationprice.price}</td>
                                                    <td>{outstationprice.type}</td>
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deletePrice(outstationprice._id)}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                        <div className='rider10'>
                                                            <Link to={`/updateoutstationpricing/${outstationprice._id}`} className='sidebar-link' >
                                                                <MdEdit color='#667085' size={20} />
                                                                <p>Edit</p>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            : outstationpriceeData.map(outstationprice => (
                                                <tr key={outstationprice.id}>
                                                    <td>{outstationprice?.vehicle?.name}</td>
                                                    <td>{outstationprice?.city?.city}</td>
                                                    <td>{outstationprice.kmLimit} Km</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {outstationprice.kmPrice}</td>
                                                    <td>{outstationprice.hrLimit} hr</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {outstationprice.hrPrice}</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {outstationprice.price}</td>
                                                    <td>{outstationprice.type}</td>
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deletePrice(outstationprice._id)}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                        <div className='rider10'>
                                                            <Link to={`/updateoutstationpricing/${outstationprice._id}`} className='sidebar-link' >
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

export default HOC(AllOutstationpricing)