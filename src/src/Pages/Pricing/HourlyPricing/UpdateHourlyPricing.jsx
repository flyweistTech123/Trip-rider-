import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import HOC from '../../../Components/HOC/HOC';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const UpdateHourlyPricing = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [city, setCity] = useState([]);
    const [cityId, setCityId] = useState('');
    const [cityName, setCityName] = useState('');
    const [distance, setDistance] = useState('');
    const [hours, setHours] = useState('');
    const [pricePerMin, setPricePerMin] = useState('');
    const [pricePerkm, setPricePerkm] = useState('');
    const [pricePerKmGreater, setPricePerKmGreater] = useState('');
    const [pricePerMinGreater, setPricePerMinGreater] = useState('');
    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/getHourlyPricingById/${id}`);
                const { vehicle, city, km, hours, pricePerMin, pricePerkm, pricePerKmGreater, pricePerMinGreater } = response.data.data;
                setVehicleId(vehicle._id);
                setVehicleName(vehicle.name);
                setCityId(city._id);
                setCityName(city.city);
                setDistance(km);
                setHours(hours);
                setPricePerMin(pricePerMin);
                setPricePerkm(pricePerkm);
                setPricePerKmGreater(pricePerKmGreater);
                setPricePerMinGreater(pricePerMinGreater);
            } catch (error) {
                console.error('Error fetching Hourly Pricing details:', error);
            }
        };
        fetchPriceDetails();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            city: cityId,
            vehicle: vehicleId,
            km: distance,
            hours: hours,
            pricePerMin: pricePerMin,
            pricePerkm: pricePerkm,
            pricePerKmGreater: pricePerKmGreater,
            pricePerMinGreater: pricePerMinGreater,
        }


        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/updateHourlyPricing/${id}`, data);
            toast.success("Hourly Pricing Updated successfully");
            navigate('/allhourlypricing');
        } catch (error) {
            console.error('Error updating Hourly Pricing:', error);
            toast.error("Error updating Hourly Pricing");
        }
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/vehicle`);
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
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/City`);
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
                            <h6>Update Hourly Price</h6>
                        </div>
                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
                            </div>
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
                                <label htmlFor="">Distance</label>
                                <input type="number" placeholder='Enter Distance' value={distance} onChange={(e) => setDistance(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">hours</label>
                                <input type="number" placeholder='Enter Hours' value={hours} onChange={(e) => setHours(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Minutes</label>
                                <input type="number" placeholder='Enter Price' value={pricePerMin} onChange={(e) => setPricePerMin(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Km</label>
                                <input type="number" placeholder='Enter  Price' value={pricePerkm} onChange={(e) => setPricePerkm(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Min Greater</label>
                                <input type="number" placeholder='Enter Price' value={pricePerMinGreater} onChange={(e) => setPricePerMinGreater(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Km Greater</label>
                                <input type="number" placeholder='Enter  Price' value={pricePerKmGreater} onChange={(e) => setPricePerKmGreater(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allhourlypricing')}>Cancel</button>
                            <button onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HOC(UpdateHourlyPricing);
