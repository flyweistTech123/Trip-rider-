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


const AddDailyPricing = () => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState('');
    const [city1, setCity1] = useState('');
    const [form, setForm] = useState('');
    const [to, setTo] = useState('');
    const [price, setPrice] = useState('');


    const handlePostRequest = async () => {
        const data={
            city:city1,
            vehicle:vehicle,
            fromKm:form,
            toKm:to,
            price:price
        }
        

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/Pricing', data);
            
            toast.success("Daily Pricing add successfully");

            // Reset state variables to clear input fields
            setVehicle('');
            setForm('');
            setTo('');
            setCity1('');
            setPrice(null);
            navigate('/alldailypricing')
        } catch (error) {
            console.error('Error to Add Daily Pricing:', error);
            toast.error("Error to Add Daily Pricing");
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
                            <h6>Add Daily Pricing</h6>
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
                                <label htmlFor="">From</label>
                                <input type="number" placeholder='Enter pickup location'  value={form} onChange={(e) => setForm(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">To</label>
                                <input type="number" placeholder='Enter drop location' value={to} onChange={(e) => setTo(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price</label>
                                <input type="number" placeholder='Enter Daily Price'value={price} onChange={(e) => setPrice(e.target.value)}  />
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/alldailypricing')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add Price</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddDailyPricing)