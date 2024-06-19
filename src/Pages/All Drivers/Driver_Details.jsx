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
import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { MdEdit } from "react-icons/md";

import { Button, Form } from "react-bootstrap";


import { useNavigate } from 'react-router-dom';
import DownloadLink from "react-download-link";







const Driver_Details = () => {
    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    // const [kycstatus1, setKYCstatus1] = useState(" ");
    const navigate = useNavigate()
    const [modalShow1, setModalShow1] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [DriverData, setDriverData] = useState(null);
    const [name, setName] = useState('Default Name');
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
    const [financed, setFinanced] = useState(false);
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
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [city, setCity] = useState([]);
    const [cityId, setCityId] = useState('');
    const [cityName, setCityName] = useState('');
    const [status, setStatus] = useState('')

    const [state, setState] = useState([]);
    const [Statecode, setStateCode] = useState('');



    const cachedAdminData = localStorage.getItem('adminData');
    const adminData = JSON.parse(cachedAdminData);
    const role1 = localStorage.getItem('role');

    let permissionsArray = [];

    if (adminData && adminData.permissions) {
        permissionsArray = adminData.permissions;
    } else {
        console.log('Permissions array not found in adminData.');
    }




    const handleImageClick = (imageUrl) => {
        setCurrentImageUrl(imageUrl);
        setModalShow1(true);
    };




    const triggerFileInput = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput').click();
    };


    const triggerFileInput1 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput1').click();
    };

    const triggerFileInput2 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput2').click();
    };
    const triggerFileInput3 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput3').click();
    };

    const triggerFileInput4 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput4').click();
    };


    const triggerFileInput5 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput5').click();
    };

    const triggerFileInput6 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput6').click();
    };


    const triggerFileInput7 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput7').click();
    };


    const triggerFileInput8 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput8').click();
    };


    const triggerFileInput9 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput9').click();
    };
    const triggerFileInput10 = (e) => {
        e.stopPropagation();
        document.getElementById('fileInput10').click();
    };






    const handleImageChange = (e) => {
        setProfileImg(e.target.files[0]);
    };

    const handleImageChange1 = (e) => {
        setInteriorImage(e.target.files[0]);
    };


    const handleImageChange2 = (e) => {
        setExteriorImage(e.target.files[0]);
    };

    const handleImageChange3 = (e) => {
        setRcImage(e.target.files[0]);
    };

    const handleImageChange4 = (e) => {
        setFitnessImage(e.target.files[0]);
    };

    const handleImageChange5 = (e) => {
        setPermitImage(e.target.files[0]);
    };


    const handleImageChange6 = (e) => {
        setInsuranceImage(e.target.files[0]);
    };

    const handleImageChange7 = (e) => {
        setDrivingLicenseImage(e.target.files[0]);
    };


    const handleImageChange8 = (e) => {
        setAadharCardImage(e.target.files[0]);
    };

    const handleImageChange9 = (e) => {
        setCancelCheckImage(e.target.files[0]);
    };

    const handleImageChange10 = (e) => {
        setBankStatementImage(e.target.files[0]);
    };












    const isPDF = (file) => {
        if (file instanceof File) {
            return file.type === 'application/pdf';
        } else if (typeof file === 'string') {
            return file.toLowerCase().endsWith('.pdf');
        }
        return false;
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





    const fetchDriverDetails = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders())
            const data = response.data.data;
            setDriverData(data);
            if (data.name) {
                setName(data.name);
            }
            setEmail(data.email);
            setNumber(data.mobileNumber);
            setAltNumber(data.altMobileNumber);
            setGender(data.gender);
            setProfileImg(data.profilePicture);
            setRole(data.role);
            setWallet(data.wallet)
            setTotalTrip(data.totalBooking)
            setStatus(data.status)
            setDocumentId(data.driverDocument._id)
            setVehicleName(data.driverVehicleCategory.name);
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


    const appendIfPresent = (formData, key, value) => {
        if (value) {
            formData.append(key, value);
        }
    };


    const updateUserDetails = async (e) => {
        e.preventDefault();

        const userDetailsFormData = new FormData();
        userDetailsFormData.append('name', name);
        userDetailsFormData.append('email', email);
        appendIfPresent(userDetailsFormData, 'mobileNumber', number);
        userDetailsFormData.append('altMobileNumber', altnumber);
        userDetailsFormData.append('gender', gender);
        userDetailsFormData.append('profilePicture', profileimg);
        appendIfPresent(userDetailsFormData, 'birthday', birthday);
        try {
            await axios.put(`${BaseUrl}api/v1/updateDriverVendorProfile/detail/${id}`, userDetailsFormData, getAuthHeaders());
            toast.success("Driver Details Updated successfully");
        } catch (error) {
            console.error('Error updating driver details:', error);
            toast.error("Failed to update driver details. Please try again later.");
        }
    };

    const updateDocumentDetails = async (e) => {
        e.preventDefault();
        const documentDetails = {
            aadhar: adharcard,
            present_address: firstlineaddress,
            permanent_address: secondlineaddress,
            client_id: clientid,
            dlno: drivinglince,
            rc_number: rcNumber,
            registration_date: registrationDate,
            owner_name: ownerName,
            vehicle_category: vehicleCategory,
            vehicle_chasi_number: vehicleChasiNumber,
            vehicle_engine_number: vehicleEngineNumber,
            maker_description: makerDescription,
            maker_model: makerModel,
            fuel_type: fuelType,
            color: color,
            insurance_company: insuranceCompany,
            insurance_policy_number: insurancePolicyNumber,
            insurance_upto: insuranceUpto,
            manufacturing_date: manufacturingDate,
            registered_at: registeredAt,
            vehicle_gross_weight: vehicleGrossWeight,
            no_cylinders: noCylinders,
            seat_capacity: seatCapacity,
            vehicle_category_description: vehicleCategoryDescription,
            pucc_number: puccNumber,
            pucc_upto: puccUpto,
            permit_number: permitNumber,
            permit_issue_date: permitIssueDate,
            permit_valid_from: permitValidFrom,
            permit_valid_upto: permitValidUpto,
            permit_type: permitType,
            national_permit_number: nationalPermitNumber,
            national_permit_upto: nationalPermitUpto,
            national_permit_issued_by: nationalPermitIssuedBy,
            noc_details: nocDetails,
            owner_number: ownerNumber,
            challan_details: challanDetails,
            financed: financed,
            financer: financer,
            norms_type: normsType,
            fit_up_to: fitUpTo,
            driverVehicleCategory: vehicleId,
            city: cityId
        };
        try {
            await axios.post(`${BaseUrl}api/v1/driver/documentDriverDetailByAdmin/${id}`, documentDetails, getAuthHeaders());
            toast.success("Driver Vehicle Details Updated successfully");
        } catch (error) {
            console.error('Error updating Vehicle details:', error);
            toast.error("Failed to update driver Vehicle. Please try again later.");
        }
    };

    const updateImageDetails = async (e) => {
        e.preventDefault();
        const imageFormData = new FormData();
        appendIfPresent(imageFormData,'interior', interiorImage);
        appendIfPresent(imageFormData,'exterior', exteriorImage);
        appendIfPresent(imageFormData,'rc', rcImage);
        appendIfPresent(imageFormData,'fitness', fitnessImage);
        appendIfPresent(imageFormData,'permit', permitImage);
        appendIfPresent(imageFormData,'insurance', insuranceImage);
        appendIfPresent(imageFormData,'drivinglicense', drivingLicenseImage);
        appendIfPresent(imageFormData,'aadharCard', aadharCardImage);
        appendIfPresent(imageFormData,'cancelCheck', cancelCheckImage);
        appendIfPresent(imageFormData,'bankStatement', bankStatementImage);
        try {
            await axios.post(`${BaseUrl}api/v1/driver/image/${id}`, imageFormData, getAuthHeaders());
            toast.success("Driver Document Updated successfully");
        } catch (error) {
            console.error('Error updating image Document:', error);
            toast.error("Failed to update driver Document. Please try again later.");
        }
    };



    const handleDeleteDriver = async () => {
        try {
            await axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${id}`, getAuthHeaders());
            toast.success("Driver deleted successfully");
            navigate('/drivers');
        } catch (error) {
            console.error('Error deleting Driver:', error);
            toast.error("Failed to delete driver. Please try again later.");
        }
    };



    const blockDriver = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/block/driver/${id}`, getAuthHeaders());
            setIsBlocked(true); // Update isBlocked state
            toast.success("Driver is blocked successfully");
        } catch (error) {
            console.error('Error blocking driver:', error);
            toast.error("Failed to block driver. Please try again later.");
        }
    };

    const unblockDriver = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${id}`, getAuthHeaders());
            setIsBlocked(false); // Update isBlocked state
            toast.success("Driver is unblocked successfully'");
        } catch (error) {
            console.error('Error Unblocking driver:', error);
            toast.error("Failed to unblock driver. Please try again later.");
        }
    };



    useEffect(() => {
        fetchDriverDetails()
    }, [id]);

    // Define the color based on DriverData.status
    let textColor = '';

    switch (status) {
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
                fetchDriverDetails();
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

        // const isPDF = (url) => {
        //     return typeof url === 'string' && url.toLowerCase().endsWith('.pdf');
        // };

        // const isPDF = (url) => {
        //     return url && url.toLowerCase().endsWith('.pdf');
        // };


        const isPDF = (url) => {
            if (url instanceof File) {
                return url.type === 'application/pdf';
            } else if (typeof url === 'string') {
                return url.toLowerCase().endsWith('.pdf');
            }
            return false;
        };
        


        // Function to handle image download
        const downloadFile = async (url, fileName) => {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            } catch (error) {
                toast.error("Error downloading the file");
                console.error('Error downloading the file:', error);
            }
        };

        const handleDownloadClick = () => {
            const fileName = imageUrl.split('/').pop();
            downloadFile(imageUrl, fileName);
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
                            <button onClick={handleDownloadClick} style={{ marginBottom: '10px' }}>Download Image</button>
                        </div>
                        <div className="modal-content">
                            {isPDF(imageUrl) ? (
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <Viewer fileUrl={imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl || img}  style={{ width: '100%' }}/>;
                                </Worker>

                            ) : (
                                <img src={imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl || img} alt="Full Image" style={{ width: '100%' }} />
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

    useEffect(() => {
        const fetchState = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/State`, getAuthHeaders());
                setState(response.data.data);
            } catch (error) {
                console.error('Error fetching State:', error);
            }
        };

        fetchState();
    }, []);


    useEffect(() => {
        const fetchCity = async () => {
            try {
                if (Statecode) { // Ensure Statecode is not empty before fetching cities
                    const response = await axios.get(`${BaseUrl}api/v1/City/ByStateCode/${Statecode}`, getAuthHeaders());
                    setCity(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching City:', error);
            }
        };

        fetchCity();
    }, [Statecode]);





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
                            {role1 === 'superAdmin' ? (
                                <>
                                    <button onClick={updateUserDetails}>Update Profile</button>

                                </>
                            ) : (
                                <>
                                    {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.edit) && (
                                        <button onClick={updateUserDetails}>Update Profile</button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <>
                        <div className='rider_details'>
                            <div className='rider_details1'>
                                <div className='rider_details2'>
                                    <div className='rider_details3'>
                                        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={handleImageChange} />
                                        <img src={profileimg instanceof File ? URL.createObjectURL(profileimg) : profileimg || img2} alt="No image" onClick={triggerFileInput} style={{ cursor: 'pointer' }} />
                                        <div className='rider_details4'>
                                            <h6 className='rider_details4'>
                                                {name ? (
                                                    isEditingName ? (
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
                                                    )
                                                ) : (
                                                    <input
                                                        type="text"
                                                        placeholder='Enter name'
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        style={{ width: '100%' }}
                                                    />
                                                )}
                                                <div className='rider_details5'>
                                                    <p>{role}</p>
                                                </div>
                                            </h6>
                                            <div>
                                                <p style={{ color: textColor }}>{status} Profile</p>
                                            </div>
                                        </div>
                                        <div className='rider_details6'>
                                            {role1 === 'superAdmin' ? (
                                                <>
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
                                                </>
                                            ) : (
                                                <>
                                                    {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.delete) && (
                                                        <div className='rider_details7' onClick={handleDeleteDriver}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                    )}
                                                    {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.block) && (
                                                        <div className='rider_details7' onClick={() => { isBlocked ? unblockDriver() : blockDriver() }}>
                                                            <MdOutlineBlock color={isBlocked ? "red" : "#667085"} size={20} />
                                                            <p style={{ color: isBlocked ? 'red' : '#667085' }}>Block/Unblock</p>
                                                        </div>
                                                    )}
                                                    {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.edit) && (
                                                        <div className='rider_details7' onClick={() => setModalShow(true)}>
                                                            <MdEdit color="#667085" size={20} />
                                                            <p style={{ color: '#667085' }}>Update KYC Status</p>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className='rider_details8'>
                                        <div className='rider_details9' onClick={() => navigate(`/driver_earning/${id}`)}>
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

                                    </div>
                                </div>

                                <div className='rider_details12'>
                                    <div className='rider_details12114'>
                                        <h6>Vehicle Information</h6>
                                        <div className='rider_details12113'></div>
                                        <div className='rider4'>
                                            <button onClick={updateDocumentDetails}>Update</button>
                                        </div>
                                    </div>
                                    <div className='rider_details13'>
                                        <div className='rider_details14'>
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
                                            <label htmlFor="">State</label>
                                            <select value={Statecode} onChange={(e) => {
                                                const selectedStatecode = state.find(state => state.isoCode === e.target.value);
                                                setStateCode(selectedStatecode.isoCode);
                                                // setCityName(e.target.value);
                                            }}>
                                                <option>Select State</option>
                                                {state?.map(State => (
                                                    <option key={State._id} value={State.isoCode}>{State.state}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='rider_details14'>
                                            <label htmlFor="">City</label>
                                            <select value={cityName} onChange={(e) => {
                                                const selectedCity = city.find(city => city.city === e.target.value);
                                                setCityId(selectedCity._id);
                                                setCityName(e.target.value);
                                            }}>
                                                <option>Select City</option>
                                                {city?.map(City => (
                                                    <option key={City._id} value={City.city}>{City.city}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Client Id</label>
                                            <input type="text" placeholder='Enter client id' value={clientid} onChange={(e) => setClientID(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Aadhar Card Number</label>
                                            <input type="text" value={adharcard} onChange={(e) => setAdharcard(e.target.value)} />
                                        </div>
                                        <div className='rider_details14'>
                                            <label htmlFor="">Driver license Number</label>
                                            <input type="text" value={drivinglince} onChange={(e) => setDrivinglince(e.target.value)} />
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


                                {role1 === 'superAdmin' ? (
                                    <>
                                        <div className='rider_details12'>
                                            <div className='rider_details12114'>
                                                <h6>Driver's All Documents</h6>
                                                <div className='rider_details1211212112'></div>
                                                <div className='rider4'>
                                                    <button onClick={updateImageDetails}>Update</button>
                                                </div>
                                            </div>

                                            <div className='rider_details20'>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'  >
                                                        <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={handleImageChange1} />
                                                        <div onClick={() => handleImageClick(interiorImage)} className='rider_details213'>
                                                            {isPDF(interiorImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={interiorImage instanceof File ? URL.createObjectURL(interiorImage) : interiorImage || img}
                                                                    />
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
                                                        <button onClick={triggerFileInput1}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21' >
                                                        <input type="file" id="fileInput2" style={{ display: 'none' }} onChange={handleImageChange2} />
                                                        <div onClick={() => handleImageClick(exteriorImage)} className='rider_details213'>
                                                            {isPDF(exteriorImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={exteriorImage instanceof File ? URL.createObjectURL(exteriorImage) : exteriorImage} />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={exteriorImage instanceof File ? URL.createObjectURL(exteriorImage) : exteriorImage || img}
                                                                    alt={exteriorImage !== img ? "Driver Exterior Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Exterior</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput2}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput3" style={{ display: 'none' }} onChange={handleImageChange3} />
                                                        <div onClick={() => handleImageClick(rcImage)} className='rider_details213'>
                                                            {isPDF(rcImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={rcImage instanceof File ? URL.createObjectURL(rcImage) : rcImage} />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={rcImage instanceof File ? URL.createObjectURL(rcImage) : rcImage || img}
                                                                    alt={rcImage !== img ? "Driver RC Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>RC</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput3}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput4" style={{ display: 'none' }} onChange={handleImageChange4} />
                                                        <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                            {isPDF(fitnessImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={fitnessImage instanceof File ? URL.createObjectURL(fitnessImage) : fitnessImage} />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={fitnessImage instanceof File ? URL.createObjectURL(fitnessImage) : fitnessImage || img}
                                                                    alt={fitnessImage !== img ? "Driver Fitness Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Fitness</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput4}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput5" style={{ display: 'none' }} onChange={handleImageChange5} />
                                                        <div onClick={() => handleImageClick(permitImage)} className='rider_details213'>
                                                            {isPDF(permitImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={permitImage instanceof File ? URL.createObjectURL(permitImage) : permitImage} />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={permitImage instanceof File ? URL.createObjectURL(permitImage) : permitImage || img}
                                                                    alt={permitImage !== img ? "Driver Permit Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Permit</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput5}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput6" style={{ display: 'none' }} onChange={handleImageChange6} />
                                                        <div onClick={() => handleImageClick(insuranceImage)} className='rider_details213'>
                                                            {isPDF(insuranceImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={insuranceImage instanceof File ? URL.createObjectURL(insuranceImage) : insuranceImage} />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={insuranceImage instanceof File ? URL.createObjectURL(insuranceImage) : insuranceImage || img}
                                                                    alt={insuranceImage !== img ? "Driver Insurance Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Insurance</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput6}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput7" style={{ display: 'none' }} onChange={handleImageChange7} />
                                                        <div onClick={() => handleImageClick(drivingLicenseImage)} className='rider_details213'>
                                                            {isPDF(drivingLicenseImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={drivingLicenseImage instanceof File ? URL.createObjectURL(drivingLicenseImage) : drivingLicenseImage} />;
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={drivingLicenseImage instanceof File ? URL.createObjectURL(drivingLicenseImage) : drivingLicenseImage || img}
                                                                    alt={drivingLicenseImage !== img ? "Driver License Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Driving License</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput7}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput8" style={{ display: 'none' }} onChange={handleImageChange8} />
                                                        <div onClick={() => handleImageClick(aadharCardImage)} className='rider_details213'>
                                                            {isPDF(aadharCardImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={aadharCardImage instanceof File ? URL.createObjectURL(aadharCardImage) : aadharCardImage || img} />;
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={aadharCardImage instanceof File ? URL.createObjectURL(aadharCardImage) : aadharCardImage || img}
                                                                    alt={aadharCardImage !== img ? "Driver Aadhar Card Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Aadhar Card</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput8}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput9" style={{ display: 'none' }} onChange={handleImageChange9} />
                                                        <div onClick={() => handleImageClick(cancelCheckImage)} className='rider_details213'>
                                                            {isPDF(cancelCheckImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={cancelCheckImage instanceof File ? URL.createObjectURL(cancelCheckImage) : cancelCheckImage || img} />;
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={cancelCheckImage instanceof File ? URL.createObjectURL(cancelCheckImage) : cancelCheckImage || img}
                                                                    alt={cancelCheckImage !== img ? "Driver Cancel Check Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Cancel Check</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput9}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput10" style={{ display: 'none' }} onChange={handleImageChange10} />
                                                        <div onClick={() => handleImageClick(bankStatementImage)} className='rider_details213'>
                                                            {isPDF(bankStatementImage) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js" >
                                                                    <Viewer fileUrl={bankStatementImage instanceof File ? URL.createObjectURL(bankStatementImage) : bankStatementImage} />
                                                                </Worker>

                                                            ) : (
                                                                <img
                                                                    src={bankStatementImage instanceof File ? URL.createObjectURL(bankStatementImage) : bankStatementImage || img}
                                                                    alt={bankStatementImage !== img ? "Driver Bank Statement Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Bank Statement</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput10}>Update</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.show_Document) && (
                                            <div className='rider_details12'>
                                                <div className='rider_details12114'>
                                                    <h6>Driver's All Documents</h6>
                                                    <div className='rider_details12112'></div>
                                                </div>

                                                <div className='rider_details20'>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'  >
                                                            <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={handleImageChange1} />
                                                            <div onClick={() => handleImageClick(interiorImage)} className='rider_details213'>
                                                                {isPDF(interiorImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={interiorImage instanceof File ? URL.createObjectURL(interiorImage) : interiorImage || img}
                                                                        />
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
                                                            <button onClick={triggerFileInput1}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21' >
                                                            <input type="file" id="fileInput2" style={{ display: 'none' }} onChange={handleImageChange2} />
                                                            <div onClick={() => handleImageClick(exteriorImage)} className='rider_details213'>
                                                                {isPDF(exteriorImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={exteriorImage instanceof File ? URL.createObjectURL(exteriorImage) : exteriorImage} />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={exteriorImage instanceof File ? URL.createObjectURL(exteriorImage) : exteriorImage || img}
                                                                        alt={exteriorImage !== img ? "Driver Exterior Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Exterior</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput2}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput3" style={{ display: 'none' }} onChange={handleImageChange3} />
                                                            <div onClick={() => handleImageClick(rcImage)} className='rider_details213'>
                                                                {isPDF(rcImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={rcImage instanceof File ? URL.createObjectURL(rcImage) : rcImage} />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={rcImage instanceof File ? URL.createObjectURL(rcImage) : rcImage || img}
                                                                        alt={rcImage !== img ? "Driver RC Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>RC</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput3}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput4" style={{ display: 'none' }} onChange={handleImageChange4} />
                                                            <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                                {isPDF(fitnessImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={fitnessImage instanceof File ? URL.createObjectURL(fitnessImage) : fitnessImage} />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={fitnessImage instanceof File ? URL.createObjectURL(fitnessImage) : fitnessImage || img}
                                                                        alt={fitnessImage !== img ? "Driver Fitness Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Fitness</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput4}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput5" style={{ display: 'none' }} onChange={handleImageChange5} />
                                                            <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                                {isPDF(permitImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={permitImage instanceof File ? URL.createObjectURL(permitImage) : permitImage} />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={permitImage instanceof File ? URL.createObjectURL(permitImage) : permitImage || img}
                                                                        alt={permitImage !== img ? "Driver Permit Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Permit</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput5}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput6" style={{ display: 'none' }} onChange={handleImageChange6} />
                                                            <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                                {isPDF(insuranceImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={insuranceImage instanceof File ? URL.createObjectURL(insuranceImage) : insuranceImage} />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={insuranceImage instanceof File ? URL.createObjectURL(insuranceImage) : insuranceImage || img}
                                                                        alt={insuranceImage !== img ? "Driver Insurance Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Insurance</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput6}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput7" style={{ display: 'none' }} onChange={handleImageChange7} />
                                                            <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                                {isPDF(drivingLicenseImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={drivingLicenseImage instanceof File ? URL.createObjectURL(drivingLicenseImage) : drivingLicenseImage} />;
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={drivingLicenseImage instanceof File ? URL.createObjectURL(drivingLicenseImage) : drivingLicenseImage || img}
                                                                        alt={drivingLicenseImage !== img ? "Driver License Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Driving License</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput7}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput8" style={{ display: 'none' }} onChange={handleImageChange8} />
                                                            <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                                {isPDF(aadharCardImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={aadharCardImage instanceof File ? URL.createObjectURL(aadharCardImage) : aadharCardImage || img} />;
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={aadharCardImage instanceof File ? URL.createObjectURL(aadharCardImage) : aadharCardImage || img}
                                                                        alt={aadharCardImage !== img ? "Driver Aadhar Card Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Aadhar Card</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput8}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput9" style={{ display: 'none' }} onChange={handleImageChange9} />
                                                            <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                                {isPDF(cancelCheckImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={cancelCheckImage instanceof File ? URL.createObjectURL(cancelCheckImage) : cancelCheckImage || img} />;
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={cancelCheckImage instanceof File ? URL.createObjectURL(cancelCheckImage) : cancelCheckImage || img}
                                                                        alt={cancelCheckImage !== img ? "Driver Cancel Check Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Cancel Check</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput9}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput10" style={{ display: 'none' }} onChange={handleImageChange10} />
                                                            <div onClick={() => handleImageClick(fitnessImage)} className='rider_details213'>
                                                                {isPDF(bankStatementImage) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js" >
                                                                        <Viewer fileUrl={bankStatementImage instanceof File ? URL.createObjectURL(bankStatementImage) : bankStatementImage} />
                                                                    </Worker>

                                                                ) : (
                                                                    <img
                                                                        src={bankStatementImage instanceof File ? URL.createObjectURL(bankStatementImage) : bankStatementImage || img}
                                                                        alt={bankStatementImage !== img ? "Driver Bank Statement Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Bank Statement</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput10}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default HOC(Driver_Details)