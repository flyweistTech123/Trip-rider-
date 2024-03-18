import React, { useState, useEffect } from 'react';
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


const SOSUpdate = () => {
    const [sosdata, setSosData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [sosId, setSOSId] = useState('')


    const fetchSOSData = async () => {
        try {
            const response = await axios.get('https://rajiv-cab-mu.vercel.app/api/v1/getAllSosRequest');
            setSosData(response.data.data);
        } catch (error) {
            console.error('Error fetching SOS data:', error);
        }
    };

    useEffect(() => {
        fetchSOSData();
    }, []);


    const navigate = useNavigate();


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




    return (
        <>
            <SosStatusModal
                show={modalShow}
                onHide={() => setModalShow(false)}
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
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Sos Id</th>
                                    <th>Location</th>
                                    <th>Reason for Request</th>
                                    <th>status</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sosdata && sosdata.length > 0 ? (
                                    sosdata.map(SOS => (
                                        <tr key={SOS.id}>
                                            <td className='rider8'><img src={SOS?.user?.profilePicture} style={{ width: '50px' }} />
                                                {SOS?.user?.name}</td>
                                            <td>{(SOS.id)}</td>
                                            <td>{(SOS.locationInWord)}</td>
                                            <td>{(SOS.reason)}</td>
                                            <td>{(SOS.status)}</td>
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
                                ) : (
                                    <tr>
                                        <td colSpan="6">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(SOSUpdate);
