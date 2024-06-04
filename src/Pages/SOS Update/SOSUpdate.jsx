import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SOSUpdate.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import img2 from '../../Images/user.webp'
import Pagination from 'react-bootstrap/Pagination';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';



const SOSUpdate = () => {
    const [sosdata, setSosData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [sosId, setSOSId] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);



    const fetchSOSData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/getAllSosRequest?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setSosData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching SOS data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);

    useEffect(() => {
        fetchSOSData();
    }, [limit, search, page]);


    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }


    const handleSearch = (event) => {
        setPage(1);
        setSearch(event.target.value);
    };


    function SosStatusModal(props) {
        const [sosstatus, setSOSstatus] = useState("");

        useEffect(() => {
            const fetchSOSDetails = async () => {
                try {
                    const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/getSosRequestById/${sosId}`)
                    setSOSstatus(response.data.data.status);
                } catch (error) {
                    console.error('Error fetching SOS details:', error);
                }
            };
            fetchSOSDetails();
        }, [sosId]);

        const handlePut = async (e) => {
            e.preventDefault();
            try {
                await axios.put(
                    `https://rajiv-cab-mu.vercel.app/api/v1/approvedRejectSosRequestById/${sosId}`,
                    {
                        status: sosstatus,
                    }
                );
                fetchSOSData();
                props.onHide();
                toast.success("SOS Status Updated successfully");
            } catch (error) {
                toast.error("Error to Update SOS Status");
            }
        }


        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter">Update SOS Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePut}>
                        <Form.Group className="mb-3">
                            <div style={{ display: "flex", gap: "20px" }}>
                                <Form.Check
                                    type="radio"
                                    label="PENDING"
                                    name="status"
                                    checked={sosstatus === "PENDING"}
                                    onChange={() => setSOSstatus("PENDING")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="APPROVED"
                                    name="status"
                                    checked={sosstatus === "APPROVED"}
                                    onChange={() => setSOSstatus("APPROVED")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="REJECT"
                                    name="status"
                                    checked={sosstatus === "REJECT"}
                                    onChange={() => setSOSstatus("REJECT")}
                                />
                            </div>
                        </Form.Group>
                        <Modal.Footer>
                            <Button className='sos6' type="submit">Update</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    function SosModal(props) {


        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter">SOS Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                    </div>
                </Modal.Body>
            </Modal>
        );
    }




    return (
        <>
            <SosStatusModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <SosModal
                show={modalShow1}
                onHide={() => setModalShow1(false)}
            />
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>SOS Update</h6>
                        </div>

                        <div className='rider4'>
                            {/* <button onClick={()=>navigate('/refundtransaction')}>Refund list</button> */}
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search name'
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Image</th>
                                    <th>User Name</th>
                                    <th>Sos Id</th>
                                    <th>Location</th>
                                    <th>Reason for Request</th>
                                    <th>status</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading sos...</td>
                                    </tr>
                                ) : sosdata.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>SOS not found</td>
                                    </tr>
                                ) : (
                                    sosdata.map(SOS => (
                                        <tr key={SOS.id}>
                                            <td>
                                                <img src={SOS?.user?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                            </td>
                                            <td>{SOS?.user?.name}</td>
                                            <td>{(SOS.id)}</td>
                                            <td>{(SOS.locationInWord)}</td>
                                            <td>{(SOS.reason)}</td>
                                            <td style={{
                                                color: SOS.status === 'REJECT' ? '#F52D56' :
                                                    SOS.status === 'PENDING' ? '#FBAC2C' :
                                                        SOS.status === 'APPROVED' ? '#609527' : 'black',
                                                fontWeight: '600'
                                            }}>
                                                {SOS.status}
                                            </td>
                                            <td className='rider9'>
                                                <div className='rider10'>
                                                    <Link to={`/soslocation/${SOS._id}`} className='sidebar-link' >
                                                        <IoLocationSharp color='#000000' size={22} />
                                                        <p style={{ fontSize: '10px' }}>Track Live Location</p>
                                                    </Link>
                                                </div>
                                                <div className='rider10'
                                                    onClick={() => {
                                                        setSOSId(SOS?._id);
                                                        setModalShow(true);
                                                    }}
                                                >
                                                    <MdEdit color='#000000' size={20} />
                                                    <p>Edit</p>
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

export default HOC(SOSUpdate);
