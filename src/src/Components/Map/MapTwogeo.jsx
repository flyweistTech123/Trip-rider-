import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '1000px',
    height: '669px'
};

const MapTwogeo = ({ locations }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB44XbRmsr64bo44DZvkwudZ9gF4aRqum8"
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 0, lng: 0 }} 
            zoom={3} 
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {locations.map((location, index) => (
                <Marker key={index} position={{ lat: location.latitude, lng: location.longitude }} />
            ))}
        </GoogleMap>
    ) : <></>;
}

export default MapTwogeo;
