import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Privacypolicy.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';




import { useNavigate, useParams } from 'react-router-dom';


// import img from '../../Images/img5.png'


const UpdateRefundpolicy = () => {
    const { id } = useParams();
    const [refundpolicy, setRefundpolicy] = useState('');
    const [type, setType] = useState('user');
    const navigate = useNavigate()

    const fetchRefundPolicyDetails = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/terms/byId/${id}`, getAuthHeaders())
            const { refund, type, } = response.data.data;
            setRefundpolicy(refund);
            setType(type);
        } catch (error) {
            console.error('Error fetching Refund policy details:', error);
        }
    };

    useEffect(() => {
        fetchRefundPolicyDetails();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            privacy: refundpolicy,
            type: type,
        }


        try {
            const response = await axios.put(`${BaseUrl}api/v1/terms/${id}`, data, getAuthHeaders());
            toast.success("Refund policy Updated successfully");
            if (type === 'user') {
                navigate('/userrefundpolicy')
            } else if (type === 'driver') {
                navigate('/driverrefundpolicy')
            } else {
                navigate('/vendorrefundpolicy')
            }
        } catch (error) {
            console.error('Error updating Refund policy:', error);
            toast.error("Failed to update Refund policy. Please try again later.");
        }
    };


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Privacy Policy</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate(-1)}>
                                Back
                            </button>
                            <button onClick={handleUpdate}>
                                Update
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
                                <textarea name="" id="" rows="10" placeholder='Enter Privacy Policy' value={refundpolicy} onChange={(e) => setRefundpolicy(e.target.value)} ></textarea>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(UpdateRefundpolicy)