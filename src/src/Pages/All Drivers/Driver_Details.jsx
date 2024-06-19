import React, { useState, useEffect, useRef } from 'react';
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
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


import '@react-pdf-viewer/default-layout/lib/styles/index.css'


import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { MdEdit } from "react-icons/md";

import { Button, Form } from "react-bootstrap";


import { useNavigate } from 'react-router-dom';







const Driver_Details = () => {
    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [kycstatus1, setKYCstatus1] = useState(" ");
    const [modalShow2, setModalShow2] = React.useState(false);
    const navigate = useNavigate()
    const [modalShow1, setModalShow1] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [DriverData, setDriverData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [altnumber, setAltNumber] = useState('');
    const [gender, setGender] = useState('');
    const [profileimg, setProfileImg] = useState('');
    const [birthday, setBirthday] = useState('')
    const [role, setRole] = useState('')
    const [wallet, setWallet] = useState('')
    const [totaltrip, setTotalTrip] = useState('')
    const [adharcard, setAdharcard] = useState('');
    const [documentid, setDocumentId] = useState('')
    const [firstlineaddress, setFirstLineAddress] = useState('');
    const [secondlineaddress, setSecondLineAddress] = useState('');
    const [drivinglince, setDrivinglince] = useState('');
    const [clientid, setClientID] = useState('');
    const [rcNumber, setRcNumber] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [vehicleCategory, setVehicleCategory] = useState('');
    const [vehicleChasiNumber, setVehicleChasiNumber] = useState('');
    const [vehicleEngineNumber, setVehicleEngineNumber] = useState('');
    const [makerDescription, setMakerDescription] = useState('');
    const [makerModel, setMakerModel] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [color, setColor] = useState('');
    const [insuranceCompany, setInsuranceCompany] = useState('');
    const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('');
    const [insuranceUpto, setInsuranceUpto] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [registeredAt, setRegisteredAt] = useState('');
    const [vehicleGrossWeight, setVehicleGrossWeight] = useState('');
    const [noCylinders, setNoCylinders] = useState('');
    const [seatCapacity, setSeatCapacity] = useState('');
    const [vehicleCategoryDescription, setVehicleCategoryDescription] = useState('');
    const [puccNumber, setPuccNumber] = useState('');
    const [puccUpto, setPuccUpto] = useState('');
    const [permitNumber, setPermitNumber] = useState('');
    const [permitIssueDate, setPermitIssueDate] = useState('');
    const [permitValidFrom, setPermitValidFrom] = useState('');
    const [permitValidUpto, setPermitValidUpto] = useState('');
    const [permitType, setPermitType] = useState('');
    const [nationalPermitNumber, setNationalPermitNumber] = useState('');
    const [nationalPermitUpto, setNationalPermitUpto] = useState('');
    const [nationalPermitIssuedBy, setNationalPermitIssuedBy] = useState('');
    const [nocDetails, setNocDetails] = useState('');
    const [ownerNumber, setOwnerNumber] = useState('');
    const [challanDetails, setChallanDetails] = useState('');
    const [financed, setFinanced] = useState('');
    const [financer, setFinancer] = useState('');
    const [normsType, setNormsType] = useState('');
    const [fitUpTo, setFitUpTo] = useState('');
    const [interiorImage, setInteriorImage] = useState('');
    const [exteriorImage, setExteriorImage] = useState('');
    const [rcImage, setRcImage] = useState('');
    const [fitnessImage, setFitnessImage] = useState('');
    const [permitImage, setPermitImage] = useState('');
    const [insuranceImage, setInsuranceImage] = useState('');
    const [drivingLicenseImage, setDrivingLicenseImage] = useState('');
    const [aadharCardImage, setAadharCardImage] = useState('');
    const [cancelCheckImage, setCancelCheckImage] = useState('');
    const [bankStatementImage, setBankStatementImage] = useState('');
    const [driverVehicleCategory, setDriverVehicleCategory] = useState('');

    const [isEditingName, setIsEditingName] = useState(false);




    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleName, setVehicleName] = useState('');



    const fileInputRef = useRef(null);

    const triggerFileInput = (e) => {
        e.preventDefault();
        document.getElementById('fileid').click();
    };

    const handleImageChange = (e) => {
        setProfileImg(e.target.files[0]);
    };

    const handleImageChange1 = (e) => {
        setInteriorImage(e.target.files[0]);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setInteriorImage(file); // Update state with the selected file
        setInteriorImage(isPDF(file) ? fileUrl : null); // Update PDF URL if it's a PDF, otherwise reset it
    };


    const isPDF = (url) => {
        if (typeof url !== 'string') {
            return false;
        }
        return url.toLowerCase().endsWith('.pdf');
    };









    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Ensure day and month are two digits
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };




    // Function to handle image click
    const handleImageClick = (imageUrl) => {
        setCurrentImageUrl(imageUrl);
        setModalShow1(true);
    };





    const fetchDriverDetails = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders())
            const data = response.data.data;
            setDriverData(data);
            setName(data.name);
            setEmail(data.email);
            setNumber(data.mobileNumber);
            setAltNumber(data.altMobileNumber);
            setGender(data.gender);
            setProfileImg(data.profilePicture);
            setRole(data.role);
            setWallet(data.wallet)
            setTotalTrip(data.totalBooking)
            setDocumentId(data.driverDocument._id)
            setAdharcard(data.driverDocument.aadhar)
            setFirstLineAddress(data.driverDocument.present_address)
            setSecondLineAddress(data.driverDocument.permanent_address)
            setClientID(data.driverDocument.client_id)
            setDrivinglince(data.driverDocument.dlno)
            setRcNumber(data.driverDocument.rc_number);
            setRegistrationDate(data.driverDocument.registration_date);
            setOwnerName(data.driverDocument.owner_name);
            setVehicleCategory(data.driverDocument.vehicle_category);
            setVehicleChasiNumber(data.driverDocument.vehicle_chasi_number);
            setVehicleEngineNumber(data.driverDocument.vehicle_engine_number);
            setMakerDescription(data.driverDocument.maker_description);
            setMakerModel(data.driverDocument.maker_model);
            setFuelType(data.driverDocument.fuel_type);
            setColor(data.driverDocument.color);
            setInsuranceCompany(data.driverDocument.insurance_company);
            setInsurancePolicyNumber(data.driverDocument.insurance_policy_number);
            setInsuranceUpto(data.driverDocument.insurance_upto);
            setManufacturingDate(data.driverDocument.manufacturing_date);
            setRegisteredAt(data.driverDocument.registered_at);
            setVehicleGrossWeight(data.driverDocument.vehicle_gross_weight);
            setNoCylinders(data.driverDocument.no_cylinders);
            setSeatCapacity(data.driverDocument.seat_capacity);
            setVehicleCategoryDescription(data.driverDocument.vehicle_category_description);
            setPuccNumber(data.driverDocument.pucc_number);
            setPuccUpto(data.driverDocument.pucc_upto);
            setPermitNumber(data.driverDocument.permit_number);
            setPermitIssueDate(data.driverDocument.permit_issue_date);
            setPermitValidFrom(data.driverDocument.permit_valid_from);
            setPermitValidUpto(data.driverDocument.permit_valid_upto);
            setPermitType(data.driverDocument.permit_type);
            setNationalPermitNumber(data.driverDocument.national_permit_number);
            setNationalPermitUpto(data.driverDocument.national_permit_upto);
            setNationalPermitIssuedBy(data.driverDocument.national_permit_issued_by);
            setNocDetails(data.driverDocument.noc_details);
            setOwnerNumber(data.driverDocument.owner_number);
            setChallanDetails(data.driverDocument.challan_details);
            setFinanced(data.driverDocument.financed);
            setFinancer(data.driverDocument.financer);
            setNormsType(data.driverDocument.norms_type);
            setFitUpTo(data.driverDocument.fit_up_to);
            setInteriorImage(data.driverDocument.interior || img);
            setExteriorImage(data.driverDocument.exterior || img);
            setRcImage(data.driverDocument.rc || img);
            setFitnessImage(data.driverDocument.fitness || img);
            setPermitImage(data.driverDocument.permit || img);
            setInsuranceImage(data.driverDocument.insurance || img);
            setDrivingLicenseImage(data.driverDocument.drivinglicense || img);
            setAadharCardImage(data.driverDocument.aadharCard || img);
            setCancelCheckImage(data.driverDocument.cancelCheck || img);
            setBankStatementImage(data.driverDocument.bankStatement || img);
            setBirthday(birthday);
        } catch (error) {
            console.error('Error fetching User details:', error);
        }
    };


    const handlePutRequest = async (e) => {
        e.preventDefault();
        const userDetailsFormData = new FormData();
        userDetailsFormData.append('name', name);
        userDetailsFormData.append('email', email);
        userDetailsFormData.append('mobileNumber', number);
        userDetailsFormData.append('altMobileNumber', altnumber);
        userDetailsFormData.append('gender', gender);
        userDetailsFormData.append('profilePicture', profileimg);
        userDetailsFormData.append('birthday', birthday);

        const documentDetailsFormData = new FormData();
        documentDetailsFormData.append('aadhar', adharcard);
        documentDetailsFormData.append('present_address', firstlineaddress);
        documentDetailsFormData.append('permanent_address', secondlineaddress);
        documentDetailsFormData.append('client_id', clientid);
        documentDetailsFormData.append('dlno', drivinglince);
        documentDetailsFormData.append('rc_number', rcNumber);
        documentDetailsFormData.append('registration_date', registrationDate);
        documentDetailsFormData.append('owner_name', ownerName);
        documentDetailsFormData.append('vehicle_category', vehicleCategory);
        documentDetailsFormData.append('vehicle_chasi_number', vehicleChasiNumber);
        documentDetailsFormData.append('vehicle_engine_number', vehicleEngineNumber);
        documentDetailsFormData.append('maker_description', makerDescription);
        documentDetailsFormData.append('maker_model', makerModel);
        documentDetailsFormData.append('fuel_type', fuelType);
        documentDetailsFormData.append('color', color);
        documentDetailsFormData.append('insurance_company', insuranceCompany);
        documentDetailsFormData.append('insurance_policy_number', insurancePolicyNumber);
        documentDetailsFormData.append('insurance_upto', insuranceUpto);
        documentDetailsFormData.append('manufacturing_date', manufacturingDate);
        documentDetailsFormData.append('registered_at', registeredAt);
        documentDetailsFormData.append('vehicle_gross_weight', vehicleGrossWeight);
        documentDetailsFormData.append('no_cylinders', noCylinders);
        documentDetailsFormData.append('seat_capacity', seatCapacity);
        documentDetailsFormData.append('vehicle_category_description', vehicleCategoryDescription);
        documentDetailsFormData.append('pucc_number', puccNumber);
        documentDetailsFormData.append('pucc_upto', puccUpto);
        documentDetailsFormData.append('permit_number', permitNumber);
        documentDetailsFormData.append('permit_issue_date', permitIssueDate);
        documentDetailsFormData.append('permit_valid_from', permitValidFrom);
        documentDetailsFormData.append('permit_valid_upto', permitValidUpto);
        documentDetailsFormData.append('permit_type', permitType);
        documentDetailsFormData.append('national_permit_number', nationalPermitNumber);
        documentDetailsFormData.append('national_permit_upto', nationalPermitUpto);
        documentDetailsFormData.append('national_permit_issued_by', nationalPermitIssuedBy);
        documentDetailsFormData.append('noc_details', nocDetails);
        documentDetailsFormData.append('owner_number', ownerNumber);
        documentDetailsFormData.append('challan_details', challanDetails);
        documentDetailsFormData.append('financed', financed);
        documentDetailsFormData.append('financer', financer);
        documentDetailsFormData.append('norms_type', normsType);
        documentDetailsFormData.append('fit_up_to', fitUpTo);
        documentDetailsFormData.append('driverVehicleCategory', vehicleId);
        const imageFormData = new FormData();
        imageFormData.append('interior', interiorImage);
        imageFormData.append('exterior', exteriorImage);
        imageFormData.append('rc', rcImage);
        imageFormData.append('fitness', fitnessImage);
        imageFormData.append('permit', permitImage);
        imageFormData.append('insurance', insuranceImage);
        imageFormData.append('drivinglicense', drivingLicenseImage);
        imageFormData.append('aadharCard', aadharCardImage);
        imageFormData.append('cancelCheck', cancelCheckImage);
        imageFormData.append('bankStatement', bankStatementImage);



        try {
            // Update user details
            await axios.put(`${BaseUrl}api/v1/updateDriverVendorProfile/detail/${id}`, userDetailsFormData, getAuthHeaders());

            // Update document details
            await axios.post(`${BaseUrl}api/v1/driver/documentDriverDetailByAdmin/${id}`, documentDetailsFormData, getAuthHeaders());

            // Update image details
            await axios.post(`${BaseUrl}api/v1/driver/image/${id}`, imageFormData, getAuthHeaders());

            toast.success("Driver Details Updated successfully");
            setModalShow(false);

            // Fetch updated details after all APIs are successfully called
            fetchDriverDetails();
        } catch (error) {
            console.log('Error updating driver details:', error);
            toast.error("Error updating Driver Details");
        }
    };



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
        fetchDriverDetails()
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



    // Image  modal 

    function ImageViewer(props) {
        const [imageUrl, setImageUrl] = useState("");

        useEffect(() => {
            if (props.show === true) {
                setImageUrl(props?.imageUrl);
            }
        }, [props])


        // Function to handle image download
        const handleDownload = () => {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'downloaded_image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };



        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter">View Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-overlay">
                        <div className='rider4'>
                            <button onClick={handleDownload} style={{ marginBottom: '10px' }}>Download Image</button>
                        </div>
                        <div className="modal-content">
                            {isPDF(imageUrl) ? (
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <Viewer fileUrl={imageUrl} />;
                                </Worker>

                            ) : (
                                <img src={imageUrl} alt="Full Image" style={{ width: '100%' }} />
                            )}

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }



    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/driver/getDriverVehicleCategory`, getAuthHeaders());
                setVehicles(response.data.data);
                console.log(response.data.data, "vechcal print")

            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);




    return (
        <>
            <KycStatusModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ImageViewer
                show={modalShow1}
                onHide={() => setModalShow1(false)}
                imageUrl={currentImageUrl}
            />
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Driver Details</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/drivers')}>Back</button>
                            <button onClick={handlePutRequest}>Update Profile</button>
                        </div>
                    </div>
                    <>
                        <div className='rider_details'>
                            <div className='rider_details1'>
                                <div className='rider_details2'>
                                    <div className='rider_details3'>
                                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
                                        <img src={profileimg instanceof File ? URL.createObjectURL(profileimg) : profileimg || img2} alt="No image" onClick={triggerFileInput} style={{ cursor: 'pointer' }} />
                                        <div className='rider_details4'>
                                            <h6>
                                                {isEditingName ? (
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        onBlur={() => setIsEditingName(false)}
                                                        autoFocus
                                                        style={{ width: '100%' }}
                                                    />
                                                ) : (
                                                    <span onClick={() => setIsEditingName(true)}>{name}</span>
                                                )}
                                                <div className='rider_details5'>
                                                    <p>{role}</p>
                                                </div>
                                            </h6>
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
                                                <p>{wallet}</p>
                                                <div className='rider_details11'>
                                                    {/* <p>Expires</p>
                                                        <p>09/21</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='rider_details99' onClick={() => navigate(`/driver_bookings/${id}`)}>
                                            <p>Total  Trips</p>
                                            <p>{totaltrip}</p>
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
                                            <input type="text" placeholder='Enter client id' value={clientid} onChange={(e) => setClientID(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Email</label>
                                            <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Alternate Phone Number</label>
                                            <input type="number" placeholder='Enter alternate number' value={altnumber} onChange={(e) => setAltNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Phone Number</label>
                                            <input type="number" placeholder='Enter number' value={number} onChange={(e) => setNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Gender</label>
                                            <div className='rider_radiogender'>
                                                <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} /> Male
                                                <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} /> Female
                                            </div>
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">DOB</label>
                                            <input type="date" value={formatDate(birthday)} onChange={(e) => setBirthday(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Aadhar Card Number</label>
                                            <input type="text" value={adharcard} onChange={(e) => setAdharcard(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">First Line Address</label>
                                            <input type="text" value={firstlineaddress} onChange={(e) => setFirstLineAddress(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Second Line Address</label>
                                            <input type="text" value={secondlineaddress} onChange={(e) => setSecondLineAddress(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Driver license Number</label>
                                            <input type="text" value={drivinglince} onChange={(e) => setDrivinglince(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className='rider_details12'>
                                    <div className='rider_details12114'>
                                        <h6>Vehicle Information</h6>
                                        <div className='rider_details12113'></div>
                                    </div>
                                    <div className='rider_details13'>
                                        <div className='dailyprice2'>
                                            <label htmlFor="">Vehicle</label>
                                            <select value={vehicleName} onChange={(e) => {
                                                const selectedVehicle = vehicles.find(vehicle => vehicle.name === e.target.value);
                                                setVehicleId(selectedVehicle._id);
                                                setVehicleName(e.target.value);
                                            }}>
                                                <option>Select Vehicle</option>
                                                {vehicles?.map(vehicle => (
                                                    <option key={vehicle._id} value={vehicle.name}>{vehicle.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Rc Number</label>
                                            <input type="text" value={rcNumber} onChange={(e) => setRcNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Registration Date</label>
                                            <input type="date" value={formatDate(registrationDate)} onChange={(e) => setRegistrationDate(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Owner Name</label>
                                            <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Vehicle Category</label>
                                            <input type="text" value={vehicleCategory} onChange={(e) => setVehicleCategory(e.target.value)} />
                                        </div>
                                        {/* Repeat for other fields */}
                                        <div className='rider_details14'>
                                            <label>Vehicle Chasi Number</label>
                                            <input type="text" value={vehicleChasiNumber} onChange={(e) => setVehicleChasiNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Vehicle Engine Number</label>
                                            <input type="text" value={vehicleEngineNumber} onChange={(e) => setVehicleEngineNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Maker Description</label>
                                            <input type="text" value={makerDescription} onChange={(e) => setMakerDescription(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Maker Model</label>
                                            <input type="text" value={makerModel} onChange={(e) => setMakerModel(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Fuel Type</label>
                                            <input type="text" value={fuelType} onChange={(e) => setFuelType(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Color</label>
                                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Insurance Company</label>
                                            <input type="text" value={insuranceCompany} onChange={(e) => setInsuranceCompany(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Insurance Policy Number</label>
                                            <input type="text" value={insurancePolicyNumber} onChange={(e) => setInsurancePolicyNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Insurance Upto</label>
                                            <input type="date" value={formatDate(insuranceUpto)} onChange={(e) => setInsuranceUpto(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Manufacturing Date</label>
                                            <input type="date" value={formatDate(manufacturingDate)} onChange={(e) => setManufacturingDate(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Registered at</label>
                                            <input type="text" value={registeredAt} onChange={(e) => setRegisteredAt(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Vehicle Gross Weight</label>
                                            <input type="text" value={vehicleGrossWeight} onChange={(e) => setVehicleGrossWeight(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Number Of Cylinders</label>
                                            <input type="text" value={noCylinders} onChange={(e) => setNoCylinders(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Seat Capacity</label>
                                            <input type="text" value={seatCapacity} onChange={(e) => setSeatCapacity(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Vehicle Category Description</label>
                                            <input type="text" value={vehicleCategoryDescription} onChange={(e) => setVehicleCategoryDescription(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Pucc Number</label>
                                            <input type="text" value={puccNumber} onChange={(e) => setPuccNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Pucc Upto</label>
                                            <input type="date" value={formatDate(puccUpto)} onChange={(e) => setPuccUpto(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Permit Number</label>
                                            <input type="text" value={permitNumber} onChange={(e) => setPermitNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Permit Issue Date</label>
                                            <input type="date" value={formatDate(permitIssueDate)} onChange={(e) => setPermitIssueDate(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Permit Valid From</label>
                                            <input type="date" value={formatDate(permitValidFrom)} onChange={(e) => setPermitValidFrom(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Permit Valid Upto</label>
                                            <input type="date" value={formatDate(permitValidUpto)} onChange={(e) => setPermitValidUpto(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Permit Type</label>
                                            <input type="text" value={permitType} onChange={(e) => setPermitType(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>National Permit Number</label>
                                            <input type="text" value={nationalPermitNumber} onChange={(e) => setNationalPermitNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>National Permit Upto</label>
                                            <input type="date" value={formatDate(nationalPermitUpto)} onChange={(e) => setNationalPermitUpto(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>National Permit Issued by</label>
                                            <input type="text" value={nationalPermitIssuedBy} onChange={(e) => setNationalPermitIssuedBy(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Noc Details</label>
                                            <input type="text" value={nocDetails} onChange={(e) => setNocDetails(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Owner Number</label>
                                            <input type="text" value={ownerNumber} onChange={(e) => setOwnerNumber(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Challan Details</label>
                                            <input type="text" value={challanDetails} onChange={(e) => setChallanDetails(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Financed</label>
                                            <input type="text" value={financed} onChange={(e) => setFinanced(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Financer</label>
                                            <input type="text" value={financer} onChange={(e) => setFinancer(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Norms Type</label>
                                            <input type="text" value={normsType} onChange={(e) => setNormsType(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label>Fit Up To</label>
                                            <input type="date" value={formatDate(fitUpTo)} onChange={(e) => setFitUpTo(e.target.value)} />
                                        </div>
                                    </div>

                                </div>

                                <div className='rider_details12'>
                                    <div className='rider_details12114'>
                                        <h6>Driver's All Documents</h6>
                                        <div className='rider_details12112'></div>
                                    </div>

                                    <div className='rider_details20'>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'  >
                                                <input type="file" id="fileid" style={{ display: 'none' }} onChange={handleImageChange1} accept="application/pdf" />
                                                <div onClick={() => handleImageClick(exteriorImage)} className='rider_details213'>
                                                    {isPDF(interiorImage) ? (
                                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                            <Viewer fileUrl={interiorImage instanceof File ? URL.createObjectURL(interiorImage) : interiorImage} />
                                                        </Worker>
                                                    ) : (
                                                        <img
                                                            src={interiorImage instanceof File ? URL.createObjectURL(interiorImage) : interiorImage || img}
                                                            alt={interiorImage !== img ? "Driver Interior Image" : "No Image"}
                                                        />
                                                    )}
                                                    <h6>Interior</h6>
                                                </div>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={() => document.getElementById('fileid').click()}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21' >
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(exteriorImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={exteriorImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={exteriorImage instanceof File ? URL.createObjectURL(exteriorImage) : exteriorImage}
                                                        alt={exteriorImage !== img ? "Driver Exterior Image" : "No Image"}
                                                        onClick={() => handleImageClick(exteriorImage)}
                                                    />
                                                )}
                                                <h6>Exterior</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'>
                                                <input type="file" id="fileid" style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(rcImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={rcImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={rcImage instanceof File ? URL.createObjectURL(rcImage) : rcImage}
                                                        alt={rcImage !== img ? "Driver RC Image" : "No Image"}
                                                    />
                                                )}
                                                <h6>RC</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'>
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(fitnessImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={fitnessImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={fitnessImage instanceof File ? URL.createObjectURL(fitnessImage) : fitnessImage}
                                                        alt={fitnessImage !== img ? "Driver Fitness Image" : "No Image"}
                                                    />
                                                )}
                                                <h6>Fitness</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'>
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(permitImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={permitImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={permitImage instanceof File ? URL.createObjectURL(permitImage) : permitImage}
                                                        alt={permitImage !== img ? "Driver Permit Image" : "No Image"}
                                                    />
                                                )}
                                                <h6>Permit</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'>
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(insuranceImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={insuranceImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={insuranceImage instanceof File ? URL.createObjectURL(insuranceImage) : insuranceImage}
                                                        alt={insuranceImage !== img ? "Driver Insurance Image" : "No Image"}
                                                    />
                                                )}
                                                <h6>Insurance</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'>
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(drivingLicenseImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={drivingLicenseImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={drivingLicenseImage instanceof File ? URL.createObjectURL(drivingLicenseImage) : drivingLicenseImage}
                                                        alt={drivingLicenseImage !== img ? "Driver License Image" : "No Image"}
                                                    />
                                                )}
                                                <h6>Driving License</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'>
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(aadharCardImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={aadharCardImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={aadharCardImage instanceof File ? URL.createObjectURL(aadharCardImage) : aadharCardImage}
                                                        alt={aadharCardImage !== img ? "Driver Aadhar Card Image" : "No Image"}
                                                    />
                                                )}
                                                <h6>Aadhar Card</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21'>
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(cancelCheckImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                        <Viewer fileUrl={cancelCheckImage} />;
                                                    </Worker>
                                                ) : (
                                                    <img
                                                        src={cancelCheckImage instanceof File ? URL.createObjectURL(cancelCheckImage) : cancelCheckImage}
                                                        alt={cancelCheckImage !== img ? "Driver Cancel Check Image" : "No Image"}
                                                    />
                                                )}
                                                <h6>Cancel Check</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                        <div className='rider_details2122'>
                                            <div className='rider_details21' onClick={() => handleImageClick(bankStatementImage)}>
                                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange1} />
                                                {isPDF(bankStatementImage) ? (
                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js" >
                                                        <Viewer fileUrl={bankStatementImage} />
                                                    </Worker>

                                                ) : (
                                                    <img
                                                        src={bankStatementImage instanceof File ? URL.createObjectURL(bankStatementImage) : bankStatementImage}
                                                        alt={bankStatementImage !== img ? "Driver Bank Statement Image" : "No Image"}
                                                        onClick={() => handleImageClick(bankStatementImage)}
                                                    />
                                                )}
                                                <h6>Bank Statement</h6>
                                            </div>
                                            <div className='rider4'>
                                                <button onClick={triggerFileInput}>Update</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='rider_details19'>

                                    {/* <button onClick={() => navigate('/drivers')}>Close</button> */}
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default HOC(Driver_Details)