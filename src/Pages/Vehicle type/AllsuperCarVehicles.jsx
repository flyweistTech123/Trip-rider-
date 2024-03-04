import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";



// import img from '../../Images/img5.png'



const AllsuperCarVehicles = () => {
    const navigate = useNavigate();
    const [supercarData, setSuperCarData] = useState([]);

    useEffect(() => {
        fetchSuperCarData();
    }, []);

    const fetchSuperCarData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/SuperCar')
            .then(response => {
                setSuperCarData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Super Car data:', error);
            });
    };

    const deleteSuperCar = (supercarId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/vehicle/${supercarId}`)
            .then(response => {
                // console.log('Rider deleted successfully');
                toast.success("Super Car deleted successfully");
                fetchSuperCarData();
            })
            .catch(error => {
                console.error('Error deleting Super Car:', error);
                toast.error("Error deleting Super Car");
            });
    };


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Super Car Category</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/addsupercarvehicles')}>Add Super Car</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search vehicler' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>SR. No.</th>
                                    <th>Super car Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supercarData.map((supercar, index) => (
                                    <React.Fragment key={supercar._id}>
                                        {supercar.superCarPricing.map((pricing, pricingIndex) => (
                                            <tr key={pricing._id}>
                                                <td>{index + 1}</td>
                                                <td>{pricing.name}</td>
                                                <td className='vehicle12'>
                                                    <img src={pricing.image[0].img} alt="" />
                                                </td>
                                                <td  style={{ color: '#F52D56' }}>₹ {pricing.price}</td>
                                                <td className='vehicle3'>
                                                    {pricing.isActive ? (
                                                        <div className='vehicle'><p>Active</p></div>
                                                    ) : (
                                                        <div className='promo'><p>Not Active</p></div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className='service11'>
                                                        <div className='rider10' onClick={() => deleteSuperCar(pricing._id)}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                        <div className='rider10'>
                                                            <Link to={`/updatesupercarvehicles/${pricing._id}`} className='sidebar-link' >
                                                                <MdEdit color='#667085' size={20} />
                                                                <p>Edit</p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllsuperCarVehicles)