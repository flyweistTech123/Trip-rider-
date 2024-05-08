import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from "react-bootstrap/Modal";
import 'react-toastify/dist/ReactToastify.css';
import HOC from '../../Components/HOC/HOC'
import { useParams } from 'react-router-dom';
import img2 from '../../Images/user.webp'
import img1 from '../../Images/img28.png'
import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { MdEdit } from "react-icons/md";
import { Button, Form } from "react-bootstrap";


import { useNavigate } from 'react-router-dom';



const AdminDetails = () => {


    const permissionsList = [
        'Dashboard',
        'All Users',
        'All Drivers',
        'All Earnings',
        'All Drivers Earnings',
        'All Vendors',
        'Privileges',
        'Push Notification',
        'Wallet Management',
        'Payout Management',
        'All Bookings',
        'All Referrals',
        'Services',
        'SOS Updates',
        'Update Banner',
        'Promo Code',
        'Live Chat',
        'Location',
        'Pricing',
        'Subscription Booking',
        'Vehicle Types',
        'Geofencing',
        'Terms and conditions',
        'Privacy policy'
    ];




    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return `${formattedDate} `;
    };


    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const [adminData, setAdminData] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [newPermission, setNewPermission] = useState('');
    const [kycstatus1, setKYCstatus1] = useState(" ");


    const navigate = useNavigate()

    const fetchAdminData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders());
            const adminDataFromApi = response.data.data;
            const adminStatus = response.data.data.status;
            setKYCstatus1(adminStatus)
            setAdminData(adminDataFromApi);
            setIsBlocked(adminDataFromApi.isBlock);
        } catch (error) {
            console.error('Error fetching rider data:', error);
        }
    };


    const handleDeleteAdmin = async () => {
        try {
            await axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${id}`, getAuthHeaders());
            toast.success("Admin deleted successfully");
            navigate('/riders');
        } catch (error) {
            console.error('Error deleting Admin:', error);
            toast.error("Error deleting Admin");
        }
    };



    const blockAdmin = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/block/driver/${id}`, getAuthHeaders());
            setIsBlocked(true); // Update isBlocked state
            toast.success("Admin is blocked successfully");
        } catch (error) {
            console.error('Error blocking Admin:', error);
            toast.error("Error blocking Admin");
        }
    };


    const unblockAdmin = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${id}`, getAuthHeaders());
            setIsBlocked(false); // Update isBlocked state
            toast.success("Admin is unblocked successfully'");
        } catch (error) {
            console.error('Error Unblocking Admin:', error);
            toast.error("Error unblocking Admin");
        }
    };


    const handlePermissionAdd = async () => {
        try {
            if (!newPermission) {
                return; // Exit early if newPermission is empty
            }

            // Check if the new permission already exists in adminData.permissions
            if (adminData.permissions.includes(newPermission)) {
                toast.error('Permission already exists');
                return; // Exit if the permission already exists
            }

            // Validate newPermission against the permissionsList
            if (!permissionsList.includes(newPermission)) {
                toast.error('Invalid permission');
                return; // Exit if the permission is not valid
            }

            // Construct the updated permissions array by adding the new permission
            const updatedPermissions = [...adminData.permissions, newPermission];

            // Make the API request to update the permissions
            await axios.put(
                `${BaseUrl}api/v1/SuperAdmin/updateAdminProfile/${id}`,
                { permissions: updatedPermissions },
                getAuthHeaders()
            );

            // Clear the newPermission state
            setNewPermission('');

            // Display success message
            toast.success('Permission added successfully');

            // Refresh admin data after permission update
            fetchAdminData();
        } catch (error) {
            console.error('Error adding permission:', error);
            toast.error('Error adding permission');
        }
    };


    const handlePermissionDelete = async (permission) => {
        try {
            // Filter out the permission to be deleted from the permissions array
            const updatedPermissions = adminData.permissions.filter((perm) => perm !== permission);

            // Make the API request to update the permissions
            await axios.put(
                `${BaseUrl}api/v1/SuperAdmin/updateAdminProfile/${id}`,
                { permissions: updatedPermissions },
                getAuthHeaders()
            );

            // Display success message
            toast.success('Permission removed successfully');

            // Update adminData with the updated permissions
            setAdminData({ ...adminData, permissions: updatedPermissions });
        } catch (error) {
            console.error('Error deleting permission:', error);
            toast.error('Error deleting permission');
        }
    };

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





    useEffect(() => {
        fetchAdminData();
    }, [id]);


    return (
        <>
            <KycStatusModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Admin's Details</h6>
                        </div>
                    </div>
                    {adminData && (
                        <>
                            <div className='rider_details'>
                                <div className='rider_details1'>
                                    <div className='rider_details2'>
                                        <div className='rider_details3'>
                                            <img src={adminData.profilePicture || img2} alt="No image" />
                                            <div className='rider_details4'>
                                                <h6>{adminData.name}<div className='rider_details5'>
                                                    <p>{adminData.role}</p>
                                                </div></h6>
                                                <div>
                                                    <p style={{ color: textColor }}>{adminData.status}  Profile</p>
                                                </div>
                                            </div>
                                            <div className='rider_details6'>
                                                <div className='rider_details7' onClick={handleDeleteAdmin}>
                                                    <RiDeleteBinLine color='#667085' size={20} />
                                                    <p>Delete</p>
                                                </div>
                                                <div className='rider_details7' onClick={() => { isBlocked ? unblockAdmin() : blockAdmin() }}>
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
                                                    <p>{adminData.wallet}</p>
                                                    {/* <div className='rider_details11'>
                                                        <p>Expires</p>
                                                        <p>09/21</p>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className='rider_details99'>
                                                <p>Status</p>
                                                <p>{adminData.status}</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='rider_details12'>
                                        <div className='rider_details12111'>
                                            <h6>User's personal information</h6>
                                            <div className='rider_details12112'></div>
                                        </div>
                                        <div className='rider_details13'>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Email</label>
                                                <div className='input11'>
                                                    <p>{adminData.email}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Phone Number</label>
                                                <div className='input11'>
                                                    <p>{adminData.mobileNumber}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Gender</label>
                                                <div className='input11'>
                                                    <p>{adminData.gender}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">DOB</label>
                                                <div className='input11'>
                                                    <p>{formatDate(adminData.birthday)}</p>
                                                </div>
                                            </div>

                                            <div className='rider_details14'>
                                                <label htmlFor="">Address</label>
                                                <div className='input11'>
                                                    <p>{adminData.address}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Address</label>
                                                <select value={newPermission} onChange={(e) => setNewPermission(e.target.value)}>
                                                    <option value="">Select Permission</option>
                                                    {permissionsList.map((perm) => (
                                                        <option key={perm} value={perm}>
                                                            {perm}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>

                                        </div>
                                    </div>


                                    <div className='rider_details14'>
                                        <label htmlFor="">Permissions</label>
                                        <ul className="permission-list">
                                            {adminData.permissions.length > 0 ? (
                                                <ul className="permission-list">
                                                    {adminData.permissions.map((perm, index) => (
                                                        <li key={index} className="permission-item">
                                                            <span className="permission-count">{index + 1}</span>
                                                            <span>{perm}</span>
                                                            <RiDeleteBinLine
                                                                className="delete-icon"
                                                                color='#667085'
                                                                size={20}
                                                                onClick={() => handlePermissionDelete(perm)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className='no-permissions-message'>No permissions!</p>
                                            )}
                                        </ul>
                                    </div>

                                    <div className='promo1'>
                                        <button onClick={() => navigate('/privileges')}>Close</button>
                                        <button onClick={handlePermissionAdd}>Save Changes</button>
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

export default HOC(AdminDetails)