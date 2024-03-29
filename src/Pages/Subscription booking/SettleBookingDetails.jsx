import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SettleBooking.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import { useNavigate, useParams } from 'react-router-dom';
import MapComponentone from '../../Components/Map/Mapone'

const SettleBookingDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [bookingdata, setBookingData] = useState(null);


    const fetchBookingData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getSettleBookingById/${id}`, getAuthHeaders())
            setBookingData(response.data.data);
        } catch (error) {
            console.error('Error fetching Booking data:', error);
        }
    };

    useEffect(() => {
        fetchBookingData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return `${formattedDate} `;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);


        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedTime = `${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}${ampm}`;

        // Combine date and time
        return `${formattedTime} `;
    };








    return (
        <>
            <div className='rider'>
                <div className='dashboardconatiner'>
                    {bookingdata && (
                        <>
                            <div className='settledrivercantainer'>
                                <div className='settledriver1'>
                                    <h6>Map View</h6>
                                    <button onClick={() => navigate('/settlebooking')}>Back</button>
                                </div>

                                <div className='settledriver2'>
                                    <MapComponentone pickupLatitude={bookingdata.current.latitude} pickupLongitude={bookingdata.current.longitude} dropLatitude={bookingdata.drop.latitude}  dropLongitude={bookingdata.drop.longitude}  />
                                </div>

                                <div className='settledriver3'>
                                    <label htmlFor="">Trip Location</label>

                                    <div className='settledriver4'>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Pickup Location</label>
                                            <div className='settledriver6'>
                                                <p>{bookingdata.current.address}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Drop Location</label>
                                            <div className='settledriver6'>
                                                <p>{bookingdata.drop.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='settledriver3'>
                                    <label htmlFor="">Request</label>

                                    <div className='settledriver4'>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Type of Cab</label>
                                            <div className='settledriver6'>
                                                <p>Mini</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Time</label>
                                            <div className='settledriver6'>
                                                <p>{bookingdata.dropTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='settledriver3'>
                                    <label htmlFor="">User Details</label>

                                    <div className='settledriver4'>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Name</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.user?.name}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Email</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.user?.email}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Mobile Number</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.user?.mobileNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='settledriver3'>
                                    <label htmlFor="">Driver Details</label>

                                    <div className='settledriver4'>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Name</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.driver?.name}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Email</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.driver?.email}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Mobile Number</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.driver?.mobileNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='settledriver3'>
                                    <label htmlFor="">Bill Details</label>

                                    <div className='settledriver7'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Base Price</td>
                                                    <td>For First 10 Km</td>
                                                    <td>10</td>
                                                </tr>
                                                <tr>
                                                    <td>Additional Distance Price per Km</td>
                                                    <td>0 Km * ₹10/Km </td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Additional Time Price per Km</td>
                                                    <td>0 Mins * ₹10/Mins </td>
                                                    <td>0</td>
                                                </tr>

                                                <tr>
                                                    <td>Waiting Charge Per Minute</td>
                                                    <td>-</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Cancellation Fee</td>
                                                    <td>-</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Service tax</td>
                                                    <td>-</td>
                                                    <td>3</td>
                                                </tr>

                                                <tr>
                                                    <td>Promo Discount</td>
                                                    <td>-</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Admin Commission</td>
                                                    <td>-</td>
                                                    <td>3</td>
                                                </tr>
                                                <tr>
                                                    <td>Driver Commission</td>
                                                    <td>-</td>
                                                    <td>10</td>
                                                </tr>
                                                <tr>
                                                    <td>Total Amount</td>
                                                    <td>-</td>
                                                    <td>26</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>



                                </div>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default HOC(SettleBookingDetails);
