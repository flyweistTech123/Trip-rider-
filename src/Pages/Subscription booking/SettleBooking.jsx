import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SettleBooking.css'
import HOC from '../../Components/HOC/HOC'
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import CustomPagination from '../../Components/Pagination/Pagination';

import img2 from '../../Images/user.webp'


const SettleBooking = () => {
    const [settledata, setSettleData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [bookingId, setBookingId] = useState('')
    const [assignedDrivers, setAssignedDrivers] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const fetchSettleData = useCallback(async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getSettleBooking?page=${page}&limit=${limit}`, getAuthHeaders())
            setSettleData(response.data.data.docs);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error('Error fetching settle data:', error);
        }
        finally {
            setLoading(false);
        };
    }, [page, limit, search]);

    useEffect(() => {
        fetchSettleData();
    }, [limit, search, page]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setLoading(true);
    };




    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredbookingData = settledata.filter(booking =>
        booking?.user?.name && booking?.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
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




    function AssignDriverModal(props) {
        const [drivernames, setDriverNames] = useState([]);
        const [drivername, setDrivername] = useState("")
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(10);
        const [search, setSearch] = useState("");
        const [totalPages, setTotalPages] = useState(0);



        const fetchDriver = useCallback(async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/admin/all/driver?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders());
                setDriverNames(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            } catch (error) {
                console.error('Error fetching driver name:', error);
            }
        }, [page, limit, search]);

        useEffect(() => {
            fetchDriver();
        }, [fetchDriver]);

        const handlePut = async (e) => {
            e.preventDefault();
            try {
                await axios.put(
                    `${BaseUrl}api/v1/assignDriverOnSettleBooking/${bookingId}`,
                    {
                        driverId: drivername,
                    }
                );
                props.onHide();
                const updatedDrivers = { ...assignedDrivers, [bookingId]: drivername };
                setAssignedDrivers(updatedDrivers);
                localStorage.setItem('assignedDrivers', JSON.stringify(updatedDrivers));
                toast.success("Driver Assigned successfully");
                fetchSettleData();
            } catch (error) {
                toast.error("Error assigning Driver");
            }
        }


        const handlePageChange = (newPage) => {
            if (newPage < 1 || newPage > totalPages) return;
            setPage(newPage);
            setLoading(true);
        };


        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter">Assign a Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePut}>
                        <div className='settledriver'>
                            <div className='dailyprice2'>
                                <label htmlFor="">Drivers</label>
                                <select onChange={(e) => setDrivername(e.target.value)}>
                                    <option value="">Select Driver</option>
                                    {drivernames?.map(name => (
                                        <option key={name._id} value={name._id}>{name.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='rider_details555'>
                            <CustomPagination
                                page={page}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                            />
                        </div>

                        <Modal.Footer>
                            <Button className='sos6' type="submit">Assign</Button>
                        </Modal.Footer>
                    </Form>

                </Modal.Body>
            </Modal>
        );
    }


    function CancelBookingModal(props) {

        const CancelBooking = async (e) => {
            e.preventDefault();
            try {
                await axios.put(
                    `${BaseUrl}api/v1/cancelSettleBooking/${bookingId}`, getAuthHeaders()
                );
                props.onHide();
                fetchSettleData();
                toast.success("The Booking Canceled successfully");
            } catch (error) {
                toast.error("Error to cancel the Booking");
            }
        };
        return (
            <Modal
                {...props}
                size="sl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter">Cancel Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='CancelBookingModal1'>
                        <h6>Are you sure you want to cancel this booking?</h6>

                        <div className='CancelBookingModal2'>
                            <button onClick={CancelBooking}>Yes</button>
                            <button onClick={() => setModalShow1(false)}>NO</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }





    return (
        <>
            <AssignDriverModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <CancelBookingModal
                show={modalShow1}
                onHide={() => setModalShow1(false)}
            />
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Subscription Booking</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search user' value={searchQuery}
                                    onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Profile</th>
                                    <th>User Name</th>
                                    <th>Request Id</th>
                                    <th>Route From</th>
                                    <th>Route To</th>
                                    <th>Status</th>
                                    <th>Kilometers</th>
                                    <th>(₹)Pricing</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Loading Subscription booking...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredbookingData.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Subscription booking not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?

                                            filteredbookingData.map(settle => (
                                                <tr key={settle.id}>
                                                    <td>
                                                        <img src={settle?.user?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                    </td>
                                                    <td>{settle?.user?.name}</td>
                                                    <td>{settle?.bookingId}</td>
                                                    <td>{settle?.current?.address}</td>
                                                    <td>{settle?.drop?.address}</td>
                                                    <td style={{
                                                        color: settle?.status === 'cancel' ? '#F52D56' :
                                                            settle?.status === 'pending' ? '#FBAC2C' :
                                                                settle?.status === 'Accept' ? '#609527' : 'black',
                                                        fontWeight: '600'
                                                    }}>
                                                        {settle?.status}
                                                    </td>
                                                    <td>{settle.km} KM</td>
                                                    <td style={{ color: '#F52D56' }}>{settle.pricing}</td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => {
                                                                setBookingId(settle?._id);
                                                                setModalShow(true);
                                                            }}>
                                                                <FaCheck color='#000000' size={20} />
                                                                <p>Aprove</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <RxCross2 color='#000000' size={20} onClick={() => {
                                                                    setBookingId(settle?._id);
                                                                    setModalShow1(true);
                                                                }} />
                                                                <p>Cancel</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/settlebookingdetails/${settle._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#000000' size={20} />
                                                                    <p>View</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>
                                            ))
                                            : settledata.map(settle => (
                                                <tr key={settle.id}>
                                                    <td>
                                                        <img src={settle?.user?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                    </td>
                                                    <td>{settle?.user?.name}</td>
                                                    <td>{settle?.bookingId}</td>
                                                    <td>{settle?.current?.address}</td>
                                                    <td>{settle?.drop?.address}</td>
                                                    <td style={{
                                                        color: settle?.status === 'cancel' ? '#F52D56' :
                                                            settle?.status === 'pending' ? '#FBAC2C' :
                                                                settle?.status === 'Accept' ? '#609527' : 'black',
                                                        fontWeight: '600'
                                                    }}>
                                                        {settle?.status}
                                                    </td>
                                                    <td>{settle.km} KM</td>
                                                    <td style={{ color: '#F52D56' }}>{settle.pricing}</td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => {
                                                                setBookingId(settle?._id);
                                                                setModalShow(true);
                                                            }}>
                                                                <FaCheck color='#000000' size={20} />
                                                                <p>Aprove</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <RxCross2 color='#000000' size={20} onClick={() => {
                                                                    setBookingId(settle?._id);
                                                                    setModalShow1(true);
                                                                }} />
                                                                <p>Cancel</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/settlebookingdetails/${settle._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#000000' size={20} />
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

export default HOC(SettleBooking);
