import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import './Drivers.css'
import HOC from '../../Components/HOC/HOC'
import { useParams } from 'react-router-dom';
import img from '../../Images/imgno.jpg'
import img1 from '../../Images/img28.png'
import img2 from '../../Images/user.webp'



import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { MdEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";

import { Button, Form } from "react-bootstrap";


import { useNavigate } from 'react-router-dom';



const Driver_Details = () => {


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${date.getMonth() + 1}-${date.getFullYear()}`;

        return `${formattedDate}`;
    };



    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [DriverData, setDriverData] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [kycstatus1, setKYCstatus1] = useState(" ");
    const navigate = useNavigate()



    const fetchDriverData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders()); // Use the ID from the URL
            const driverDataFromApi = response.data.data;
            const driverStatus = response.data.data.status;
            setKYCstatus1(driverStatus)
            setDriverData(driverDataFromApi);
            setIsBlocked(driverDataFromApi.isBlock);
        } catch (error) {
            console.error('Error fetching driver data:', error);
        }
    };


    // const isImage = (url) => {
    //     return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    // };

    // const isPDF = (url) => {
    //     return /\.pdf$/i.test(url);
    // };



    // const DocumentDisplay = ({ url, label }) => {
    //     if (isImage(url)) {
    //         return (
    //             <div className='rider_details21'>
    //                 <img
    //                     src={url || img}
    //                     alt={url ? `${label} Image` : "No Image"}
    //                 />
    //                 <h6>{label}</h6>
    //             </div>
    //         );
    //     } else if (isPDF(url)) {
    //         return (
    //             <div className='rider_details21'>
    //                 <a href={url} target="_blank" rel="noopener noreferrer">
    //                     <img
    //                         src={<FaFilePdf />} // You can use a generic PDF icon
    //                         alt={`${label} PDF`}
    //                     />
    //                 </a>
    //                 <h6>{label}</h6>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className='rider_details21'>
    //                 <img
    //                     src={img} // Default image or placeholder
    //                     alt="No Image"
    //                 />
    //                 <h6>{label}</h6>
    //             </div>
    //         );
    //     }
    // };


    const handleDeleteDriver = async () => {
        try {
            await axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${id}`, getAuthHeaders());
            toast.success("Driver deleted successfully");
            navigate('/drivers');
        } catch (error) {
            console.error('Error deleting Driver:', error);
            toast.error("Error deleting Driver");
        }
    };



    const blockDriver = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/block/driver/${id}`, getAuthHeaders());
            setIsBlocked(true); // Update isBlocked state
            toast.success("Driver is blocked successfully");
        } catch (error) {
            console.error('Error blocking driver:', error);
            toast.error("Error blocking driver");
        }
    };

    const unblockDriver = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${id}`, getAuthHeaders());
            setIsBlocked(false); // Update isBlocked state
            toast.success("Driver is unblocked successfully'");
        } catch (error) {
            console.error('Error Unblocking driver:', error);
            toast.error("Error unblocking Driver");
        }
    };



    useEffect(() => {
        fetchDriverData();
    }, [id]);

    // Define the color based on DriverData.status
    let textColor = '';

    switch (kycstatus1) {
        case 'reject':
            textColor = '#F52D56'; // Red color for 'reject'
            break;
        case 'pending':
            textColor = '#FBAC2C'; // Orange color for 'pending'
            break;
        case 'approved':
            textColor = '#609527'; // Green color for 'approved' and 'hold'
            break;
        case 'hold':
            textColor = '#357ABD'; // Green color for 'approved' and 'hold'
            break;
        default:
            textColor = '#000'; // Default color (black) for unknown status
    }

    // KYC modal 

    function KycStatusModal(props) {
        const [kycstatus, setKYCstatus] = useState(" ");
        const [kycremarkstatus, setKYCRemarkstatus] = useState(" ");

        const fetchDriverData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders()); // Use the ID from the URL
                const driverStatus = response.data.data.status;
                const driverRemark = response.data.data.kycRemark;
                setKYCstatus(driverStatus)
                setKYCRemarkstatus(driverRemark)
            } catch (error) {
                console.error('Error fetching driver data:', error);
            }
        };


        const ChangeStatus = async (e) => {
            e.preventDefault();
            try {
                // Construct the request payload with status and kycRemark
                const payload = {
                    status: kycstatus,
                    kycRemark: kycremarkstatus,
                };

                // Make the Axios PUT request with the correct parameters
                await axios.put(
                    `${BaseUrl}api/v1/admin/Kyc/driver/${id}`, // URL for the PUT request
                    payload, // Request payload containing status and kycRemark
                    getAuthHeaders() // Authentication headers (token)
                );

                // After successful request, fetch updated driver data and close the modal
                fetchDriverData();
                setModalShow(false);
                toast.success("KYC Status Updated successfully");
            } catch (error) {
                // Handle errors if request fails
                toast.error("Error updating KYC Status");
            }
        };



        useEffect(() => {
            fetchDriverData()
        }, [props])

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter">Update KYC Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ChangeStatus}>
                        <Form.Group className="mb-3">
                            <div style={{ display: "flex", gap: "20px" }}>
                                <Form.Check
                                    type="radio"
                                    label="PENDING"
                                    name="status"
                                    checked={kycstatus === "pending"}
                                    onChange={() => setKYCstatus("pending")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="APPROVED"
                                    name="status"
                                    checked={kycstatus === "approved"}
                                    onChange={() => setKYCstatus("approved")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="REJECT"
                                    name="status"
                                    checked={kycstatus === "reject"}
                                    onChange={() => setKYCstatus("reject")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="HOLD"
                                    name="status"
                                    checked={kycstatus === "hold"}
                                    onChange={() => setKYCstatus("hold")}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Remark</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={kycremarkstatus}
                                onChange={(e) => setKYCRemarkstatus(e.target.value)}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button className='sos6' type="submit">Update</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }



    // KYC modal 

    function ImageViewer(props) {

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter">Update KYC Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <img src={props.imageUrl} alt="Full Image" />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <KycStatusModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ImageViewer
                show={modalShow1}
                onHide={() => setModalShow1(false)}
            />
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Driver Details</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/drivers')}>Back</button>
                        </div>
                    </div>
                    {DriverData && (
                        <>
                            <div className='rider_details'>
                                <div className='rider_details1'>
                                    <div className='rider_details2'>
                                        <div className='rider_details3'>
                                            <img src={DriverData.profilePicture || img2} alt="No image" />
                                            <div className='rider_details4'>
                                                <h6>{DriverData.name}<div className='rider_details5'>
                                                    <p>{DriverData.role}</p>
                                                </div></h6>
                                                <div>
                                                    <p style={{ color: textColor }}>{DriverData.status}  Profile</p>
                                                </div>
                                            </div>
                                            <div className='rider_details6'>
                                                <div className='rider_details7' onClick={handleDeleteDriver}>
                                                    <RiDeleteBinLine color='#667085' size={20} />
                                                    <p>Delete</p>
                                                </div>
                                                <div className='rider_details7' onClick={() => { isBlocked ? unblockDriver() : blockDriver() }}>
                                                    <MdOutlineBlock color={isBlocked ? "red" : "#667085"} size={20} />
                                                    <p style={{ color: isBlocked ? 'red' : '#667085' }}>Block/Unblock</p>
                                                </div>
                                                <div className='rider_details7' onClick={() => setModalShow(true)}>
                                                    <MdEdit color="#667085" size={20} />
                                                    <p style={{ color: '#667085' }}>Update KYC Status</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='rider_details8'>
                                            <div className='rider_details9'>
                                                <p>Wallet Balance</p>
                                                <div className='rider_details10'>
                                                    <img src={img1} alt="" />
                                                    <p>{DriverData.wallet}</p>
                                                    <div className='rider_details11'>
                                                        {/* <p>Expires</p>
                                                        <p>09/21</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='rider_details99' onClick={() => navigate(`/driver_bookings/${id}`)}>
                                                <p>Total  Trips</p>
                                                <p>{DriverData?.totalBooking}</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='rider_details12'>
                                        <div className='rider_details12111'>
                                            <h6>Driver's personal information</h6>
                                            <div className='rider_details12112'></div>
                                        </div>
                                        <div className='rider_details13'>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Client Id</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.client_id}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Email</label>
                                                <div className='input11'>
                                                    <p>{DriverData.email}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Alternate Phone Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData.altMobileNumber}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Phone Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData.mobileNumber}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Phone Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData.mobileNumber}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Gender</label>
                                                <div className='input11'>
                                                    <p>{DriverData.gender}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">DOB</label>
                                                <div className='input11'>
                                                    <p>{DriverData.birthday}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Aadhar Card Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.aadhar}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">First Line Address</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.present_address}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Second Line Address</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.permanent_address}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Driver license Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.dlno}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='rider_details12'>
                                        <div className='rider_details12114'>
                                            <h6>Vehicle Information</h6>
                                            <div className='rider_details12113'></div>
                                        </div>
                                        <div className='rider_details13'>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Rc Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.rc_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Registration Date</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.registration_date)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Owner Name</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.owner_name}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Category</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.vehicle_category}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Chasi Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.vehicle_chasi_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Engine Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.vehicle_engine_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Maker Description</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.maker_description}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Maker Model</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.maker_model}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Fuel Type</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.fuel_type}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Color</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.color}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Insurance Company</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.insurance_company}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Insurance Policy Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.insurance_policy_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Insurance Upto</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.insurance_upto)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Manufacturing Date</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.manufacturing_date)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Registered at</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.registered_at}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Gross Weight</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.vehicle_gross_weight}</p>
                                                </div>
                                            </div>

                                            <div className='rider_details14'>
                                                <label htmlFor="">Number Of Cylinders</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.no_cylinders}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Seat Capacity</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.seat_capacity}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Category Description</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.vehicle_category_description}</p>
                                                </div>
                                            </div>

                                            <div className='rider_details14'>
                                                <label htmlFor="">Pucc Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.pucc_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Pucc Upto</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.pucc_upto)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Permit Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.permit_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Permit Issue Date</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.permit_issue_date)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Permit Valid From</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.permit_valid_from)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Permit Valid Upto</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.permit_valid_upto)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Permit Type</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.permit_type}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">National Permit Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.national_permit_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">National Permit Upto</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.national_permit_upto)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">National Permit Issued by</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.national_permit_issued_by)}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Noc Details</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.noc_details}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Owner Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.owner_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Challan Details</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.challan_details}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Financed</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.financed}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Financer</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.financer}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Norms Type</label>
                                                <div className='input11'>
                                                    <p>{DriverData?.driverDocument?.norms_type}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Fit Up To</label>
                                                <div className='input11'>
                                                    <p>{formatDate(DriverData?.driverDocument?.fit_up_to)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='rider_details12'>
                                        <div className='rider_details12114'>
                                            <h6>Driver's All Documents</h6>
                                            <div className='rider_details12112'></div>
                                        </div>

                                        <div className='rider_details20'>
                                            <div className='rider_details21' onClick={() => setModalShow1(true)}>
                                                <img
                                                    src={DriverData?.driverDocument?.interior || img}
                                                    alt={DriverData?.driverDocument?.interior ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Interior</h6>
                                            </div>
                                            <div className='rider_details21' onClick={() => setModalShow1(true)}>
                                                <img
                                                    src={DriverData?.driverDocument?.exterior || img}
                                                    alt={DriverData?.driverDocument?.exterior ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Exterior</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.rc || img}
                                                    alt={DriverData?.driverDocument?.rc ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Rc</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.fitness || img}
                                                    alt={DriverData?.driverDocument?.fitness ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Fitness</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.permit || img}
                                                    alt={DriverData?.driverDocument?.permit ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Permit</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.insurance || img}
                                                    alt={DriverData?.driverDocument?.insurance ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Insurance</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.drivinglicense || img}
                                                    alt={DriverData?.driverDocument?.drivinglicense ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Driving license</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.aadharCard || img}
                                                    alt={DriverData?.driverDocument?.aadharCard ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Aadhar Card</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.cancelCheck || img}
                                                    alt={DriverData?.driverDocument?.cancelCheck ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Cancel Check</h6>
                                            </div>
                                            <div className='rider_details21'>
                                                <img
                                                    src={DriverData?.driverDocument?.bankStatement || img}
                                                    alt={DriverData?.driverDocument?.bankStatement ? "Driver Interior Image" : "No Image"}
                                                />
                                                <h6>Bank Statement</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='rider_details19'>
                                        {/* <button onClick={() => navigate('/drivers')}>Close</button> */}
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

export default HOC(Driver_Details)