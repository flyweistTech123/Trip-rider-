import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Privacypolicy.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


import { useNavigate, useParams } from 'react-router-dom';


// import img from '../../Images/img5.png'


const AddPrivacypolicy = () => {
    const { id } = useParams();
    const [privacy, setPrivacy] = useState('');
    const [type, setType] = useState(id);
    const navigate = useNavigate()



    const handlePostRequest = async () => {
        const data = {
            privacy: privacy,
            type: type
        }


        try {
            const response = await axios.post(`${BaseUrl}api/v1/privacy`, data, getAuthHeaders());
            const message = response.data.message;
            toast.success(message);
            // toast.success("Terms and Conditions added successfully");
            setPrivacy('')
            setType('')
            if (type === 'user') {
                navigate('/userprivacypolicy')
            } else if (type === 'driver') {
                navigate('/driverprivacypolicy')
            } else {
                navigate('/vendorprivacypolicy')
            }
        } catch (error) {
            console.error('Error Adding Privacy Policy:', error);
            toast.error("Failed to Add Privacy Policy. Please try again later.");
        }
    }


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Privacy Policy</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate(-1)}>
                                Back
                            </button>
                            <button onClick={handlePostRequest}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className='terms'>
                        <div className='terms2'>
                            {/* <div className='terms3'>
                                <label htmlFor="">Type</label>
                                <select onChange={(e) => setType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    <option name="vendor" value="vendor">Vendor</option>
                                    <option name="user" value="user" >User</option>
                                    <option name="driver" value="driver" >Driver</option>
                                </select>
                            </div> */}
                            <div className='terms3'>
                                <label htmlFor="">Privacy Policy</label>
                                <textarea name="" id="" rows="10" placeholder='Enter Privacy Policy' value={privacy} onChange={(e) => setPrivacy(e.target.value)} ></textarea>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(AddPrivacypolicy)