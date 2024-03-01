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
    const [basepriceeData, setBasepriceData] = useState([]);

    useEffect(() => {
        fetchBasepriceData();
    }, []);

    const fetchBasepriceData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/get')
            .then(response => {
                setBasepriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching base Price data:', error);
            });
    };

    const deleteDriver = (basepriceId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/delete/${basepriceId}`)
            .then(response => {
                fetchBasepriceData();
                toast.success("Base Price deleted successfully");
            })
            .catch(error => {
                console.error('Error to delete Base Price:', error);
                toast.error("Error to delete Base Price");
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
                            <button onClick={()=>navigate('/addbasepricing')}>Add Pricing</button>
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
                                    <th>Service Charge</th>
                                    <th>Night Charges</th>
                                    <th>Waiting Charge</th>
                                    <th>Traffic Charge</th>
                                    <th>GST Rate</th>
                                    <th>TAX Rate</th>
                                    <th>Price</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {basepriceeData.map(baseprice => (
                                    <tr key={baseprice.id}>
                                        <td>{baseprice?.vehicle?.name}</td>
                                        <td>{baseprice.city.city}</td>
                                        <td>{baseprice.serviceCharge}</td>
                                        <td>{baseprice.nightCharges}</td>
                                        <td>{baseprice.waitingCharge}</td>
                                        <td>{baseprice.trafficCharge}</td>
                                        <td>{baseprice.gstRate}</td>
                                        <td>{baseprice.taxRate}</td>
                                        <td style={{ color: '#F52D56' }}>₹ {baseprice.basePrice}</td>
                                        <td className='rider9'>
                                            <div className='rider10' onClick={() => deleteDriver(baseprice._id)}>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllBasepricing)