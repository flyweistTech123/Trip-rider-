import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Termsandconditions.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';




import { useNavigate, useParams } from 'react-router-dom';


// import img from '../../Images/img5.png'


const UpdateAgreement = () => {
    const { id } = useParams();
    const [agreement, setAgreement] = useState('');
    const [type, setType] = useState('user');
    const navigate = useNavigate()

    const fetchAgreementDetails = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/terms/byId/${id}`, getAuthHeaders())
            const { terms, type, } = response.data.data;
            setAgreement(terms);
            setType(type);
        } catch (error) {
            console.error('Error fetching Agreement details:', error);
        }
    };

    useEffect(() => {
        fetchAgreementDetails();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            agreement: agreement,
            type: type,
        }


        try {
            const response = await axios.put(`${BaseUrl}api/v1/terms/${id}`, data, getAuthHeaders());
            toast.success("Agreement Updated successfully");
            if (type === 'user') {
                navigate('/useragreement')
            } else if (type === 'driver') {
                navigate('/driveragreement')
            } else {
                navigate('/vendoragreement')
            }
        } catch (error) {
            console.error('Error updating Agreement:', error);
            toast.error("Failed to update Agreement. Please try again later.");
        }
    };


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Agreements</h6>
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
                                <label htmlFor="">Agreement</label>
                                <textarea name="" id="" rows="10" placeholder='Enter Terms and Conditions' value={agreement} onChange={(e) => setAgreement(e.target.value)} ></textarea>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(UpdateAgreement)