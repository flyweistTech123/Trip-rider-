import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Termsandconditions.css';
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC';
import { MdModeEditOutline } from 'react-icons/md';
import { FaPlusSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

const DriverAgreement = () => {
    const [agreementData, setAgreement] = useState([]);
    const [agreementType, setAgreementType] = useState('driver');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    const fetchAgreementData = () => {
        axios
            .get(`${BaseUrl}api/v1/agreement/driver`, getAuthHeaders())
            .then(response => {
                const data = response.data.data || [];
                setAgreement(data);
            })
            .catch(error => {
                console.error('Error fetching Agreement data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteAgreement = (agreementId) => {
        axios.delete(`${BaseUrl}api/v1/terms/${agreementId}`, getAuthHeaders())
            .then(response => {
                toast.success('Agreement deleted successfully');
                fetchAgreementData();
            })
            .catch(error => {
                console.error('Error deleting Agreement:', error);
                toast.error("Failed to delete Agreement. Please try again later.");
            });
    };

    useEffect(() => {
        fetchAgreementData();
    }, []);

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Driver Agreement</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/agreement')}>
                                Back
                            </button>
                            <button onClick={() => navigate(`/addagreement/${agreementType}`)}>
                                Add <FaPlusSquare />
                            </button>
                        </div>
                    </div>
                    <div className='terms'>
                        {loading ? (
                            <tr>
                                <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Agreement...</td>
                            </tr>
                        ) : agreementData.length === 0 ? (
                            <div className='terms1'>
                                <p>No Agreement available. Press 'Add' to add new Agreements.</p>
                            </div>
                        ) : (

                            agreementData?.map(agreement => (
                                <>
                                    <div className='rider4'>
                                        <button onClick={() => navigate(`/updateagreement/${agreement._id}`)}>
                                            Update <MdModeEditOutline />
                                        </button>
                                        <button onClick={() => deleteAgreement(agreement._id)}>
                                            Delete <MdDelete />
                                        </button>
                                    </div>
                                    <div className='terms1'>
                                        <p>{agreement?.agreement}</p>
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

export default HOC(DriverAgreement);
