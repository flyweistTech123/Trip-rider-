import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Termsandconditions.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { MdModeEditOutline } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


import { useNavigate } from 'react-router-dom';


// import img from '../../Images/img5.png'


const AddTermsandconditions = () => {
    const [terms, setTerms] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate()



    const handlePostRequest = async () => {
        const data = {
            terms: terms,
            type: type
        }


        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/terms', data);
            const message = response.data.message;
            toast.success(message);
            // toast.success("Terms and Conditions add successfully");

            // Reset state variables to clear input fields
            setTerms('')
            setType('')
            navigate('/termsandconditions')
        } catch (error) {
            console.error('Error Adding Terms and Conditions:', error);
            toast.error("Error to add Terms and Conditions");
        }
    }


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Terms and Conditions</h6>
                        </div>
                    </div>
                    <div className='terms'>
                        <div className='terms1'>
                            <h1>Add Terms and Conditions</h1>
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
                                <textarea name="" id="" cols="95" rows="10" placeholder='Enter Terms and Conditions' value={terms} onChange={(e) => setTerms(e.target.value)} ></textarea>
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/termsandconditions')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HOC(AddTermsandconditions)