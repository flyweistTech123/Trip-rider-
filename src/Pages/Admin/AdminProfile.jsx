import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminProfile.css'
import HOC from '../../Components/HOC/HOC'
import img1 from '../../Images/img28.png'
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


import { useNavigate } from 'react-router-dom';

import img2 from '../../Images/user.webp'


const AdminProfile = () => {
    const [adminData, setAdminData] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);


    const navigate = useNavigate()



    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // const token = localStorage.getItem("token"); 
                const response = await axios.get(`${BaseUrl}api/v1/admin/me`, getAuthHeaders())
                const AdminDataFromApi = response.data.data;
                setAdminData(AdminDataFromApi);
            } catch (error) {
                console.error('Error fetching Admin data:', error);
            }
        };

        fetchAdminData();
    }, []);



    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate().toString().padStart(2, '0')}`;

        return `${formattedDate}`;
    };




    const formatTime = (dateString) => {
        const date = new Date(dateString);


        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedTime = `${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}${ampm}`;

        // Combine date and time
        return `${formattedTime}`;
    };



    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };



    function UpdateProfileModal(props) {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [number, setNumber] = useState('');
        const [gender, setGender] = useState('');
        const [profileimg, setProfileImg] = useState('');
        const [address, setAddress] = useState('');
        const [birthday, setBirthday] = useState('')


        const fetchadminDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/admin/me`, getAuthHeaders())
                const { name, email, address, gender, birthday, mobileNumber, profilePicture } = response.data.data;
                setName(name);
                setEmail(email);
                setNumber(mobileNumber);
                setGender(gender);
                setProfileImg(profilePicture);
                setAddress(address);
                const formattedBirthday = formatDate(birthday);
                setBirthday(formattedBirthday);
            } catch (error) {
                console.error('Error fetching Admin details:', error);
            }
        };



        const handlePutRequest = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('mobileNumber', number);
            formData.append('gender', gender);
            formData.append('profilePicture', profileimg);
            formData.append('address', address);
            formData.append('birthday', birthday);

            try {
                const token = localStorage.getItem("token");
                const response = await axios.put(
                    `${BaseUrl}api/v1/admin/detail`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Admin Profile Updated successfully");
                setModalShow(false);
                fetchadminDetails();
            } catch (error) {
                console.log('Error to updating Admin Profile:', error)
                toast.error("Error to updating Admin Profile")
            }
        }


        useEffect(() => {
            fetchadminDetails();
        }, []);

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='adminprofileupdate'>
                    <Modal.Title id="contained-modal-title-vcenter" >Update Admin Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePutRequest}>
                        <div className='setting6'>
                            <label htmlFor="">Profile Image</label>
                            <div className='setting7' >
                                {profileimg ? (
                                    <img src={profileimg instanceof File ? URL.createObjectURL(profileimg) : profileimg} alt="" />
                                ) : (
                                    " "
                                )}
                            </div>
                            <button onMouseDown={triggerFileInput}>Browse</button>
                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setProfileImg(e.target.files[0])} />
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </Form.Group>

                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Check
                                type="radio"
                                label="Male"
                                name="status"
                                checked={gender === "male"}
                                onChange={() => setGender("male")}
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                name="status"
                                checked={gender === "female"}
                                onChange={() => setGender("female")}
                            />
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>D.O.B</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
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


    return (
        <>
            <UpdateProfileModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Admin Details</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => setModalShow(true)}>Update Profile</button>
                        </div>
                    </div>
                    {adminData && (
                        <>
                            <div className='rider_details'>
                                <div className='rider_details1'>
                                    <div className='rider_details2'>
                                        <div className='rider_details3'>
                                            <img src={adminData?.profilePicture || img2} alt="No image"  />
                                            <div className='rider_details4'>
                                                <h6>{adminData.name}<div className='rider_details5'>
                                                    <p>{adminData.role}</p>
                                                </div></h6>
                                                {/* <p>Completed  Profile</p> */}
                                            </div>
                                        </div>

                                        <div className='rider_details8'>
                                            <div className='rider_details9'>
                                                <p>Wallet Balance</p>
                                                <div className='rider_details10'>
                                                    <img src={img1} alt="" />
                                                    <p>{adminData.wallet}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='rider_details12'>
                                        <div className='rider_details12111'>
                                            <h6>Admin's personal information</h6>
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
                                                <label htmlFor="">Alternate Phone Number</label>
                                                <div className='input11'>
                                                    <p>{adminData.mobileNumber}</p>
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
                                                <label htmlFor="">Admin In Hand Cash</label>
                                                <div className='input11'>
                                                    <p>₹ {adminData.adminCash}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='rider_details19'>
                                        <button onClick={() => navigate('/dashboard')}>Close</button>
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

export default HOC(AdminProfile)