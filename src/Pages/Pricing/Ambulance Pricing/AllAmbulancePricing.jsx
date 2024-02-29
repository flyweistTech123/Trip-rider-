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


const AllAmbulancePricing = () => {
    const navigate = useNavigate()
    const [ambulancepriceeData, setambulancepriceData] = useState([]);

    useEffect(() => {
        fetchAmbulancepriceData();
    }, []);

    const fetchAmbulancepriceData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/ambulanceVehicle')
            .then(response => {
                setambulancepriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Ambulance Price data:', error);
            });
    };

    const deleteAmbulance = (ambulancepriceId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/ambulanceVehicle/${ambulancepriceId}`)
            .then(response => {
                setambulancepriceData();
                toast.success("Ambulance Price deleted successfully");
            })
            .catch(error => {
                console.error('Error to delete Ambulance Price:', error);
                toast.error("Error to delete Ambulance Price");
            });
    };





    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Ambulance Pricing</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={()=>navigate('/addambulancepricing')}>Add Pricing</button>
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
                                    <th>Ambulance Type</th>
                                    <th>Image</th>
                                    <th>Price/Km</th>
                                    <th>Base Price</th>
                                    <th>Tax Rate</th>
                                    <th>GST Rate</th>
                                    <th>Service Charge</th>
                                    <th>Night Charges</th>
                                    <th>Waiting Charge</th>
                                    <th>Traffic Charge</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ambulancepriceeData.map(ambulanceprice => (
                                    <tr key={ambulanceprice.id}>
                                        <td>{ambulanceprice.name}</td>
                                        <td><img src={ambulanceprice.image} alt="" /></td>
                                        <td style={{ color: '#F52D56' }}>₹ {ambulanceprice.perKm}</td>
                                        <td>₹ {ambulanceprice.basePrice}</td>
                                        <td>{ambulanceprice.taxRate}</td>
                                        <td>{ambulanceprice.gstRate}</td>
                                        <td>{ambulanceprice.serviceCharge}</td>
                                        <td>{ambulanceprice.nightCharges}</td>
                                        <td>{ambulanceprice.waitingCharge}</td>
                                        <td>{ambulanceprice.trafficCharge}</td>
                                        <td className='rider9'>
                                            <div className='rider10' onClick={() => deleteAmbulance(ambulanceprice._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider10'>
                                                <Link to={`/updateambulancepricing/${ambulanceprice._id}`} className='sidebar-link' >
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

export default HOC(AllAmbulancePricing)