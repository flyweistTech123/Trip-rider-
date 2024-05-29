import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Users.css'
import HOC from '../../Components/HOC/HOC'
import { Link, useParams, useNavigate } from 'react-router-dom';
import img2 from '../../Images/user.webp'
import img1 from '../../Images/img28.png'
import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";





const Users_details = () => {

    
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Ensure day and month are two digits
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };

    const { id } = useParams();
    const navigate = useNavigate()
    const [isBlocked, setIsBlocked] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [name, setName] = useState('Default Name');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const [profileimg, setProfileImg] = useState('');
    const [birthday, setBirthday] = useState('')
    const [role, setRole] = useState('')
    const [wallet, setWallet] = useState('')
    const [totaltrip, setTotalTrip] = useState('')
    const [isEditingName, setIsEditingName] = useState(false);








    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders())
            const { name, email, gender, birthday, mobileNumber, profilePicture, role, wallet, totalBooking } = response.data.data;
            if (name) {
                setName(name);
            }
            setEmail(email);
            setNumber(mobileNumber);
            setGender(gender);
            setProfileImg(profilePicture);
            setRole(role);
            setWallet(wallet)
            setTotalTrip(totalBooking)
            const formattedBirthday = formatDate(birthday);
            setBirthday(formattedBirthday);
        } catch (error) {
            console.error('Error fetching User details:', error);
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
        formData.append('birthday', birthday);

        try {
            const response = await axios.put(`${BaseUrl}api/v1/updateDriverVendorProfile/detail/${id}`, formData, getAuthHeaders());
            toast.success("User Details Updated successfully");
            setModalShow(false);
            fetchUserDetails();
        } catch (error) {
            console.log('Error to updating User Details:', error)
            toast.error("Error to updating User Details")
        }
    }



    const handleDeleteRider = async () => {
        try {
            await axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${id}`, getAuthHeaders());
            toast.success("Rider deleted successfully");
            navigate('/riders');
        } catch (error) {
            console.error('Error deleting Rider:', error);
            toast.error("Error deleting Rider");
        }
    };



    const blockRider = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/block/driver/${id}`, getAuthHeaders());
            setIsBlocked(true); // Update isBlocked state
            toast.success("Rider is blocked successfully");
        } catch (error) {
            console.error('Error blocking Rider:', error);
            toast.error("Error blocking Rider");
        }
    };


    const unblockRider = async () => {
        try {
            await axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${id}`, getAuthHeaders());
            setIsBlocked(false); // Update isBlocked state
            toast.success("Rider is unblocked successfully'");
        } catch (error) {
            console.error('Error Unblocking Rider:', error);
            toast.error("Error unblocking Rider");
        }
    };


    const handleImageChange = (e) => {
        setProfileImg(e.target.files[0]);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };


    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>User’s Details</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/users')}>Back</button>
                            <button onClick={handlePutRequest}>Update Profile</button>
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
                                        </div>
                                        <div className='rider_details6'>
                                            <div className='rider_details7' onClick={handleDeleteRider}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider_details7' onClick={() => { isBlocked ? unblockRider() : blockRider() }}>
                                                <MdOutlineBlock color={isBlocked ? "red" : "#667085"} size={20} />
                                                <p style={{ color: isBlocked ? 'red' : '#667085' }}>Block/Unblock</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='rider_details8'>
                                        <div className='rider_details9'>
                                            <p>Wallet Balance</p>
                                            <div className='rider_details10'>
                                                <img src={img1} alt="" />
                                                <p>{wallet}</p>
                                            </div>
                                        </div>
                                        <div className='rider_details99' onClick={() => navigate(`/user_bookings/${id}`)}>
                                            <p>Total Trips</p>
                                            <p>{totaltrip}</p>
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
                                            <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                            <input type="date"  value={formatDate(birthday)} onChange={(e) => setBirthday(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default HOC(Users_details)