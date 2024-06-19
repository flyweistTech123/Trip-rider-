import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notification.css'
import HOC from '../../Components/HOC/HOC'
import Pagination from 'react-bootstrap/Pagination';

import { IoSearch } from "react-icons/io5";

import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { RiDeleteBinLine } from "react-icons/ri";
import Select from 'react-select';


import CustomPagination from '../../Components/Pagination/Pagination';









const Notification = () => {

    const [notificationdata, setNotificationData] = useState([]);
    const [drivernames, setDriverNames] = useState([]);
    const [vendornames, setVendorNames] = useState([]);
    const [usernames, setUserNames] = useState([]);
    const [message, setMessage] = useState("");
    const [total, setTotal] = useState("");
    const [title, setTitle] = useState("");
    const [sendTo, setSendTo] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(1);
    const [limitd, setLimitd] = useState('');
    const [limitv, setLimitv] = useState('');
    const [limitu, setLimitu] = useState('');
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const currentDate = new Date().toISOString().split('T')[0];


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchNotificationData();
        fetchDriver();
        fetchVendor();
        fetchUser();
    }, [limitd,]);


    const fetchData = async () => {
        try {
            const response1 = await axios.get(`${BaseUrl}api/v1/admin/all/driver?page=1&limit=${limitd}`, getAuthHeaders());
            const response2 = await axios.get(`${BaseUrl}api/v1/admin/all/vendor?page=1&limit=${limitv}`, getAuthHeaders());
            const response3 = await axios.get(`${BaseUrl}api/v1/admin/all/user?page=1&limit=${limitu}`, getAuthHeaders());
            setLimitd(response1.data.data.totalDocs)
            setLimitv(response2.data.data.totalDocs)
            setLimitu(response3.data.data.totalDocs)
        } catch (error) {
            console.error('Error fetching driver name:', error);
        }
    };


    const fetchDriver = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/driver?limit=${limitd}`, getAuthHeaders());
            setDriverNames(response.data.data.docs);
        } catch (error) {
            console.error('Error fetching driver name:', error);
        }
    };

    const fetchVendor = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/vendor?limit=${limitv}`, getAuthHeaders());
            setVendorNames(response.data.data.docs);
        } catch (error) {
            console.error('Error fetching Vendor name:', error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/user?limit=${limitu}`, getAuthHeaders());
            setUserNames(response.data.data.docs);
        } catch (error) {
            console.error('Error fetching User name:', error);
        }
    };







    const fetchNotificationData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/notify/GetAllNotification?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setNotificationData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching Notification data:', error);
            });
    }, [page, limit, search]);


    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };


    const deleteData = async (id) => {
        try {
            await axios.delete(`${BaseUrl}api/v1/notify/delete/${id}`, getAuthHeaders());
            toast.success("Notification Deleted");
            fetchNotificationData();
        } catch (error) {
            console.error('Error to delete Notification data:', error);
        }
    };



    const postData = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${BaseUrl}api/v1/notify/add`,
                {
                    body: message,
                    sendTo: sendTo,
                    total: total,
                    subject: title,
                    userId: selectedId,
                },
                getAuthHeaders()
            );
            toast.success("successfully created notification!");
            fetchNotificationData();
            setMessage('');
            setTitle('');
            setSendTo('');
            setTitle('');
            setTotal('')
        } catch (error) {
            console.error('Error creating notification:', error);
            toast.error("Error creating notification");
        }
    };




    const cancle = () => {
        setMessage('');
        setTitle('');
        setSendTo('');
        setTitle('');
        setTotal('')
    }










    return (
        <>
            <div className='rider'>
                <div className='dashboardconatiner'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Push Notification</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
                            </div>
                        </div>


                    </div>


                    <div className='notification'>
                        <div className='notification1'>
                            <div className='notification2'>
                                <div className='notification3'>
                                    <p>Send To</p>
                                    <div className='notification4'>
                                        <div className='notification5'>
                                            <input type="radio" name="status" value="ALL" checked={total === "ALL"} onChange={(e) => setTotal(e.target.value)} />
                                            <p>All</p>
                                        </div>
                                        <div className='notification5'>
                                            <input type="radio" name="status" value="SINGLE" checked={total === "SINGLE"} onChange={(e) => setTotal(e.target.value)} />
                                            <p>Single</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='notification6'>
                                    <label htmlFor="">User Type</label>
                                    <select onChange={(e) => setSendTo(e.target.value)}>
                                        <option value="">Select User Type</option>
                                        <option name="DRIVER" value="DRIVER">Driver</option>
                                        <option name="VENDOR" value="VENDOR" >Vendor</option>
                                        <option name="USER" value="USER" >User</option>
                                    </select>
                                </div>
                                {total === "SINGLE" && (
                                    <div className='notification6'>
                                        <label htmlFor="">Select the {sendTo}</label>
                                        <select onChange={(e) => setSelectedId(e.target.value)}
                                            value={selectedId}
                                        >
                                            <option value="">Select the individual {sendTo}</option>
                                            {sendTo === "DRIVER" ? (
                                                drivernames?.map(name => (
                                                    <option key={name._id} value={name._id}>{name.name}</option>
                                                ))
                                            ) : (
                                                sendTo === "VENDOR" ? (
                                                    vendornames?.map(name => (
                                                        <option key={name._id} value={name._id}>{name.name}</option>
                                                    ))
                                                ) : (
                                                    sendTo === "USER" ? (
                                                        usernames?.map(name => (
                                                            <option key={name._id} value={name._id}>{name.name}</option>
                                                        ))
                                                    ) : (
                                                        ""
                                                    )
                                                )
                                            )}

                                        </select>
                                        {loading && <div>Loading...</div>}

                                    </div>
                                )}
                            </div>


                        </div>

                        <div className='notification2'>
                            <div className='notification7'>
                                <label htmlFor="">Notification Title</label>
                                <input type="text" value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            {/* <div className='notification3'>
                                <p>Notification Status</p>
                                <div className='notification4'>
                                    <div className='notification5'>
                                        <input type="radio" name="status" value="PAID" />
                                        <p>Enable</p>
                                    </div>
                                    <div className='notification5'>
                                        <input type="radio" name="status" value="PENDING" />
                                        <p>Disable</p>
                                    </div>
                                </div>
                            </div> */}

                            <div className='notification8'>
                                <label htmlFor="date">Date Added</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={currentDate}
                                    readOnly // Set the readOnly attribute to true
                                />
                            </div>
                        </div>

                        <div className='notification2'>
                            <div className='notification7'>
                                <label htmlFor="">Notification Content</label>
                                <textarea name="" id="" cols="134" rows="5" value={message}
                                    onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className='notification9'>
                            <button onClick={cancle}>Cancel</button>
                            <button onClick={postData}>Save</button>
                        </div>
                    </div>


                    <div className='notification10'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Notification Title</th>
                                    <th>Notification Content</th>
                                    <th>Notification Status</th>
                                    <th>Date Added</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notificationdata.map(notification =>
                                    <tr key={notification.id}>
                                        <td>{notification.title}</td>
                                        <td>{notification.body}</td>
                                        <td style={{
                                            color:
                                                notification.status === 'ACTIVE' ? '#609527' : 'black',
                                            fontWeight: '600'
                                        }}>
                                            {notification.status}
                                        </td>
                                        <td>{notification.date}</td>
                                        <td>
                                            <div className='rider10' onClick={() => deleteData(notification._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                        </td>
                                    </tr>
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

export default HOC(Notification)