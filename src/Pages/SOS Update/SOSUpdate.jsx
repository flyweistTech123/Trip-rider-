import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SOSUpdate.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";


const SOSUpdate = () => {
    const [sosdata, setSosData] = useState([]);

    const fetchSOSData = async () => {
        try {
            const response = await axios.get('https://rajiv-cab-mu.vercel.app/api/v1/getAllSosRequest');
            setSosData(response.data.data);
        } catch (error) {
            console.error('Error fetching SOS data:', error);
        }
    };

    useEffect(() => {
        fetchSOSData();
    }, []);


    const navigate = useNavigate();



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>SOS Update</h6>
                        </div>

                        <div className='rider4'>
                            {/* <button onClick={()=>navigate('/refundtransaction')}>Refund list</button> */}
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Sos Id</th>
                                    <th>Location</th>
                                    <th>Reason for Request</th>
                                    <th>status</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sosdata && sosdata.length > 0 ? (
                                    sosdata.map(SOS => (
                                        <tr key={SOS.id}>
                                            <td className='rider8'><img src={SOS?.user?.profilePicture} style={{ width: '50px' }} />
                                                {SOS?.user?.name}</td>
                                            <td>{(SOS.id)}</td>
                                            <td>{(SOS.locationInWord)}</td>
                                            <td>{(SOS.reason)}</td>
                                            <td>{(SOS.status)}</td>
                                            <td className='rider9'>
                                                <div className='rider10'>
                                                    <Link to={`/soslocation/${SOS._id}`} className='sidebar-link' >
                                                        <IoLocationSharp color='#000000' size={22} />
                                                        <p style={{ fontSize: '10px' }}>Track Live Location</p>
                                                    </Link>
                                                </div>
                                                <div className='rider10'>
                                                    <Link to={`/updateoutstationpricing/${SOS._id}`} className='sidebar-link' >
                                                        <MdEdit color='#000000' size={20} />
                                                        <p>Edit</p>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(SOSUpdate);
