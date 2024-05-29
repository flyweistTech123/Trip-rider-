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

const Privacypolicy = () => {
    const [privacyData, setPrivacyData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPrivacyData();
    }, []);

    const fetchPrivacyData = () => {
        axios
            .get('https://rajiv-cab-mu.vercel.app/api/v1/privacy')
            .then(response => {
                setPrivacyData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Privacy Policy data:', error);
            });
    };

    const deletePrivacy = privacyId => {
        axios
            .delete(`https://rajiv-cab-mu.vercel.app/api/v1/privacy/${privacyId}`)
            .then(response => {
                toast.success('Privacy Policy deleted successfully');
                fetchPrivacyData();
            })
            .catch(error => {
                console.error('Error deleting Privacy Policy:', error);
                toast.error('Error deleting Privacy Policy');
            });
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Privacy Policy</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/addprivacypolicy')}>
                                Add <FaPlusSquare />
                            </button>
                        </div>
                    </div>
                    <div className='terms'>
                        <div className='terms1'>
                            <h1>Privacy Policy</h1>
                        </div>
                        {privacyData.map(privacy => (
                            <div className='terms4'>
                                <div className='terms2'>
                                    <div className='terms3'>
                                        <h5>#This is For {privacy.type}</h5>
                                        <div className='rider4'>
                                            <button onClick={() => navigate(`/updateprivacypolicy/${privacy.type}`)}>Update <MdModeEditOutline /></button>
                                            <button onClick={() => deletePrivacy(privacy._id)}>Delete <MdDelete /></button>
                                        </div>
                                    </div>
                                    <p>{privacy.privacy}</p>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(Privacypolicy);
