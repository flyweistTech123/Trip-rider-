import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './AllBookings.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import { useNavigate, useParams } from 'react-router-dom';
import MapComponentone from '../../Components/Map/Mapone'

const BookingDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [bookingdata, setBookingData] = useState(null);


    const fetchBookingData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/user/get/booking/by/${id}`, getAuthHeaders())
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
                                    <button onClick={() => navigate('/allbookings')}>Back</button>
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
                                                <p>{bookingdata.type}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Time</label>
                                            <div className='settledriver6'>
                                                <p>{bookingdata.time}</p>
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
                                                <p>{bookingdata.userId?.name}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Email</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.userId?.email}</p>
                                            </div>
                                        </div>
                                        <div className='settledriver5'>
                                            <label htmlFor="">Mobile Number</label>
                                            <div className='settledriver66'>
                                                <p>{bookingdata.userId?.mobileNumber}</p>
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
                                                    <td>-</td>
                                                    <td>{bookingdata?.price}</td>
                                                </tr>
                                                <tr>
                                                    <td>Customer Service</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.customerService}</td>
                                                </tr>
                                                <tr>
                                                    <td>service Tax</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.serviceTax}</td>
                                                </tr>

                                                <tr>
                                                    <td>Night Charges</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.nightCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>Parking Rate</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.ParkingRate}</td>
                                                </tr>
                                                <tr>
                                                    <td>km Rate</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.kmRate}</td>
                                                </tr>

                                                <tr>
                                                    <td>Time Rate</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.timeRate}</td>
                                                </tr>
                                                <tr>
                                                    <td>PlateForm Charges Gst</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.plateFormChargesGst}</td>
                                                </tr>
                                                <tr>
                                                    <td>PlateForm Charges</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.plateFormCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>SurgeCharges</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.surgeCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>Toll Charge</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.tollCharge}</td>
                                                </tr>
                                                <tr>
                                                    <td>RideTime Charges</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.rideTimeCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>Cancellation Charges</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.cancellationCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>Insurance Premium</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.insurancePremium}</td>
                                                </tr>
                                                <tr>
                                                    <td>Railway PickUp Charge</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.railwayPickUpCharge}</td>
                                                </tr>
                                                <tr>
                                                    <td>Waiting Charge</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.waitingCharge}</td>
                                                </tr>
                                                <tr>
                                                    <td>Other Charge</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.otherCharge}</td>
                                                </tr>
                                                <tr>
                                                    <td>Taxes</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.Taxes}</td>
                                                </tr>
                                                <tr>
                                                    <td>Net Price</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.netPrice}</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.discount}</td>
                                                </tr>
                                                <tr>
                                                    <td>Gst</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.gst}</td>
                                                </tr>
                                                <tr>
                                                    <td>Admin Amount</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.adminAmount}</td>
                                                </tr>
                                                <tr>
                                                    <td>Driver Commission</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.driverAmount}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total Amount</td>
                                                    <td>-</td>
                                                    <td>{bookingdata?.totalPrice}</td>
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

export default HOC(BookingDetails);
