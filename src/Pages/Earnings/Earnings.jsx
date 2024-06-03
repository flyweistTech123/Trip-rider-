import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Earnings.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import Pagination from 'react-bootstrap/Pagination';


import { IoSearch } from "react-icons/io5";


const Earnings = () => {
    const [earningdata, setEarningData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const fetchEarningData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/admin/all/driver?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setEarningData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching rider data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);


    useEffect(() => {
        fetchEarningData();
    }, [limit, search, page]);


    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }


    const handleSearch = (event) => {
        setPage(1);
        setSearch(event.target.value);
    };




    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Earnings</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search admin' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>(₹)Wallet</th>
                                    <th>(₹)Cash In Hand</th>
                                    <th>(₹)Admin Cash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading...</td>
                                    </tr>
                                ) : earningdata.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Transactions not found</td>
                                    </tr>
                                ) : (

                                    earningdata.map(earn => (
                                        <tr key={earn.id}>
                                            <td className='rider8'>
                                                <img src={earn.profilePicture} style={{ width: "50px" }} />
                                                {earn.name}
                                            </td>
                                            <td>{earn.email}</td>
                                            <td>{earn.mobileNumber}</td>
                                            <td>{earn.wallet}</td>
                                            <td>{earn.cashInHand}</td>
                                            <td>{earn.adminCash}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='rider_details555'>
                    <Pagination >
                        <Pagination.First onClick={() => handlePageChange(1)} />
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item key={number + 1} active={number + 1 === page} onClick={() => handlePageChange(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default HOC(Earnings);
