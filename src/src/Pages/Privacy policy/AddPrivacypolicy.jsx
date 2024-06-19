import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Privacypolicy.css'
import HOC from '../../Components/HOC/HOC'



import { useNavigate } from 'react-router-dom';




const AddPrivacypolicy = () => {
    const [privacy, setPrivacy] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate()



    const handlePostRequest = async () => {
        const data = {
            privacy: privacy,
            type: type
        }


        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/privacy', data);
            const message = response.data.message;
            toast.success(message);
            // toast.success("Terms and Conditions add successfully");

            // Reset state variables to clear input fields
            setPrivacy('')
            setType('')
            navigate('/privacypolicy')
        } catch (error) {
            console.error('Error Adding Privacy Policy:', error);
            toast.error("Error to add Privacy Policy ");
        }
    }


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Privacy Policy </h6>
                        </div>
                    </div>
                    <div className='terms'>
                        <div className='terms1'>
                            <h1>Add Privacy Policy</h1>
                        </div>
                        <div className='terms5'>
                            <div className='service1'>
                                <label htmlFor="">Type</label>
                                <select onChange={(e) => setType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    <option name="vendor" value="vendor">Vendor</option>
                                    <option name="user" value="user" >User</option>
                                    <option name="driver" value="driver" >Driver</option>
                                </select>
                            </div>
                            <div className='terms2'>
                                <textarea name="" id="" cols="95" rows="10" placeholder='Enter Terms and Conditions' value={privacy} onChange={(e) => setPrivacy(e.target.value)} ></textarea>
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/privacypolicy')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(AddPrivacypolicy)