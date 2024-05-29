import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





// import img from '../../Images/img5.png'


const AddHourlyPricing = () => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState('');
    const [city1, setCity1] = useState('');
    const [distance, setDistance] = useState('');
    const [hours, setHours] = useState('');
    const [pricePerMin, setPricePerMin] = useState('');
    const [pricePerkm, setPricePerkm] = useState('');
    const [pricePerKmGreater, setPricePerKmGreater] = useState('');
    const [pricePerMinGreater, setPricePerMinGreater] = useState('');


    const handlePostRequest = async () => {
        const data={
            city:city1,
            vehicle:vehicle,
            km:distance,
            hours:hours,
            pricePerMin:pricePerMin,
            pricePerkm:pricePerkm,
            pricePerKmGreater:pricePerKmGreater,
            pricePerMinGreater:pricePerMinGreater,
        }
        

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/AddHourlyPricing', data);
            
            toast.success("Hourly Pricing add successfully");

            // Reset state variables to clear input fields
            setVehicle('');
            setDistance('');
            setHours('');
            setCity1('');
            setPricePerMin(null);
            setPricePerkm(null);
            setPricePerKmGreater(null);
            setPricePerMinGreater(null);
            navigate('/allhourlypricing')
        } catch (error) {
            console.error('Error Adding Price:', error);
            toast.error("Error to add Hourly Pricing");
        }
    }


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

    const [city, setCity] = useState([]);

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
    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Hourly Price</h6>
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
                                <select onChange={(e) => setVehicle(e.target.value)}>
                                    <option value="">Select Vehicle</option>
                                    {vehicles?.map(vehicle => (
                                        <option key={vehicle._id} value={vehicle._id}>{vehicle.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className='dailyprice2'>
                                <label htmlFor="">City</label>
                                <select onChange={(e) => setCity1(e.target.value)}>
                                    <option value="">Select City</option>
                                    {city?.map(City => (
                                        <option key={City.id} value={City._id}>{City.city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Distance</label>
                                <input type="number" placeholder='Enter Distance'  value={distance} onChange={(e) => setDistance(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Hours</label>
                                <input type="number" placeholder='Enter Hours' value={hours} onChange={(e) => setHours(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Minutes</label>
                                <input type="number" placeholder='Enter Price'value={pricePerMin} onChange={(e) => setPricePerMin(e.target.value)}  />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Km</label>
                                <input type="number" placeholder='Enter  Price'value={pricePerkm} onChange={(e) => setPricePerkm(e.target.value)}  />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Min Greater</label>
                                <input type="number" placeholder='Enter Price'value={pricePerMinGreater} onChange={(e) => setPricePerMinGreater(e.target.value)}  />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price Per Km Greater</label>
                                <input type="number" placeholder='Enter  Price'value={pricePerKmGreater} onChange={(e) => setPricePerKmGreater(e.target.value)}  />
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allhourlypricing')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add Price</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddHourlyPricing)