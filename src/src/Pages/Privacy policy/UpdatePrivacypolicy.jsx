import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Privacypolicy.css'
import HOC from '../../Components/HOC/HOC'




import { useNavigate, useParams } from 'react-router-dom';


// import img from '../../Images/img5.png'


const UpdatePrivacypolicy = () => {
    const { id } = useParams(); 
    const [privacy, setPrivacy] = useState('');
    const [policyType, setPolicyType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrivacyDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/privacy/type/${id}`);
                const { privacy, type } = response.data.data;
                setPrivacy(privacy);
                setPolicyType(type);
            } catch (error) {
                console.error('Error fetching Privacy Policy details:', error);
                toast.error("Error fetching Privacy Policy details");
            }
        };
        fetchPrivacyDetails();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            privacy: privacy,
            type: policyType,
        }

        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/privacy/${id}`, data);
            toast.success("Privacy Policy Updated successfully");
            navigate('/privacypolicy');
        } catch (error) {
            console.error('Error updating Privacy Policy:', error);
            toast.error("Error updating Privacy Policy");
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
                    </div>
                    <div className='terms'>
                        <div className='terms1'>
                            <h1>Update Privacy Policy</h1>
                        </div>
                        <div className='terms5'>
                            <div className='service1'>
                                <label htmlFor="">Type</label>
                                <select onChange={(e) => setPolicyType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    <option name="vendor" value="vendor" selected={policyType === "vendor"}>Vendor</option>
                                    <option name="user" value="user" selected={policyType === "user"} >User</option>
                                    <option name="driver" value="driver" selected={policyType === "driver"}  >Driver</option>
                                </select>
                            </div>
                            <div className='terms2'>
                                <textarea name="" id="" cols="95" rows="10" placeholder='Enter Privacy Policy' value={privacy} onChange={(e) => setPrivacy(e.target.value)} ></textarea>
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/privacypolicy')}>Cancel</button>
                            <button onClick={handleUpdate}>Update</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(UpdatePrivacypolicy)