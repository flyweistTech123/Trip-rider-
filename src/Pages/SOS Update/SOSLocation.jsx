import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SOSUpdate.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate, useParams } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaShareNodes } from "react-icons/fa6";



const SOSLocation = () => {
    const { id } = useParams();
    const [username, setUserName] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('');
    const [reason, setReason] = useState('');
    const [sosId, setSOSId] = useState('');
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')

    useEffect(() => {
        const fetchSOSDetails = async (id1) => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/getSosRequestById/${id1}`);
                const { user, locationInWord, reason, id, location } = response.data.data;
                setUserName(user?.name);
                setMobileNumber(user?.mobileNumber);
                setEmail(user?.email);
                setLocation(locationInWord);
                setReason(reason)
                setSOSId(id);
                setLongitude(location?.coordinates[0]);
                setLatitude(location?.coordinates[1]);
            } catch (error) {
                console.error('Error fetching SOS details:', error);
            }
        };
        fetchSOSDetails(id);
    }, [id, latitude, longitude]);



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
                            <button onClick={() => navigate('/sos')}>Back</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>

                    <div className='sos'>
                        <div className='sos1'>
                            <div className='sos3'>
                                <label htmlFor="">SOS ID:</label>
                                <input type="text" value={sosId} />
                            </div >
                            <div className='sos3'>
                                <label htmlFor="">User Name</label>
                                <input type="text" value={username} />
                            </div>
                            <div className='sos3'>
                                <label htmlFor="">Email</label>
                                <input type="text" value={email} />
                            </div>
                            <div className='sos3'>
                                <label htmlFor="">Phone Number</label>
                                <input type="text" value={mobilenumber} />
                            </div>
                            <div className='sos3'>
                                <label htmlFor="">Location</label>
                                <input type="text" value={location} />
                            </div>

                            <div className='sos3'>
                                <label htmlFor="">Reason</label>
                                <input type="text" value={reason} />
                            </div>
                        </div>

                        <div className='sos2'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224356.85923040553!2d77.23700973928679!3d28.522404037240705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710487985029!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>


                    <div className='sos5'>
                        <button><FaShareNodes /> Share on Whatsapp</button>
                        <button>Send Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(SOSLocation);
