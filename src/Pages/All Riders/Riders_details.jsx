import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Riders.css'
import HOC from '../../Components/HOC/HOC'
import { useParams } from 'react-router-dom';
import img2 from '../../Images/user.webp'
import img1 from '../../Images/img28.png'
import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';



import { useNavigate } from 'react-router-dom';



const Riders_details = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return `${formattedDate} `;
    };
    const { id } = useParams();
    const [RiderData, setRiderData] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRiderData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/getUserById/${id}`, getAuthHeaders());
                const riderDataFromApi = response.data.data;
                setRiderData(riderDataFromApi);
                setIsBlocked(riderDataFromApi.isBlock);
            } catch (error) {
                console.error('Error fetching rider data:', error);
            }
        };

        fetchRiderData();
    }, [id]);

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

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>User’s Details</h6>
                        </div>
                    </div>
                    {RiderData && (
                        <>
                            <div className='rider_details'>
                                <div className='rider_details1'>
                                    <div className='rider_details2'>
                                        <div className='rider_details3'>
                                            <img src={RiderData.profilePicture || img2} alt="No image" />
                                            <div className='rider_details4'>
                                                <h6>{RiderData.name}<div className='rider_details5'>
                                                    <p>{RiderData.role}</p>
                                                </div></h6>
                                                {/* <p>Completed  Profile</p> */}
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
                                                    <p>{RiderData.wallet}</p>
                                                    {/* <div className='rider_details11'>
                                                        <p>Expires</p>
                                                        <p>09/21</p>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className='rider_details99'>
                                                <p>Total  Trips</p>
                                                <p>{RiderData.totalBooking}</p>
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
                                                    <p>{RiderData.email}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Phone Number</label>
                                                <div className='input11'>
                                                    <p>{RiderData.mobileNumber}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Gender</label>
                                                <div className='input11'>
                                                    <p>{RiderData.gender}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">DOB</label>
                                                <div className='input11'>
                                                    <p>{formatDate(RiderData.birthday)}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='rider_details19'>
                                        <button onClick={() => navigate('/riders')}>Close</button>
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

export default HOC(Riders_details)