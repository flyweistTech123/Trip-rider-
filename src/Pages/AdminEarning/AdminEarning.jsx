import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminEarning.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import CustomPagination from '../../Components/Pagination/Pagination';



// import img from '../../Images/img5.png'


const AdminEarning = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchTransactionData();
    }, [selectedServiceType, page, limit, search]);



    const fetchTransactionData = () => {
        let apiUrl = `${BaseUrl}api/v1/getAllBookingTransaction?page=${page}&limit=${limit}&search=${search}&`;

        if (selectedServiceType) {
            apiUrl += `type=${selectedServiceType}`;
        }

        axios.get(apiUrl, getAuthHeaders())
            .then(response => {
                setTransactionData(response.data.data.docs);
                setTotalPages(response.data.data.pages);
            })
            .catch(error => {
                console.error('Error fetching transaction data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };



    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setLoading(true);
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleServiceTypeChange = (event) => {
        setSelectedServiceType(event.target.value);
    };

    const filteredBookingData = transactionData.filter(transaction => {
        const userNameMatches = transaction?.user?.name && transaction?.user?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const driverNameMatches = transaction?.driverId?.name && transaction?.driverId?.name.toLowerCase().includes(searchQuery.toLowerCase());

        return userNameMatches || driverNameMatches;
    });


    const handleExport = () => {
        const exportUrl = `${BaseUrl}api/v1/downloadBookingPayment`;

        axios.get(exportUrl, getAuthHeaders())
            .then(response => {
                const downloadUrl = response.data.data;
                window.open("https://admin.flyweistechnologies.com/api/"+downloadUrl, '_blank');
            })
            .catch(error => {
                console.error('Error exporting data:', error);
                toast.error('Failed to export data. Please try again later.');
            });
    };



    
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
                            <h6>All Transaction</h6>
                        </div>

                        <div className='rider4'>
                            <div className='adminearning'>
                                <select value={selectedServiceType} onChange={handleServiceTypeChange}>
                                    <option value="">All Services</option>
                                    <option value="superCar">superCar</option>
                                    <option value="vehicleAmbulance">vehicleAmbulance</option>
                                    <option value="vehicle">vehicle</option>
                                </select>
                            </div>
                            <button onClick={handleExport}>Export</button>
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
                                    <th>Driver</th>
                                    <th>Service Type</th>
                                    <th>(₹)Amount</th>
                                    <th>(₹)Driver Amount</th>
                                    <th>(₹)Admin Amount</th>
                                    <th>paymentMode</th>
                                    <th>Transaction Status</th>
                                    {/* <th>Action Buttons</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="10" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Transactions...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredBookingData.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Transactions not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredBookingData.map(transaction => (
                                                <tr key={transaction.id}>
                                                    <td>{transaction.id}</td>
                                                    <td>{transaction?.bookingId?.bookingId}</td>
                                                    <td>{transaction?.user?.name}</td>
                                                    <td>{transaction?.driverId?.name}</td>
                                                    <td>{transaction?.bookingId?.serviceType}</td>
                                                    <td>{transaction?.amount}</td>
                                                    <td>{transaction?.driverAmount}</td>
                                                    <td>{transaction?.adminAmount}</td>
                                                    <td>{transaction?.paymentMode}</td>
                                                    <td>{transaction?.transactionStatus}</td>
                                                </tr>
                                            ))
                                            :
                                            transactionData.map(transaction => (
                                                <tr key={transaction.id}>
                                                    <td>{transaction.id}</td>
                                                    <td>{transaction?.bookingId?.bookingId}</td>
                                                    <td>{formatDate(transaction.createdAt)}</td>
                                                    <td>{transaction?.user?.name}</td>
                                                    <td>{transaction?.driverId?.name}</td>
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

export default HOC(AdminEarning)