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

const Termsandconditions = () => {
    const [termsData, setTermsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTermsData();
    }, []);

    const fetchTermsData = () => {
        axios
            .get('https://rajiv-cab-mu.vercel.app/api/v1/terms')
            .then(response => {
                setTermsData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Terms and Conditions data:', error);
            });
    };

    const deleteTerms = termsId => {
        axios
            .delete(`https://rajiv-cab-mu.vercel.app/api/v1/terms/${termsId}`)
            .then(response => {
                toast.success('Terms and Conditions deleted successfully');
                fetchTermsData();
            })
            .catch(error => {
                console.error('Error deleting Terms and Conditions:', error);
                toast.error('Error deleting Terms and Conditions');
            });
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Terms and Conditions</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/addtermsandconditions')}>
                                Add <FaPlusSquare />
                            </button>
                        </div>
                    </div>
                    <div className='terms'>
                        <div className='terms1'>
                            <h1>Terms and Conditions</h1>
                        </div>
                        {termsData.map(terms => (
                            <div className='terms4'>
                                <div className='terms2'>
                                    <div className='terms3'>
                                        <h5>#This is For {terms.type}</h5>
                                        <div className='rider4'>
                                            <button onClick={() => navigate(`/updatetermsandconditions/${terms.type}`)}>Update <MdModeEditOutline /></button>
                                            <button onClick={() => deleteTerms(terms._id)}>Delete <MdDelete /></button>
                                        </div>
                                    </div>
                                    <p>{terms.terms}</p>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(Termsandconditions);
