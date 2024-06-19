import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllBookings.css'
import { Link, useNavigate } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import CustomPagination from '../../Components/Pagination/Pagination';



// import img from '../../Images/img5.png'


const AllBookings = () => {
    const [bookingData, setBookingData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchBookingData();
    }, [limit, search, page]);

    const fetchBookingData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/getBooking?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setBookingData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching Bookings data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setLoading(true);
    };



    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBookingData = bookingData.filter(booking => {
        const userNameMatches = booking?.userId?.name && booking?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const driverNameMatches = booking?.driver?.name && booking?.driver?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const VendorNameMatches = booking?.vendorId?.name && booking?.vendorId?.name.toLowerCase().includes(searchQuery.toLowerCase());

        return userNameMatches || driverNameMatches || VendorNameMatches;
    });

    const navigate = useNavigate();


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Booking</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/bookings')}>Back</button>
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
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>User</th>
                                    <th>Driver</th>
                                    <th>Vendor</th>
                                    <th>Timing</th>
                                    <th>Distance</th>
                                    <th>(₹)Total Bill</th>
                                    <th>Vehicle Name</th>
                                    <th>Status</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="11" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Loading bookings...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredBookingData.length === 0 ? (
                                        <tr>
                                            <td colSpan="11" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Booking not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredBookingData.map(booking => (
                                                <tr key={booking.id}>
                                                    <td>{booking.bookingId}</td>
                                                    <td>{booking?.date}</td>
                                                    <td>{booking?.userId?.name}</td>
                                                    <td>{booking?.driver?.name}</td>
                                                    <td>{booking?.vendorId?.name}</td>
                                                    <td>{booking?.time}</td>
                                                    <td>{booking?.distance} Km</td>
                                                    <td>{booking?.totalPrice}</td>
                                                    <td>
                                                        {booking?.serviceType === 'superCar' ? (
                                                            booking?.superCar?.name

                                                        ) : booking?.serviceType === 'ambulance' ? (
                                                            booking?.vehicleAmbulance?.name
                                                        ) : (
                                                            booking?.car?.name
                                                        )
                                                        }
                                                    </td>
                                                    <td style={{
                                                        color: booking?.status === 'cancel' ? '#F52D56' :
                                                            booking?.status === 'autoCancelled' ? '#F52D56' :
                                                                booking?.status === 'pending' ? '#FBAC2C' :
                                                                    booking?.status === 'complete' ? '#609527' : 'black',
                                                        fontWeight: '600'
                                                    }}>
                                                        {booking?.status}
                                                    </td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10'>
                                                                <Link to={`/bookingdetails/${booking._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#667085' size={20} />
                                                                    <p>View</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            : bookingData.length === 0 ? ( // Check if filtered data is empty
                                                <tr>
                                                    <td colSpan="10" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>No bookings found.</td>
                                                </tr>
                                            ) :
                                                bookingData.map(booking => (
                                                    <tr key={booking.id}>
                                                        <td>{booking.bookingId}</td>
                                                        <td>{booking?.date}</td>
                                                        <td>{booking?.userId?.name}</td>
                                                        <td>{booking?.driver?.name}</td>
                                                        <td>{booking?.vendorId?.name}</td>
                                                        <td>{booking?.time}</td>
                                                        <td>{booking?.distance} Km</td>
                                                        <td>{booking?.totalPrice}</td>
                                                        <td>
                                                            {booking?.serviceType === 'superCar' ? (
                                                                booking?.superCar?.name

                                                            ) : booking?.serviceType === 'ambulance' ? (
                                                                booking?.vehicleAmbulance?.name
                                                            ) : (
                                                                booking?.car?.name
                                                            )
                                                            }
                                                        </td>
                                                        <td style={{
                                                            color: booking?.status === 'cancel' ? '#F52D56' :
                                                                booking?.status === 'autoCancelled' ? 'red' :
                                                                    booking?.status === 'pending' ? '#FBAC2C' :
                                                                        booking?.status === 'complete' ? '#609527' : 'black',
                                                            fontWeight: '600'
                                                        }}>
                                                            {booking?.status}
                                                        </td>
                                                        <td>
                                                            <div className='rider9'>
                                                                <div className='rider10'>
                                                                    <Link to={`/bookingdetails/${booking._id}`} className='sidebar-link' >
                                                                        <IoEyeOutline color='#667085' size={20} />
                                                                        <p>View</p>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))

                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='rider_details555'>
                    <CustomPagination
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

export default HOC(AllBookings)