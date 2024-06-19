import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Termsandconditions.css'
import HOC from '../../Components/HOC/HOC'




import { useNavigate, useParams } from 'react-router-dom';


// import img from '../../Images/img5.png'


const UpdateTermsandconditions = () => {
    const { id } = useParams();
    const [term, setTerms] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTermsDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/terms/${id}`);
                const { terms, type } = response.data.data;
                setTerms(terms);
                setType(type);
            } catch (error) {
                console.error('Error fetching Terms and Conditions details:', error);
            }
        };
        fetchTermsDetails();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            terms: term,
            type: type,
        }


        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/terms/${id}`, data);
            toast.success("Terms and Conditions Updated successfully");
            navigate('/termsandconditions');
        } catch (error) {
            console.error('Error updating Terms and Conditions:', error);
            toast.error("Error updating Terms and Conditions");
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
                    </div>
                    <div className='terms'>
                        <div className='terms1'>
                            <h1>Update Terms and Conditions</h1>
                        </div>
                        <div className='terms5'>
                            <div className='service1'>
                                <label htmlFor="">Type</label>
                                <select onChange={(e) => setType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    <option name="vendor" value="vendor" selected={type === "vendor"}>Vendor</option>
                                    <option name="user" value="user" selected={type === "user"} >User</option>
                                    <option name="driver" value="driver" selected={type === "driver"}  >Driver</option>
                                </select>
                            </div>
                            <div className='terms2'>
                                <textarea name="" id="" cols="95" rows="10" placeholder='Enter Terms and Conditions' value={term} onChange={(e) => setTerms(e.target.value)} ></textarea>
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/termsandconditions')}>Cancel</button>
                            <button onClick={handleUpdate}>Update</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(UpdateTermsandconditions)