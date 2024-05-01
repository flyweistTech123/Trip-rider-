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


const AllBasepricing = () => {
    const navigate = useNavigate()
    const [basepriceData, setBasepriceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchBasepriceData();
    }, []);

    const fetchBasepriceData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/get')
            .then(response => {
                setBasepriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching base Pricing data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPriceData = basepriceData.filter(price =>
        price?.vehicle?.name && price?.vehicle?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deletePrice = (basepriceId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/delete/${basepriceId}`)
            .then(response => {
                setBasepriceData();
                toast.success("Base Pricing deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting Base Pricing:', error);
                toast.error("Error deleting Base Pricing");
            });
    };





    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Base Pricing</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/addbasepricing')}>Add Pricing</button>
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
                                    <th>Vehicle</th>
                                    <th>City</th>
                                    <th>Price/Min</th>
                                    <th>Price</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Base pricing...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredPriceData.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Price not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredPriceData.map(baseprice => (
                                                <tr key={baseprice.id}>
                                                    <td>{baseprice?.vehicle?.name}</td>
                                                    <td>{baseprice?.city?.city}</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {baseprice.pricePerMin}/Min</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {baseprice.price}</td>
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deletePrice(baseprice._id)}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                        <div className='rider10'>
                                                            <Link to={`/updatebasepricing/${baseprice._id}`} className='sidebar-link' >
                                                                <MdEdit color='#667085' size={20} />
                                                                <p>Edit</p>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            basepriceData.map(baseprice => (
                                                <tr key={baseprice.id}>
                                                    <td>{baseprice?.vehicle?.name}</td>
                                                    <td>{baseprice?.city?.city}</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {baseprice.pricePerMin}/Min</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {baseprice.price}</td>
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deletePrice(baseprice._id)}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                        <div className='rider10'>
                                                            <Link to={`/updatebasepricing/${baseprice._id}`} className='sidebar-link' >
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

export default HOC(AllBasepricing)