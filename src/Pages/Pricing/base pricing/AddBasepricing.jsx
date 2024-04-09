import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';




// import img from '../../Images/img5.png'


const AddBasepricing = () => {
    const [baseprice, setBasePrice] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState('')
    const [citys, setCitys] = useState([]);
    const [city, setCity] = useState('');
    const [pricePerMin, setPricePerMin] = useState('');
    const navigate = useNavigate();


    const handlePostRequest = async () => {
        const data = {
            city: city,
            vehicle: vehicle,
            pricePerMin: pricePerMin,
            price: baseprice,
        }

        try {
            const response = await axios.post(`${BaseUrl}api/v1/BasePricing/add`, data, getAuthHeaders())
            toast.success("Base Pricing add successfully");
            navigate('/allbasepricing')
            setBasePrice('');
            setVehicle('');
            setCity('');
            setPricePerMin('');

        } catch (error) {
            console.log('Error to add Base Pricing:', error)
            toast.error("Error to add Base Pricing")
        }
    }

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/vehicle`, getAuthHeaders());
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
                const response = await axios.get(`${BaseUrl}api/v1/City`, getAuthHeaders());
                setCitys(response.data.data);
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
                            <h6>Add Base Pricing</h6>
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
                                <select onChange={(e) => setCity(e.target.value)}>
                                    <option value="">Select City</option>
                                    {citys?.map(City => (
                                        <option key={City.id} value={City._id}>{City.city}</option>
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
                            <button onClick={handlePostRequest}>Add Price</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddBasepricing)