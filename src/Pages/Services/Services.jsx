import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Services.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

import { useNavigate } from 'react-router-dom';


import img from '../../Images/imgvehicle.jpg'


const Services2 = () => {
    const [serviceData, setServiceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        fetchServiceData();
    }, []);

    const fetchServiceData = () => {
        axios.get(`${BaseUrl}api/v1/serviceCategory`, getAuthHeaders())
            .then(response => {
                setServiceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching rider data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredserviceData = serviceData.filter(service =>
        service.type && service.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteService = (serviceId) => {
        axios.delete(`${BaseUrl}api/v1/serviceCategory/${serviceId}`, getAuthHeaders() )
            .then(response => {
                toast.success("Service deleted successfully");
                fetchServiceData();
            })
            .catch(error => {
                console.error('Error deleting Service:', error);
                toast.error("Error deleting Service");
            });
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Services</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/add_service')}>Add Services</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search type' onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Banner</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Services...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredserviceData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Service not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredserviceData.map(service => (
                                                <tr key={service.id}>
                                                    <td className='service9'><img src={service.banner} /></td>
                                                    <td className='service10'>
                                                        <img src={service?.image || img} alt="No image" />
                                                    </td>
                                                    <td>{service.category}</td>
                                                    <td>{service.type}</td>
                                                    <td>
                                                        <div className='service12'>
                                                            {service.description}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='service11'>
                                                            <div className='rider10' onClick={() => deleteService(service._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/Update_Service/${service._id}`} className='sidebar-link' >
                                                                    <MdEdit color='#667085' size={20} />
                                                                    <p>Edit</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            : serviceData.map(service => (
                                                <tr key={service.id}>
                                                    <td className='service9'><img src={service.banner} /></td>
                                                    <td className='service10'>
                                                        <img src={service?.image || img} alt="No image" />
                                                    </td>
                                                    <td>{service.category}</td>
                                                    <td>{service.type}</td>
                                                    <td>
                                                        <div className='service12'>
                                                            {service.description}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='service11'>
                                                            <div className='rider10' onClick={() => deleteService(service._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/Update_Service/${service._id}`} className='sidebar-link' >
                                                                    <MdEdit color='#667085' size={20} />
                                                                    <p>Edit</p>
                                                                </Link>
                                                            </div>
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

export default HOC(Services2)