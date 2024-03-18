import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SettleBooking.css'
import HOC from '../../Components/HOC/HOC'
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { toast } from "react-toastify";

import { useNavigate, useParams } from 'react-router-dom';

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
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224356.85923040556!2d77.23700973928678!3d28.522404037240698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710743800478!5m2!1sen!2sin" width="1000" height="253" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
                                                <p>10:42 AM</p>
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
                                                <p>John Doe</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Email</label>
                                            <div className='settledriver66'>
                                                <p>johndoe@example.com</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Mobile Number</label>
                                            <div className='settledriver66'>
                                                <p>+91 1234567895</p>
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
                                                <p>John Doe</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Email</label>
                                            <div className='settledriver66'>
                                                <p>johndoe@example.com</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Mobile Number</label>
                                            <div className='settledriver66'>
                                                <p>+91 1234567895</p>
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
