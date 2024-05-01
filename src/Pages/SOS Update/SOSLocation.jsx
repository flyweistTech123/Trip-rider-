import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SOSUpdate.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate, useParams } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaShareNodes } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import MapComponent from '../../Components/Map/Map'
import { WhatsappShareButton } from 'react-share';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


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
                const response = await axios.get(`${BaseUrl}api/v1/getSosRequestById/${id1}`, getAuthHeaders());
                const { user, locationInWord, reason, id, location } = response.data.data;
                setUserName(user?.name);
                setMobileNumber(user?.mobileNumber);
                setEmail(user?.email);
                setLocation(locationInWord);
                setReason(reason)
                setSOSId(id);
                setLatitude(location?.coordinates[0]);
                setLongitude(location?.coordinates[1]);
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
                            <h6>SOS Details</h6>
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
                            <MapComponent latitude={latitude} longitude={longitude} />
                        </div>
                    </div>


                    <div className='sos5'>
                        <WhatsappShareButton
                            url={`Your URL or content to share`}
                            title={`SOS details: 
                                SOS ID - ${sosId},
                                User - ${username}, 
                                Location - ${location}, 
                                Reason - ${reason}`
                            }
                            separator=" - "
                        >
                            <button>
                                <FaShareAlt /> Share on WhatsApp
                            </button>
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(SOSLocation);
