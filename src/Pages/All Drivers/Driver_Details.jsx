import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Drivers.css'
import HOC from '../../Components/HOC/HOC'
import { useParams } from 'react-router-dom';
import img from '../../Images/img27.png'
import img1 from '../../Images/img28.png'
import { MdOutlineBlock } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiHome } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";


import { useNavigate } from 'react-router-dom';



const Driver_Details = () => {
    const { id } = useParams();
    const [DriverData, setDriverData] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false); // Initialize isBlocked state to false
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDriverData = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/getUserById/${id}`); // Use the ID from the URL
                const driverDataFromApi = response.data.data;
                setDriverData(driverDataFromApi);
                setIsBlocked(driverDataFromApi.isBlock);
            } catch (error) {
                console.error('Error fetching driver data:', error);
            }
        };

        fetchDriverData();
    }, [id]);

    const handleDeleteDriver = async () => {
        try {
            await axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/admin/delete/driver/${id}`);
            toast.success("Driver deleted successfully");
            navigate('/drivers');
        } catch (error) {
            console.error('Error deleting Driver:', error);
            toast.error("Error deleting Driver");
        }
    };



    const blockDriver = async () => {
        try {
            await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/block/driver/${id}`);
            setIsBlocked(true); // Update isBlocked state
            toast.success("Driver is blocked successfully");
        } catch (error) {
            console.error('Error blocking driver:', error);
            toast.error("Error blocking driver");
        }
    };

    const unblockDriver = async () => {
        try {
            await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/unblock/driver/${id}`);
            setIsBlocked(false); // Update isBlocked state
            toast.success("Driver is unblocked successfully'");
        } catch (error) {
            console.error('Error Unblocking driver:', error);
            toast.error("Error unblocking Driver");
        }
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Driver Details</h6>
                        </div>
                    </div>
                    {DriverData && (
                        <>
                            <div className='rider_details'>
                                <div className='rider_details1'>
                                    <div className='rider_details2'>
                                        <div className='rider_details3'>
                                            <img src={img} alt="" />
                                            <div className='rider_details4'>
                                                <h6>{DriverData.name}<div className='rider_details5'>
                                                    <p>Host</p>
                                                </div></h6>
                                                <p>Completed  Profile</p>
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
                                            </div>
                                        </div>

                                        <div className='rider_details8'>
                                            <div className='rider_details9'>
                                                <p>Wallet Balance</p>
                                                <div className='rider_details10'>
                                                    <img src={img1} alt="" />
                                                    <p>{DriverData.wallet}</p>
                                                    <div className='rider_details11'>
                                                        <p>Expires</p>
                                                        <p>09/21</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='rider_details99'>
                                                <p>Total  Trips</p>
                                                <p>36</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='rider_details12'>
                                        <div className='rider_details13'>
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
                                                    <p>{DriverData.aadhar}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">First Line Address</label>
                                                <div className='input11'>
                                                    <p>{DriverData.present_address}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Second Line Address</label>
                                                <div className='input11'>
                                                    <p>{DriverData.permanent_address}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">District</label>
                                                <div className='input11'>
                                                    <p>{DriverData.registered_at}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Pin Code</label>
                                                <div className='input11'>
                                                    <p>{DriverData.registered_at}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Country</label>
                                                <div className='input11'>
                                                    <p>{DriverData.registered_at}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">State</label>
                                                <div className='input11'>
                                                    <p>{DriverData.registered_at}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Type</label>
                                                <div className='input11'>
                                                    <p>{DriverData.vehicle_category}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Number</label>
                                                <div className='input11'>
                                                    <p>{DriverData.permit_number}</p>
                                                </div>
                                            </div>
                                            <div className='rider_details14'>
                                                <label htmlFor="">Vehicle Name</label>
                                                <div className='input11'>
                                                    <p>{DriverData.maker_model}</p>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>

                                    {/* <div className='rider_details15'>
                                        <p>Saved As</p>
                                        <div className='rider_details18'>
                                            <div className='rider_details16'>
                                                <FiHome color='#FFFFFF' />
                                                <p>Home</p>
                                            </div>
                                            <div className='rider_details17'>
                                                <MdWorkOutline color='#C3052C' />
                                                <p>Work</p>
                                            </div>
                                            <div className='rider_details17'>
                                                <LuUserSquare2 color='#C3052C' />
                                                <p>Other</p>
                                            </div>
                                        </div>

                                    </div> */}

                                    <div className='rider_details19'>
                                        {/* <button>Cancel</button> */}
                                        <button onClick={() => navigate('/drivers')}>Close</button>
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