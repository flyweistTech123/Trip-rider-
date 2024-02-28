import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import HOC from '../../../Components/HOC/HOC';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const UpdateDailypricing = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [city, setCity] = useState([]);
    const [cityId, setCityId] = useState('');
    const [cityName, setCityName] = useState('');
    const [form, setForm] = useState('');
    const [to, setTo] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/Pricing/${id}`);
                const { vehicle, city, fromKm, toKm, price } = response.data.data;
                setVehicleId(vehicle._id); // Set the vehicle ID
                setVehicleName(vehicle.name); // Set the vehicle name
                setCityId(city._id); // Set the city ID
                setCityName(city.city); // Set the city name
                setForm(fromKm);
                setTo(toKm);
                setPrice(price);
            } catch (error) {
                console.error('Error fetching Daily Pricing details:', error);
            }
        };
        fetchPriceDetails();
    }, [id]);

    const handleUpdate = async () => {
        const data={
            city:cityId, // Sending city ID
            vehicle:vehicleId, // Sending vehicle ID
            fromKm:form,
            toKm:to,
            price:price
        }
        

        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/Pricing/${id}`, data);
            console.log('Response:', response.data);
            toast.success("Daily Pricing Updated successfully");
            navigate('/alldailypricing');
        } catch (error) {
            console.error('Error updating Daily Pricing:', error);
            toast.error("Error to updating  Daily Pricing");
        }
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/vehicle`);
                setVehicles(response.data.data);
                console.log(response.data.data, "vechcal print")
                
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
                            <h6>Update Daily Pricing</h6>
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
                                <label htmlFor="">From</label>
                                <input type="number" placeholder='Enter pickup location' value={form} onChange={(e) => setForm(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">To</label>
                                <input type="number" placeholder='Enter drop location' value={to} onChange={(e) => setTo(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price</label>
                                <input type="number" placeholder='Enter Daily Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/alldailypricing')}>Cancel</button>
                            <button onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HOC(UpdateDailypricing);
