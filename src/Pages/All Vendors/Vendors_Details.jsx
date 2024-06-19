import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import './Vendors.css'
import HOC from '../../Components/HOC/HOC'
import { useParams } from 'react-router-dom';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import img1 from '../../Images/img28.png'
import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import img2 from '../../Images/user.webp'
import img from '../../Images/imgno.jpg'
import { Button, Form } from "react-bootstrap";
import { MdEdit } from "react-icons/md";


import { useNavigate } from 'react-router-dom';



const Vendors_Details = () => {
    const { id } = useParams();
    const [vendorData, setVendorData] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const navigate = useNavigate()



    const [modalShow1, setModalShow1] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
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
    const [noofvehicle, setnNOfVehicle] = useState('')
    const [adharcardimg, setAdharcardImg] = useState('');
    const [gstimg, setGstImg] = useState('');
    const [panCardimg, setpanCardImg] = useState('');
    const [rcNumbers, setRCNumbers] = useState([])
    const [isEditingName, setIsEditingName] = useState(false);
    const [status, setStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [img, setImage] = useState('');


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







    const handleImageChange = (e) => {
        setProfileImg(e.target.files[0]);
    };

    const handleImageChange1 = async (e) => {
        const file = e.target.files[0]; // Assuming single file selection
        if (file) {
            setAdharcardImg(file); // Update state with selected file

            // Fetch image URL
            const adharImageUrl = await fetchImageUrl(file);
            if (adharImageUrl) {
                setAdharcardImg(adharImageUrl); // Update state with image URL
            }
        }
    };


    const handleImageChange2 = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setGstImg(file);

            const gstImageUrl = await fetchImageUrl(file);
            if (gstImageUrl) {
                setGstImg(gstImageUrl);
            }
        }
    };

    const handleImageChange3 = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setpanCardImg(file);

            const panCardImageUrl = await fetchImageUrl(file);
            if (panCardImageUrl) {
                setpanCardImg(panCardImageUrl);
            }
        }
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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };


    const fetchvendorDetails = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders())
            const data = response.data.data;
            setVendorData(data);
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
            setnNOfVehicle(data.noOfVehicle)
            setRCNumbers(data.driverDocument.vendorRc_number?.length > 0 ? data?.driverDocument?.vendorRc_number : ['']);
            setAdharcardImg(data.driverDocument.aadhar || img);
            console.log(data.driverDocument.aadhar, "aghfdgsa")
            setGstImg(data.driverDocument.gst || img);
            setpanCardImg(data.driverDocument.panCard || img);
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


    const handleRCNumberChange = (index, value) => {
        const newRCNumbers = [...rcNumbers];
        newRCNumbers[index] = value;
        setRCNumbers(newRCNumbers);

        // Check for duplicate RC numbers
        const duplicates = newRCNumbers.filter((item, idx) => newRCNumbers.indexOf(item) !== idx);
        if (duplicates.length > 0) {
            setErrorMessage('Duplicate RC numbers found');
        } else {
            setErrorMessage('');
        }
    };

    const addRCNumber = () => {
        setRCNumbers([...rcNumbers, '']);
    };



    const updateUserDetails = async (e) => {
        e.preventDefault();

        const userDetailsFormData = new FormData();
        userDetailsFormData.append('name', name);
        userDetailsFormData.append('email', email);
        appendIfPresent(userDetailsFormData, 'mobileNumber', number);
        userDetailsFormData.append('gender', gender);
        userDetailsFormData.append('profilePicture', profileimg);
        appendIfPresent(userDetailsFormData, 'birthday', birthday);
        userDetailsFormData.append('noOfVehicle', noofvehicle);
        try {
            await axios.put(`${BaseUrl}api/v1/updateDriverVendorProfile/detail/${id}`, userDetailsFormData, getAuthHeaders());
            toast.success("Vendor Details Updated successfully");
        } catch (error) {
            console.error('Error updating Vendor details:', error);
            toast.error("Failed to update Vendor details. Please try again later.");
        }
    };



    const updateDocumentDetails = async (e) => {
        e.preventDefault();
        const documentDetails = {
            vendorRc_number: rcNumbers,

        };
        try {
            await axios.post(`${BaseUrl}api/v1/vendor/documentVendorDetailByAdmin/${id}`, documentDetails, getAuthHeaders());
            toast.success("Vendor RC Number Details Updated successfully");
        } catch (error) {
            console.error('Error updating Vehicle details:', error);
            toast.error("Failed to update Vendor RC Number Details. Please try again later.");
        }
    };

    const fetchImageUrl = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://admin.flyweistechnologies.com/api/api/v1/driver/getImageUrl', formData, getAuthHeaders())
            return response.data.data; // Assuming response.data.data contains the image URL
        } catch (error) {
            console.error('Error fetching image URL:', error);
            toast.error('Failed to fetch image URL. Please try again later.');
            return null;
        }
    };

    const updateImageDetails = async (e) => {
        e.preventDefault();

        try {
            const documentDetails = {
                vendorRc_number: rcNumbers,
                aadhar: adharcardimg instanceof File ? await fetchImageUrl(adharcardimg) : adharcardimg,
                gst: gstimg instanceof File ? await fetchImageUrl(gstimg) : gstimg,
                panCard: panCardimg instanceof File ? await fetchImageUrl(panCardimg) : panCardimg,
            };

            // Update backend API with document detail
            await axios.post(`${BaseUrl}api/v1/vendor/documentVendorDetailByAdmin/${id}`, documentDetails, getAuthHeaders());
            toast.success('Vendor Document Updated successfully');
        } catch (error) {
            console.error('Error updating image Vendor:', error);
            toast.error('Failed to update Vendor Document. Please try again later.');
        }
    };






    const handleDeleteVendor = async () => {
        try {
            await axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${id}`);
            toast.success("Vendor deleted successfully");
            navigate('/vendors');
        } catch (error) {
            console.error('Error deleting Vendor:', error);
            toast.error("Failed to delete Vendor. Please try again later.");
        }
    };



    const blockVendor = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/block/driver/${id}`);
            setIsBlocked(true); // Update isBlocked state
            toast.success("Vendor is blocked successfully");
        } catch (error) {
            console.error('Error blocking vendor:', error);
            toast.error("Failed to block vendor. Please try again later.");
        }
    };

    const unblockVendor = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${id}`);
            setIsBlocked(false); // Update isBlocked state
            toast.success("Vendor is unblocked successfully'");
        } catch (error) {
            console.error('Error Unblocking vendor:', error);
            toast.error("Failed to unblock vendor. Please try again later.");
        }
    };



    useEffect(() => {
        fetchvendorDetails();
    }, [id]);

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


        useEffect(() => {
            const fetchVendorData = async () => {
                try {
                    const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders());
                    const VendorStatus = response.data.data.status;
                    const VendorRemark = response.data.data.kycRemark;
                    setKYCstatus(VendorStatus);
                    setKYCRemarkstatus(VendorRemark);
                } catch (error) {
                    console.error('Error fetching vendor data:', error);
                }
            };

            fetchVendorData();
        }, [id]);


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
                fetchvendorDetails();
                setModalShow(false);
                toast.success("KYC Status Updated successfully");
            } catch (error) {
                // Handle errors if request fails
                toast.error("Error updating KYC Status");
            }
        };





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
                                    <Viewer fileUrl={imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl || img} style={{ width: '100%' }} />;
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


    const cachedAdminData = localStorage.getItem('adminData');
    const adminData = JSON.parse(cachedAdminData);
    const role1 = localStorage.getItem('role');

    let permissionsArray = [];

    if (adminData && adminData.permissions) {
        permissionsArray = adminData.permissions;
    } else {
        console.log('Permissions array not found in adminData.');
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
                imageUrl={currentImageUrl}
            />
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Vendor Details</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/vendors')}>Back</button>
                            {role1 === 'superAdmin' ? (
                                <>
                                    <button onClick={updateUserDetails}>Update Profile</button>

                                </>
                            ) : (
                                <>
                                    {permissionsArray.some(permission => permission.name === 'All Vendors' && permission.edit) && (
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
                                        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
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
                                                    <div className='rider_details7' onClick={handleDeleteVendor}>
                                                        <RiDeleteBinLine color='#667085' size={20} />
                                                        <p>Delete</p>
                                                    </div>
                                                    <div className='rider_details7' onClick={() => { isBlocked ? unblockVendor() : blockVendor() }}>
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
                                                    {permissionsArray.some(permission => permission.name === 'All Vendors' && permission.delete) && (
                                                        <div className='rider_details7' onClick={handleDeleteVendor}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                    )}
                                                    {permissionsArray.some(permission => permission.name === 'All Vendors' && permission.block) && (
                                                        <div className='rider_details7' onClick={() => { isBlocked ? unblockVendor() : blockVendor() }}>
                                                            <MdOutlineBlock color={isBlocked ? "red" : "#667085"} size={20} />
                                                            <p style={{ color: isBlocked ? 'red' : '#667085' }}>Block/Unblock</p>
                                                        </div>
                                                    )}
                                                    {permissionsArray.some(permission => permission.name === 'All Vendors' && permission.edit) && (
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
                                        <div className='rider_details9'>
                                            <p>Wallet Balance</p>
                                            <div className='rider_details10'>
                                                <img src={img1} alt="" />
                                                <p>{wallet}</p>
                                                {/* <div className='rider_details11'>
                                                        <p>Expires</p>
                                                        <p>09/21</p>
                                                    </div> */}
                                            </div>
                                        </div>
                                        <div className='rider_details99' onClick={() => navigate(`/vendor_bookings/${id}`)}>
                                            <p>Total  Trips</p>
                                            <p>{totaltrip}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className='rider_details12'>
                                    <div className='rider_details12111'>
                                        <h6>Vendor's personal information</h6>
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
                                        <div className='rider_details14'>
                                            <label htmlFor="">Number of Vehicle</label>
                                            <input type="number" placeholder='Enter  number of vehicle' value={noofvehicle} onChange={(e) => setnNOfVehicle(e.target.value)} />
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
                                            <label htmlFor="">RC Number</label>
                                            {rcNumbers.map((rcNumber, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    placeholder='Enter RC number'
                                                    value={rcNumber}
                                                    onChange={(e) => handleRCNumberChange(index, e.target.value)}
                                                />
                                            ))}
                                            <div className='rider4'>
                                                <button onClick={addRCNumber}>Add More</button>
                                            </div>
                                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                        </div>

                                    </div>

                                </div>


                                {role1 === 'superAdmin' ? (
                                    <>
                                        <div className='rider_details12'>
                                            <div className='rider_details12114'>
                                                <h6>Vendor's All Documents</h6>
                                                <div className='rider_details1211212112'></div>
                                                <div className='rider4'>
                                                    <button onClick={updateImageDetails}>Update</button>
                                                </div>
                                            </div>

                                            <div className='rider_details20'>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'  >
                                                        <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={handleImageChange1} />
                                                        <div onClick={() => handleImageClick(adharcardimg)} className='rider_details213'>
                                                            {isPDF(adharcardimg) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={adharcardimg instanceof File ? URL.createObjectURL(adharcardimg) : adharcardimg || img}
                                                                    />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={adharcardimg instanceof File ? URL.createObjectURL(adharcardimg) : adharcardimg || img}
                                                                    alt={adharcardimg !== img ? "vendor adhar card Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Adhar</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput1}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21' >
                                                        <input type="file" id="fileInput2" style={{ display: 'none' }} onChange={handleImageChange2} />
                                                        <div onClick={() => handleImageClick(gstimg)} className='rider_details213'>
                                                            {isPDF(gstimg) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={gstimg instanceof File ? URL.createObjectURL(gstimg) : gstimg} />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={gstimg instanceof File ? URL.createObjectURL(gstimg) : gstimg || img}
                                                                    alt={gstimg !== img ? "Driver Exterior Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>GST Certificate</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput2}>Update</button>
                                                    </div>
                                                </div>
                                                <div className='rider_details2122'>
                                                    <div className='rider_details21'>
                                                        <input type="file" id="fileInput3" style={{ display: 'none' }} onChange={handleImageChange3} />
                                                        <div onClick={() => handleImageClick(panCardimg)} className='rider_details213'>
                                                            {isPDF(panCardimg) ? (
                                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                    <Viewer fileUrl={panCardimg instanceof File ? URL.createObjectURL(panCardimg) : panCardimg} />
                                                                </Worker>
                                                            ) : (
                                                                <img
                                                                    src={panCardimg instanceof File ? URL.createObjectURL(panCardimg) : panCardimg || img}
                                                                    alt={panCardimg !== img ? "Driver RC Image" : "No Image"}
                                                                />
                                                            )}
                                                            <h6>Pan Card</h6>
                                                        </div>
                                                    </div>
                                                    <div className='rider4'>
                                                        <button onClick={triggerFileInput3}>Update</button>
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
                                                    <h6>Vendor's All Documents</h6>
                                                    <div className='rider_details1211212112'></div>
                                                    <div className='rider4'>
                                                        <button onClick={updateImageDetails}>Update</button>
                                                    </div>
                                                </div>

                                                <div className='rider_details20'>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'  >
                                                            <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={handleImageChange1} />
                                                            <div onClick={() => handleImageClick(setAdharcardImg)} className='rider_details213'>
                                                                {isPDF(adharcardimg) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={adharcardimg instanceof File ? URL.createObjectURL(adharcardimg) : adharcardimg || img}
                                                                        />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={adharcardimg instanceof File ? URL.createObjectURL(adharcardimg) : adharcardimg || img}
                                                                        alt={adharcardimg !== img ? "vendor adhar card Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Adhar</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput1}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21' >
                                                            <input type="file" id="fileInput2" style={{ display: 'none' }} onChange={handleImageChange2} />
                                                            <div onClick={() => handleImageClick(gstimg)} className='rider_details213'>
                                                                {isPDF(gstimg) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={gstimg instanceof File ? URL.createObjectURL(gstimg) : gstimg} />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={gstimg instanceof File ? URL.createObjectURL(gstimg) : gstimg || img}
                                                                        alt={gstimg !== img ? "Driver Exterior Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>GST Certificate</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput2}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className='rider_details2122'>
                                                        <div className='rider_details21'>
                                                            <input type="file" id="fileInput3" style={{ display: 'none' }} onChange={handleImageChange3} />
                                                            <div onClick={() => handleImageClick(panCardimg)} className='rider_details213'>
                                                                {isPDF(panCardimg) ? (
                                                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                        <Viewer fileUrl={panCardimg instanceof File ? URL.createObjectURL(panCardimg) : panCardimg} />
                                                                    </Worker>
                                                                ) : (
                                                                    <img
                                                                        src={panCardimg instanceof File ? URL.createObjectURL(panCardimg) : panCardimg || img}
                                                                        alt={panCardimg !== img ? "Driver RC Image" : "No Image"}
                                                                    />
                                                                )}
                                                                <h6>Pan Card</h6>
                                                            </div>
                                                        </div>
                                                        <div className='rider4'>
                                                            <button onClick={triggerFileInput3}>Update</button>
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

export default HOC(Vendors_Details)