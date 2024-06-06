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

const VendorPrivacypolicy = () => {
    const [privacyData, setPrivacyData] = useState([]);
    const [privacyType, setPrivacyType] = useState('vendor');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();





    const fetchPrivacyData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BaseUrl}api/v1/privacy/type/vendor`, getAuthHeaders());
            const data = response.data.data || [];
            setPrivacyData(data);
        } catch (error) {
            console.error('Error fetching Privacy Policy data:', error);
        } finally {
            setLoading(false);
        }
    };


    const deletePrivacy = async (privacyId) => {
        setLoading(true); // Set loading to true before starting the deletion
        try {
            await axios.delete(`${BaseUrl}api/v1/privacy/${privacyId}`, getAuthHeaders());
            toast.success('Privacy Policy deleted successfully');
            fetchPrivacyData();
            setPrivacyData('')
        } catch (error) {
            console.error('Error deleting Privacy Policy:', error);
            toast.error("Failed to delete Privacy Policy. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false after the deletion process
        }
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
                            <h6>Vendor Privacy Policy</h6>
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
                                <p>No Privacy Policy available. Press 'Add' to add new Privacy Policy.</p>
                            </div>
                        ) : (

                            privacyData?.map(privacy => (
                                <div key={privacy._id}>
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
                                </div>
                            ))

                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(VendorPrivacypolicy);
