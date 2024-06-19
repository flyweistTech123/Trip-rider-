import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Drivers.css'
import { Link, useNavigate } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';



// import img from '../../Images/img5.png'


const Driver_Earning = () => {
    const [bookingData, setBookingData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [drivername, setDrivername] = useState('Driver');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const { id } = useParams();



    const fetchBookingData = () => {
        axios.get(`${BaseUrl}api/v1/getDriverEarning/${id}`, getAuthHeaders())
            .then(response => {
                setBookingData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Earning data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders());
            const DriverName = response.data.data?.name;
            if (DriverName) {
                setDrivername(DriverName)
            } else {
                setDrivername('Driver');
            }
        } catch (error) {
            console.error('Error fetching rider data:', error);
        }
    };

    useEffect(() => {
        fetchBookingData();
        fetchUserData();
    }, [id]);



    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBookingData = bookingData.filter(booking => {
        const userNameMatches = booking?.userId?.name && booking?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const driverNameMatches = booking?.driver?.name && booking?.driver?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const VendorNameMatches = booking?.vendorId?.name && booking?.vendorId?.name.toLowerCase().includes(searchQuery.toLowerCase());

        return userNameMatches || driverNameMatches || VendorNameMatches;
    });


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return `${formattedDate} `;
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>{drivername}’s Earning</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate(-1)}>Back</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id=""
                                    placeholder='Search booking'
                                    onChange={handleSearch}
                                    value={searchQuery}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>User</th>
                                    <th>Service Type</th>
                                    <th>Amount</th>
                                    <th>Admin Amount</th>
                                    <th>Driver Amount</th>
                                    <th>Status</th>
                                    <th>payment Mode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="10" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading {drivername}'s Earnings...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredBookingData.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Earning not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredBookingData.map(transaction => (
                                                <tr key={transaction.id}>
                                                    <td>{transaction.id}</td>
                                                    <td>{transaction?.bookingId?.bookingId}</td>
                                                    <td>{formatDate(transaction.createdAt)}</td>
                                                    <td>{transaction?.user?.name}</td>
                                                    <td>{transaction?.bookingId?.serviceType}</td>
                                                    <td>{transaction?.amount}</td>
                                                    <td>{transaction?.driverAmount}</td>
                                                    <td>{transaction?.adminAmount}</td>
                                                    <td>{transaction?.paymentMode}</td>
                                                    <td>{transaction?.transactionStatus}</td>
                                                </tr>
                                            ))
                                            : bookingData.length === 0 ? ( // Check if filtered data is empty
                                                <tr>
                                                    <td colSpan="10" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>No Earnings found for {drivername}.</td>
                                                </tr>
                                            ) :
                                                bookingData.map(transaction => (
                                                    <tr key={transaction.id}>
                                                        <td>{transaction.id}</td>
                                                        <td>{transaction?.bookingId?.bookingId}</td>
                                                        <td>{formatDate(transaction.createdAt)}</td>
                                                        <td>{transaction?.user?.name}</td>
                                                        <td>{transaction?.bookingId?.serviceType}</td>
                                                        <td>{transaction?.amount}</td>
                                                        <td>{transaction?.driverAmount}</td>
                                                        <td>{transaction?.adminAmount}</td>
                                                        <td>{transaction?.paymentMode}</td>
                                                        <td>{transaction?.transactionStatus}</td>
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

export default HOC(Driver_Earning)