import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Termsandconditions.css';
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC';
import { MdModeEditOutline } from 'react-icons/md';
import { FaPlusSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

const UserTermsandconditions = () => {
    const [termsData, setTermsData] = useState([]);
    const [termsType, setTermsType] = useState('user');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTermsData();
    }, []);



    const fetchTermsData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BaseUrl}api/v1/terms/user`, getAuthHeaders());
            const data = response.data.data || [];
            setTermsData(data);
        } catch (error) {
            console.error('Error fetching Terms and Conditions data:', error);
        } finally {
            setLoading(false);
        }
    };


    const deleteTerms = async (termsId) => {
        setLoading(true); // Set loading to true before starting the deletion
        try {
            await axios.delete(`${BaseUrl}api/v1/terms/${termsId}`, getAuthHeaders());
            toast.success('Terms and Conditions deleted successfully');
            fetchTermsData(); 
            setTermsData('')
        } catch (error) {
              console.error('Error deleting Terms and Conditions:', error);
            toast.error("Failed to delete Terms and Conditions. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false after the deletion process
        }
    };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>User Terms and Conditions</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/termsandconditions')}>
                                Back
                            </button>
                            <button onClick={() => navigate(`/addtermsandconditions/${termsType}`)}>
                                Add <FaPlusSquare />
                            </button>
                        </div>
                    </div>
                    <div className='terms'>
                        {loading ? (
                            <tr>
                                <td colSpan="7" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Loading terms and conditions...</td>
                            </tr>
                        ) : termsData.length === 0 ? (
                            <div className='terms1'>
                                <p>No terms and conditions available. Press 'Add' to add new terms and conditions.</p>
                            </div>
                        ) : (

                            termsData?.map(terms => (
                                <div key={terms._id}>
                                    <div className='terms33'>
                                        <button onClick={() => navigate(`/updatetermsandconditions/${terms._id}`)}>
                                            Update <MdModeEditOutline />
                                        </button>
                                        <button onClick={() => deleteTerms(terms._id)}>
                                            Delete <MdDelete />
                                        </button>
                                    </div>
                                    <div className='terms1'>
                                        <p>{terms?.terms}</p>
                                    </div>
                                </div>
                            ))

                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(UserTermsandconditions);
