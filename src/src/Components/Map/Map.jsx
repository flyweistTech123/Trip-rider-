import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '500px',
    height: '500px'
};




function MapComponent({ latitude, longitude }) {

    console.log('Latitude:', typeof latitude);
    console.log('Longitude:', typeof longitude);

    const lati = +latitude;
    const lngi = +longitude;

    console.log('lati:', typeof lati);
    console.log('lngi:', typeof lngi);
    
    console.log('lati:',  lati);
    console.log('lngi:',  lngi);
    const center = {
        lat: lati,
        lng: lngi
    };
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

export default React.memo(MapComponent)