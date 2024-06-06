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

const VendorAgreement = () => {
    const [agreementData, setAgreementData] = useState([]);
    const [agreementType, setAgreementType] = useState('vendor');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    const fetchAgreementData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BaseUrl}api/v1/agreement/vendor`, getAuthHeaders());
            const data = response.data.data || [];
            setAgreementData(data);
        } catch (error) {
            console.error('Error fetching Agreement data:', error);
        } finally {
            setLoading(false);
        }
    };


    const deleteAgreement = async (agreementId) => {
        setLoading(true); // Set loading to true before starting the deletion
        try {
            await axios.delete(`${BaseUrl}api/v1/terms/${agreementId}`, getAuthHeaders());
            toast.success('Agreement deleted successfully');
            fetchAgreementData();
            setAgreementData('')
        } catch (error) {
            console.error('Error deleting Agreement:', error);
            toast.error("Failed to delete Agreement. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false after the deletion process
        }
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
                            <h6>Vendor Agreement</h6>
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
                                <p>No Agreement available. Press 'Add' to add new Agreement.</p>
                            </div>
                        ) : (

                            agreementData?.map(agreement => (
                                <div key={agreement._id}>
                                    <div className='rider4'>
                                        <button onClick={() => navigate(`/updateagreement/${agreement._id}`)}>
                                            Update <MdModeEditOutline />
                                        </button>
                                        <button onClick={() => deleteAgreement(agreement._id)}>
                                            Delete <MdDelete />
                                        </button>
                                    </div>
                                    <div className='terms1'>
                                        <p>{agreement?.terms}</p>
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

export default HOC(VendorAgreement);
