import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Privacypolicy.css';
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC';
import { MdModeEditOutline } from 'react-icons/md';
import { FaPlusSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

const UserPrivacypolicy = () => {
    const [privacyData, setPrivacyData] = useState([]);
    const [privacyType, setPrivacyType] = useState('user');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    const fetchPrivacyData = () => {
        axios
            .get(`${BaseUrl}api/v1/privacy/type/user`, getAuthHeaders())
            .then(response => {
                const data = response.data.data || [];
                setPrivacyData(data);
            })
            .catch(error => {
                console.error('Error fetching Privacy Policy data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deletePrivacy = (privacyId) => {
        axios.delete(`${BaseUrl}api/v1/terms/${privacyId}`, getAuthHeaders())
            .then(response => {
                toast.success('Privacy Policy deleted successfully');
                fetchPrivacyData();
            })
            .catch(error => {
                console.error('Error deleting Privacy Policy:', error);
                toast.error("Failed to delete Privacy Policy. Please try again later.");
            });
    };

    useEffect(() => {
        fetchPrivacyData();
    }, []);

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>User Privacy Policy</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/privacypolicy')}>
                                Back
                            </button>
                            <button onClick={() => navigate(`/addprivacypolicy/${privacyType}`)}>
                                Add <FaPlusSquare />
                            </button>
                        </div>
                    </div>
                    <div className='terms'>
                        {loading ? (
                            <tr>
                                <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Privacy Policy...</td>
                            </tr>
                        ) : privacyData.length === 0 ? (
                            <div className='terms1'>
                                <p>No Privacy policy available. Press 'Add' to add new  Privacy Policy.</p>
                            </div>
                        ) : (

                            privacyData?.map(privacy => (
                                <>
                                    <div className='rider4'>
                                        <button onClick={() => navigate(`/updateprivacypolicy/${privacy._id}`)}>
                                            Update <MdModeEditOutline />
                                        </button>
                                        <button onClick={() => deletePrivacy(privacy._id)}>
                                            Delete <MdDelete />
                                        </button>
                                    </div>
                                    <div className='terms1'>
                                        <p>{privacy?.privacy}</p>
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

export default HOC(UserPrivacypolicy);
