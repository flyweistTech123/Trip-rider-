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


const AllTaxpricing = () => {
    const navigate = useNavigate()
    const [taxpriceeData, setTaxpriceData] = useState([]);

    useEffect(() => {
        fetchTaxpriceData();
    }, []);

    const fetchTaxpriceData = () => {
        axios.get(`${BaseUrl}api/v1/Taxes/get`, getAuthHeaders())
            .then(response => {
                setTaxpriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Tax Price data:', error);
            });
    };

    const deletePrice = (taxpriceId) => {
        axios.delete(`${BaseUrl}api/v1/Taxes/delete${taxpriceId}`,getAuthHeaders() )
            .then(response => {
                fetchTaxpriceData();
                toast.success("Tax Price deleted successfully");
            })
            .catch(error => {
                console.error('Error to delete Tax Price:', error);
                toast.error("Error to delete Tax Price");
            });
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Tax Pricing</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={()=>navigate('/addtaxpricing')}>Add Pricing</button>
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
                                    <th>Base Price</th>
                                    <th>Night Charges</th>
                                    <th>Service Charges</th>
                                    <th>Waiting Charge</th>
                                    <th>Parking Rate</th>
                                    <th>Km Rate</th>
                                    <th>Time Rate</th>
                                    <th>PlateForm Charges</th>
                                    <th>Surge Charges</th>
                                    <th>Toll Charge</th>
                                    <th>Ride time Charges</th>
                                    <th>Cancellation Charges</th>
                                    <th>Other Charge</th>
                                    <th>Description</th>    
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxpriceeData.map(taxprice => (
                                    <tr key={taxprice.id}>
                                        <td>{taxprice.basePrice}</td>
                                        <td>{taxprice.nightCharges}</td>
                                        <td>{taxprice.serviceCharge}</td>
                                        <td>{taxprice.waitingCharge}</td>
                                        <td>{taxprice.ParkingRate}</td>
                                        <td>{taxprice.kmRate}</td>
                                        <td>{taxprice.timeRate}</td>
                                        <td>{taxprice.plateFormCharges}</td>
                                        <td>{taxprice.surgeCharges}</td>
                                        <td>{taxprice.tollCharge}</td>
                                        <td>{taxprice.ridetimeCharges}</td>
                                        <td>{taxprice.cancellationCharges}</td>
                                        <td>{taxprice.otherCharge}</td>
                                        <td>{taxprice.description}</td>
                                        <td className='rider9'>
                                            <div className='rider10' onClick={() => deletePrice(taxprice._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider10'>
                                                <Link to={`/updatetaxpricing/${taxprice._id}`} className='sidebar-link' >
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

export default HOC(AllTaxpricing)