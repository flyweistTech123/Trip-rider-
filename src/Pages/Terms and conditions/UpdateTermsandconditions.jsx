import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Termsandconditions.css'
import HOC from '../../Components/HOC/HOC'
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';




import { useNavigate, useParams } from 'react-router-dom';


// import img from '../../Images/img5.png'


const UpdateTermsandconditions = () => {
    const { id } = useParams();
    const [term, setTerms] = useState('');
    const [type, setType] = useState('user');
    const navigate = useNavigate()

    const fetchTermsDetails = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/terms/byId/${id}`, getAuthHeaders())
            const { terms, type, } = response.data.data;
            setTerms(terms);
            setType(type);
        } catch (error) {
            console.error('Error fetching Terms and Conditions details:', error);
        }
    };

    useEffect(() => {
        fetchTermsDetails();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            terms: term,
            type: type,
        }


        try {
            const response = await axios.put(`${BaseUrl}api/v1/terms/${id}`, data, getAuthHeaders());
            toast.success("Terms and Conditions Updated successfully");
            if (type === 'user') {
                navigate('/usertermsandconditions')
            } else if (type === 'driver') {
                navigate('/drivertermsandconditions')
            } else {
                navigate('/vendortermsandconditions')
            }
        } catch (error) {
            console.error('Error updating Terms and Conditions:', error);
            toast.error("Failed to update Terms and Conditions. Please try again later.");
        }
    };


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Terms and Conditions</h6>
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
                                <label htmlFor="">Terms and Conditions</label>
                                <textarea name="" id="" rows="10" placeholder='Enter Terms and Conditions' value={term} onChange={(e) => setTerms(e.target.value)} ></textarea>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(UpdateTermsandconditions)