import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
    width: '1000px',
    height: '253px'
};



function MyComponent({ pickupLatitude, pickupLongitude, dropLatitude, dropLongitude }) {
    const pickupPosition = { lat: parseFloat(pickupLatitude), lng: parseFloat(pickupLongitude) };
    const dropPosition = { lat: parseFloat(dropLatitude), lng: parseFloat(dropLongitude) };

    const distanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);  // deg2rad below
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1) * (Math.PI / 180)) * Math.cos((lat2) * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance.toFixed(2); // Return distance with two decimal places
    };

    const distance = distanceBetweenPoints(
        parseFloat(pickupLatitude),
        parseFloat(pickupLongitude),
        parseFloat(dropLatitude),
        parseFloat(dropLongitude)
    );

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB44XbRmsr64bo44DZvkwudZ9gF4aRqum8"
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={pickupPosition}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={pickupPosition} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />
            <Marker position={dropPosition} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} />
            <Polyline path={[pickupPosition, dropPosition]} options={{ strokeColor: '#FF0000' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
                Distance: {distance} km
            </div>
        </GoogleMap>
    ) : <></>;
}

export default React.memo(MyComponent);