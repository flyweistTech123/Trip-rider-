import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Privacypolicy.css';
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC';
import { MdModeEditOutline } from 'react-icons/md';
import { FaPlusSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

const DriverRefundpolicy = () => {
    const [refundPlicyData, setRefundPolicyData] = useState([]);
    const [refundType, setRefundType] = useState('driver');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRefundPolicyData();
    }, []);

    const fetchRefundPolicyData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BaseUrl}api/v1/refundPolicy/driver`, getAuthHeaders());
            const data = response.data.data || [];
            setRefundPolicyData(data);
        } catch (error) {
            console.error('Error fetching refund policy data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteRefundPolicy = async (refundId) => {
        setLoading(true); // Set loading to true before starting the deletion
        try {
            await axios.delete(`${BaseUrl}api/v1/terms/${refundId}`, getAuthHeaders());
            toast.success('Refund policy deleted successfully');
            fetchRefundPolicyData(); 
            setRefundPolicyData('')
        } catch (error) {
            console.error('Error deleting refund policy:', error);
            toast.error("Failed to delete refund policy. Please try again later.");
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
                            <h6>Driver Refund policy</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/refundPolicy')}>
                                Back
                            </button>
                            <button onClick={() => navigate(`/addrefundpolicy/${refundType}`)}>
                                Add <FaPlusSquare />
                            </button>
                        </div>
                    </div>
                    <div className='terms'>
                        {loading ? (
                            <tr>
                                <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Refund policy...</td>
                            </tr>
                        ) : refundPlicyData.length === 0 ? (
                            <div className='terms1'>
                                <p>No Refund policy available. Press 'Add' to add new Refund policy.</p>
                            </div>
                        ) : (

                            refundPlicyData?.map(refund => (
                                <div key={refund._id}>
                                    <div className='rider4'>
                                        <button onClick={() => navigate(`/updateRefundpolicy/${refund._id}`)}>
                                            Update <MdModeEditOutline />
                                        </button>
                                        <button onClick={() => deleteRefundPolicy(refund._id)}>
                                            Delete <MdDelete />
                                        </button>
                                    </div>
                                    <div className='terms1'>
                                        <p>{refund?.terms}</p>
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

export default HOC(DriverRefundpolicy);
