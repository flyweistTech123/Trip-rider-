import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LocatiolnType.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';



import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';



const AllState = () => {
    const navigate = useNavigate()
    const [stateData, setStateData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchStateData();
    }, []);

    const fetchStateData = () => {
        axios.get(`${BaseUrl}api/v1/State`, getAuthHeaders())
            .then(response => {
                setStateData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching State data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredStateData = stateData.filter(state =>
        state.state && state.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteState = (stateId) => {
        axios.delete(`${BaseUrl}api/v1/city/${stateId}`, getAuthHeaders())
            .then(response => {
                fetchStateData();
                toast.success("State deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting State:', error);
                toast.error("Error deleting State");
            });
    };




    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All State</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/alllocation')}>Back</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search State' onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>State</th>
                                    <th>CountryCode</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Loading states...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredStateData.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>State not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredStateData?.map(state => (
                                                <tr key={state.id}>
                                                    <td>{state?.state}</td>
                                                    <td>{state?.countryCode}</td>
                                                    <td>{state?.latitude}</td>
                                                    <td>{state?.longitude}</td>
                                                    <td style={{
                                                        color:
                                                            state?.status === 'ACTIVE' ? '#609527' :
                                                                '#000'
                                                    }}>
                                                        {state?.status}
                                                    </td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => deleteState(state._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            stateData?.map(state => (
                                                <tr key={state.id}>
                                                    <td>{state?.state}</td>
                                                    <td>{state?.countryCode}</td>
                                                    <td>{state?.latitude}</td>
                                                    <td>{state?.longitude}</td>
                                                    <td style={{
                                                        color:
                                                            state?.status === 'ACTIVE' ? '#609527' :
                                                                '#000'
                                                    }}>
                                                        {state?.status}
                                                    </td>
                                                </tr>
                                            ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllState)