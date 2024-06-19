import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const Updateoutstationpricing = () => {
    const { id } = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [citys, setCitys] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [cityId, setCityId] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('')
    const [kmlimit, setKmLimit] = useState('');
    const [kmprice, setKmPrice] = useState('')
    const [hrlimit, setHrLimit] = useState('');
    const [hrprice, setHrPrice] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/OutStationPricing/${id}`);
                const { vehicle, city, type, price, kmLimit, kmPrice, hrPrice, hrLimit } = response.data.data;
                setVehicleId(vehicle._id);
                setVehicle(vehicle.name);
                setCityId(city._id);
                setCity(city.city);
                setType(type);
                setPrice(price);
                setKmLimit(kmLimit);
                setKmPrice(kmPrice);
                setHrLimit(hrLimit);
                setHrPrice(hrPrice);
            } catch (error) {
                console.error('Error fetching Outstation Pricing details:', error);
            }
        };
        fetchPriceDetails();
    }, [id]);
    const handlePutRequest = async () => {
        const data = {
            city: cityId,
            vehicle: vehicleId,
            type: type,
            kmLimit: kmlimit,
            kmPrice: kmprice,
            hrLimit: hrlimit,
            hrPrice: hrprice,
            price: price,
        }

        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/OutStationPricing/update/${id}`, data)
            toast.success("Outstation Pricing Updated successfully");
            navigate('/alloutstationpricing')
        } catch (error) {
            console.log('Error to updating Outstation Pricing:', error)
            toast.error("Error to updating Outstation Pricing")
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
    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/City`);
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
                            <h6>Update Outstation Pricing</h6>
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
                        <div className='outstationprice1'>
                            <p>Trip Type:</p>
                            <div className='outstationprice2'>
                                <div className='outstationprice3'>
                                    <input type="radio" name="tripType" value="oneSide" checked={type === "oneSide"} onChange={(e) => setType(e.target.value)} />
                                    <p>One-way</p>
                                </div>
                                <div className='outstationprice3'>
                                    <input type="radio" name="tripType" value="bothSide" checked={type === "bothSide"} onChange={(e) => setType(e.target.value)} />
                                    <p>Round Trip</p>
                                </div>
                            </div>

                        </div>
                        <div className='dailyprice1'>
                            <div className='dailyprice2'>
                                <label htmlFor="">Vehicle</label>
                                <select value={vehicle} onChange={(e) => {
                                    const selectedVehicle = vehicles.find(vehicle => vehicle.name === e.target.value);
                                    setVehicleId(selectedVehicle._id);
                                    setVehicle(e.target.value);
                                }}>
                                    <option>Select Vehicle</option>
                                    {vehicles?.map(vehicle => (
                                        <option key={vehicle._id} value={vehicle.name}>{vehicle.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='dailyprice2'>
                                <label htmlFor="">City</label>
                                <select value={city} onChange={(e) => {
                                    const selectedCity = citys.find(city => city.city === e.target.value);
                                    setCityId(selectedCity._id);
                                    setCity(e.target.value);
                                }}>
                                    <option>Select City</option>
                                    {citys?.map(City => (
                                        <option key={City._id} value={City.city}>{City.city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Km Limit</label>
                                <input type="number" placeholder='Enter Km limit' value={kmlimit} onChange={(e) => setKmLimit(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Km Price</label>
                                <input type="number" placeholder='Enter Km Price' value={kmprice} onChange={(e) => setKmPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Hours Limit</label>
                                <input type="number" placeholder='Enter hours limit' value={hrlimit} onChange={(e) => setHrLimit(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Hours Price</label>
                                <input type="number" placeholder='Enter hours Price' value={hrprice} onChange={(e) => setHrPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">price</label>
                                <input type="number" placeholder='Enter Outstation price' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/alloutstationpricing')}>Cancel</button>
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Updateoutstationpricing)