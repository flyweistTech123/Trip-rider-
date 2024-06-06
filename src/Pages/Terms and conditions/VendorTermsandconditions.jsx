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

const VendorTermsandconditions = () => {
    const [termsData, setTermsData] = useState([]);
    const [termsType, setTermsType] = useState('vendor');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    const fetchTermsData = () => {
        axios
            .get(`${BaseUrl}api/v1/terms/vendor`, getAuthHeaders())
            .then(response => {
                const data = response.data.data || [];
                setTermsData(data);
            })
            .catch(error => {
                console.error('Error fetching Terms and Conditions data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteTerms = (termsId) => {
        axios.delete(`${BaseUrl}api/v1/terms/${termsId}`, getAuthHeaders())
            .then(response => {
                toast.success('Terms and Conditions deleted successfully');
                fetchTermsData();
            })
            .catch(error => {
                console.error('Error deleting Terms and Conditions:', error);
                toast.error("Failed to delete Terms and Conditions. Please try again later.");
            });
    };

    useEffect(() => {
        fetchTermsData();
    }, []);

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Vendor Terms and Conditions</h6>
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
                                <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading terms and conditions...</td>
                            </tr>
                        ) : termsData.length === 0 ? (
                            <div className='terms1'>
                                <p>No terms and conditions available. Press 'Add' to add new terms and conditions.</p>
                            </div>
                        ) : (

                            termsData?.map(terms => (
                                <>
                                    <div className='rider4'>
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
                                </>
                            ))

                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(VendorTermsandconditions);
