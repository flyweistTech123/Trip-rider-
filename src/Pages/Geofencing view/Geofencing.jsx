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





const Geofencing = () => {




    const containerStyle = {
        width: '1000px',
        height: '500px'
    };
    const center = {
        lat: 27.17667,
        lng: 78.008072
    };

    function MyComponent() {
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: "AIzaSyB44XbRmsr64bo44DZvkwudZ9gF4aRqum8"
        })

        const [map, setMap] = React.useState(null)

        const onLoad = React.useCallback(function callback(map) {
            // This is just an example of getting and using the map instance!!! don't just blindly copy!
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);

            setMap(map)
        }, [])

        const onUnmount = React.useCallback(function callback(map) {
            setMap(null)
        }, [])

        return isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker position={center} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />
            </GoogleMap>
        ) : <></>
    }




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
                        <MyComponent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Geofencing)