import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import './LocatiolnType.css'
import HOC from '../../Components/HOC/HOC';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';





// import img from '../../Images/img5.png'


const UpdateCity = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [stateCodes, setStateCodes] = useState([]);
    const [statecode, setStateCode] = useState('');
    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('IN');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [limit, setLimit] = useState('');



    useEffect(() => {
        const fetchCityDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/City/${id}`, getAuthHeaders());
                const { countryCode, city, stateCode, latitude, longitude, limit } = response.data.data;
                statecode(stateCode);
                setCity(city);
                setCountryCode(countryCode);
                setLatitude(latitude);
                setLongitude(longitude);
                setLimit(limit);
            } catch (error) {
                console.error('Error fetching City details:', error);
            }
        };
        fetchCityDetails();
    }, [id]);



    const handleUpdate = async () => {
        const data = {
            city: city,
            stateCode: statecode,
            latitude: latitude,
            longitude: longitude,
            limit: limit,
            countryCode: countryCode
        }


        try {
            const response = await axios.put(`${BaseUrl}api/v1/City/${id}`, data, getAuthHeaders());
            toast.success("City Updated successfully");
            navigate('/allcity');
        } catch (error) {
            console.error('Error updating City:', error);
            toast.error("Error to updating  City");
        }
    };

    const fetchStateCodes = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/State`, getAuthHeaders());
            setStateCodes(response.data.data);

        } catch (error) {
            console.error('Error fetching statecodes:', error);
        }
    };
    useEffect(() => {
        fetchStateCodes();
    }, []);
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update City</h6>
                        </div>

                        <div className='rider4'>

                        </div>
                    </div>


                    <div className='dailyprice'>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">City</label>
                                <input type="text" placeholder='Enter City Name' value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className='dailyprice2'>
                                <label htmlFor="">StateCodes</label>
                                <select value={statecode} onChange={(e) => setStateCode(e.target.value)}>
                                    <option value="">Select StateCodes</option>
                                    {stateCodes?.map(statecode => (
                                        <option key={statecode._id} value={statecode.isoCode}>{statecode.isoCode}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Latitude</label>
                                <input type="number" placeholder='Enter latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Longitude</label>
                                <input type="text" placeholder='Enter Longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Limit</label>
                                <input type="number" placeholder='Enter limit' value={limit} onChange={(e) => setLimit(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allcity')}>Cancel</button>
                            <button onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdateCity)