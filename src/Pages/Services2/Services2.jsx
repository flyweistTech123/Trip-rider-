import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Services2.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';


// import img from '../../Images/img5.png'


const Services2 = () => {
    const [riderData, setRiderData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchRiderData();
    }, []);

    const fetchRiderData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/serviceCategory')
            .then(response => {
                setRiderData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching rider data:', error);
            });
    };

    const deleteRider = (riderId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/serviceCategory/${riderId}`)
            .then(response => {
                // console.log('Rider deleted successfully');
                toast.success("Service deleted successfully");
                fetchRiderData();
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
                            <button onClick={()=>navigate('/add_service')}>Add Services</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
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
                                {riderData.map(rider => (
                                    <tr key={rider.id}>
                                        <td className='service9'><img src={rider.banner} /></td>
                                        <td className='service10'><img src={rider.image} /></td>
                                        <td>{rider.category}</td>
                                        <td>{rider.type}</td>
                                        <td>{rider.description}</td>
                                        <td>
                                            <div className='service11'>
                                            <div className='rider10' onClick={() => deleteRider(rider._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider10'>
                                                <Link to={`/Update_Service/${rider._id}`} className='sidebar-link' >
                                                    <MdEdit color='#667085' size={20} />
                                                    <p>Edit</p>
                                                </Link>
                                            </div>
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

export default HOC(Services2)