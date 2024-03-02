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


const AllSuperCarPricing = () => {
    const navigate = useNavigate()
    const [supercarpriceeData, setSuperCarpriceData] = useState([]);

    useEffect(() => {
        fetchSupercarpriceData();
    }, []);

    const fetchSupercarpriceData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/SuperCarPricing?superCar=65ba340ea4036b1d793b3bcd')
            .then(response => {
                setSuperCarpriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Super car Price data:', error);
            });
    };

    const deleteSuperCar = (supercarpriceId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/delete/${supercarpriceId}`)
            .then(response => {
                fetchSupercarpriceData();
                toast.success("Super car Price deleted successfully");
            })
            .catch(error => {
                console.error('Error to delete Super car Price:', error);
                toast.error("Error to delete Super car Price");
            });
    };





    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Super car Pricing</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/addsupercarpricing')}>Add Pricing</button>
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
                                    <th>Super car Name</th>
                                    <th>Image</th>
                                    <th>kmLimit</th>
                                    <th>kmPrice</th>
                                    <th>Hourly Limit</th>
                                    <th>Hourly Price</th>
                                    <th>Price</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supercarpriceeData.map(supercarprice => (
                                    <tr key={supercarprice.id}>
                                        <td>{supercarprice?.name}</td>
                                        <td className='vehicle12'>
                                            <img src={supercarprice.image[0].img} alt="" />
                                        </td>
                                        <td>{supercarprice.kmLimit}</td>
                                        <td>{supercarprice.kmPrice}</td>
                                        <td>{supercarprice.hrLimit}</td>
                                        <td>{supercarprice.hrPrice}</td>
                                        <td style={{ color: '#F52D56' }}>₹ {supercarprice.price}</td>
                                        <td>
                                            <div className='service11'>
                                                <div className='rider10' onClick={() => deleteSuperCar(supercarprice._id)}>
                                                    <RiDeleteBinLine color='#667085' size={20} />
                                                    <p>Delete</p>
                                                </div>
                                                <div className='rider10'>
                                                    <Link to={`/updatenormalvehicles/${supercarprice._id}`} className='sidebar-link' >
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

export default HOC(AllSuperCarPricing)