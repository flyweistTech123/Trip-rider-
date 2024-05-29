import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';




// import img from '../../Images/img5.png'


const UpdateBasepricing = () => {
    const { id } = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [city, setCity] = useState([]);
    const [cityId, setCityId] = useState('');
    const [cityName, setCityName] = useState('');
    const [baseprice, setBasePrice] = useState('');
    const [pricePerMin, setPricePerMin] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/BasePricing/${id}`, getAuthHeaders());
                const { city, vehicle, pricePerMin, price } = response.data.data;
                setVehicleId(vehicle._id);
                setVehicleName(vehicle.name);
                setCityId(city._id);
                setCityName(city.city);
                setBasePrice(price);
                setPricePerMin(pricePerMin);

            } catch (error) {
                console.error('Error fetching Base Pricing details:', error);
            }
        };
        fetchPriceDetails();
    }, [id]);
    const handlePutRequest = async () => {
        const data = {
            city: cityId,
            vehicle: vehicleId,
            pricePerMin: pricePerMin,
            price: baseprice,
        }

        try {
            const response = await axios.put(`${BaseUrl}api/v1/BasePricing/update/${id}`, data, getAuthHeaders())
            toast.success("Base Pricing Updated successfully");
            navigate('/allbasepricing')
        } catch (error) {
            console.log('Error to updating Base Pricing:', error)
            toast.error("Error to updating Base Pricing")
        }
    }
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/vehicle`, getAuthHeaders());
                setVehicles(response.data.data);

            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);


    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/City`, getAuthHeaders());
                setCity(response.data.data);
            } catch (error) {
                console.error('Error fetching City:', error);
            }
        };

        fetchCity();
    }, []);

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Base Pricing</h6>
                        </div>

                        <div className='rider4'>
                            {/* <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
                            </div> */}
                        </div>
                    </div>


                    <div className='dailyprice'>
                        <div className='dailyprice1'>
                            <div className='dailyprice2'>
                                <label htmlFor="">Vehicle</label>
                                <select value={vehicleName} onChange={(e) => {
                                    const selectedVehicle = vehicles.find(vehicle => vehicle.name === e.target.value);
                                    setVehicleId(selectedVehicle._id);
                                    setVehicleName(e.target.value);
                                }}>
                                    <option>Select Vehicle</option>
                                    {vehicles?.map(vehicle => (
                                        <option key={vehicle._id} value={vehicle.name}>{vehicle.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='dailyprice2'>
                                <label htmlFor="">City</label>
                                <select value={cityName} onChange={(e) => {
                                    const selectedCity = city.find(city => city.city === e.target.value);
                                    setCityId(selectedCity._id);
                                    setCityName(e.target.value);
                                }}>
                                    <option>Select City</option>
                                    {city?.map(City => (
                                        <option key={City._id} value={City.city}>{City.city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Base Price</label>
                                <input type="number" placeholder='Enter Base price' value={baseprice} onChange={(e) => setBasePrice(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Minutes</label>
                                <input type="number" placeholder='Enter price Per Minutes' value={pricePerMin} onChange={(e) => setPricePerMin(e.target.value)} />
                            </div>
                        </div>




                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allbasepricing')}>Cancel</button>
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdateBasepricing)