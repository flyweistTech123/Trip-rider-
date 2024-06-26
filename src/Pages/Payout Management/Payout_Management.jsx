import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Payout_Management.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import Pagination from 'react-bootstrap/Pagination';
import CustomPagination from '../../Components/Pagination/Pagination';


const Payout_Management = () => {
    const [payoutdata, setPayoutData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);





    const fetchPayoutData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/getAllPayoutTransaction?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setPayoutData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching wallet data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);


    useEffect(() => {
        fetchPayoutData();
    }, [limit, search, page]);



    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setLoading(true);
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredrefundData = payoutdata.filter(payout =>
        payout.name && payout.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


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


    const navigate = useNavigate();



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Payout Management</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/refundtransaction')}>Refund list</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search name'
                                    onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Name</th>
                                    <th>Mobile Number</th>
                                    <th>Account Number</th>
                                    <th>Ifsc Code</th>
                                    <th>UPI Id</th>
                                    <th>Payment Method</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>status</th>
                                    <th>Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="11" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Loading payout...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredrefundData.length === 0 ? (
                                        <tr>
                                            <td colSpan="11" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>detail not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?

                                            filteredrefundData.map(payout => (
                                                <tr key={payout.id}>
                                                    <td className='rider8'>{payout?.id}</td>
                                                    <td>{(payout.name)}</td>
                                                    <td>{(payout.mobileNumber)}</td>
                                                    <td>{(payout.accountNumber)}</td>
                                                    <td>{(payout.ifsc)}</td>
                                                    <td>{(payout.upiId)}</td>
                                                    <td>{(payout.paymentMethod)}</td>
                                                    <td>{formatDate(payout.createdAt)}</td>
                                                    <td>{formatTime(payout.createdAt)}</td>
                                                    <td style={{
                                                        color: payout.status === 'FAILED' ? '#F52D56' :
                                                            payout.status === 'PENDING' ? '#FBAC2C' :
                                                                payout.status === 'PAID' ? '#609527' : 'black',
                                                        fontWeight: '600'
                                                    }}>
                                                        {payout.status}
                                                    </td>
                                                    <td className='payuser4'><button onClick={() => navigate(`/pay_user/${payout._id}`)}>Pay</button></td>
                                                </tr>
                                            ))
                                            :
                                            payoutdata.map(payout => (
                                                <tr key={payout.id}>
                                                    <td className='rider8'>{payout?.id}</td>
                                                    <td>{(payout.name)}</td>
                                                    <td>{(payout.mobileNumber)}</td>
                                                    <td>{(payout.accountNumber)}</td>
                                                    <td>{(payout.ifsc)}</td>
                                                    <td>{(payout.upiId)}</td>
                                                    <td>{(payout.paymentMethod)}</td>
                                                    <td>{formatDate(payout.createdAt)}</td>
                                                    <td>{formatTime(payout.createdAt)}</td>
                                                    <td style={{
                                                        color: payout.status === 'FAILED' ? '#F52D56' :
                                                            payout.status === 'PENDING' ? '#FBAC2C' :
                                                                payout.status === 'PAID' ? '#609527' : 'black',
                                                        fontWeight: '600'
                                                    }}>
                                                        {payout.status}
                                                    </td>
                                                    <td className='payuser4'><button onClick={() => navigate(`/pay_user/${payout._id}`)}>Pay</button></td>
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

export default HOC(Payout_Management);
