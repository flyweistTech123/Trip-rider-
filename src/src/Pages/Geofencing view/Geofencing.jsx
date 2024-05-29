import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Geofencing.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import MapTwogeo from '../../Components/Map/MapTwogeo';





const Geofencing = () => {

    const [locationdata, setLoctionData] = useState([]);

    const fetchLocationData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/driver`, getAuthHeaders());
            const locations = response.data.category.map(item => ({
                latitude: item.location.coordinates[0], 
                longitude: item.location.coordinates[1]
            }));
            setLoctionData(locations);
        } catch (error) {
            console.error('Error fetching Location data:', error);
        }
    };


    useEffect(() => {
        fetchLocationData();
    }, []);






    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Eagle’s Eye</h6>
                        </div>
                    </div>
                    <div className='geo1'>
                        <MapTwogeo locations={locationdata} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Geofencing)