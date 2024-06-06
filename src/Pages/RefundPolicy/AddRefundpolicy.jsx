import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Privacypolicy.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


import { useNavigate, useParams } from 'react-router-dom';


// import img from '../../Images/img5.png'


const AddRefundpolicy = () => {
    const { id } = useParams();
    const [refundpolicy, setRefundpolicy] = useState('');
    const [type, setType] = useState(id);
    const navigate = useNavigate()



    const handlePostRequest = async () => {
        const data = {
            refund: refundpolicy,
            type: type
        }


        try {
            const response = await axios.post(`${BaseUrl}api/v1/refundPolicy`, data, getAuthHeaders());
            const message = response.data.message;
            toast.success(message);
            // toast.success("Terms and Conditions added successfully");
            setRefundpolicy('')
            setType('')
            if (type === 'user') {
                navigate('/userrefundpolicy')
            } else if (type === 'driver') {
                navigate('/driverrefundpolicy')
            } else {
                navigate('/vendorrefundpolicy')
            }
        } catch (error) {
            console.error('Error Adding Refund policy:', error);
            toast.error("Failed to Add Refund policy. Please try again later.");
        }
    }


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Refund policy</h6>
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
                                <label htmlFor="">Refund policy</label>
                                <textarea name="" id="" rows="10" placeholder='Enter Refund policy' value={refundpolicy} onChange={(e) => setRefundpolicy(e.target.value)} ></textarea>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(AddRefundpolicy)