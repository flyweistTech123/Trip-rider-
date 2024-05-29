import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const Addoutstationpricing = () => {

    const [vehicles, setVehicles] = useState([]);
    const [citys, setCitys] = useState([]);
    const [vehicle, setVehicle] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('')
    const [kmlimit, setKmLimit] = useState('');
    const [kmprice, setKmPrice] = useState('')
    const [hrlimit, setHrLimit] = useState('');
    const [hrprice, setHrPrice] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();


    const handlePostRequest = async () => {
        const data = {
            city: city,
            vehicle: vehicle,
            type: type,
            kmLimit: kmlimit,
            kmPrice: kmprice,
            hrLimit: hrlimit,
            hrPrice: hrprice,
            price: price,
        }

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/OutStationPricing/add', data)
            toast.success("Outstation Pricing add successfully");
            navigate('/alloutstationpricing')
            setCity('');
            setVehicle('');
            setType('');
            setKmLimit('');
            setKmPrice('')
            setHrLimit('');
            setHrPrice('');
            setPrice('');

        } catch (error) {
            console.log('Error to add Outsation Pricing:', error)
            toast.error("Error to add Outstation Pricing")
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
                            <h6>Add Outstation Pricing</h6>
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
                                    <input type="radio" name="tripType" value="oneSide" onChange={(e) => setType(e.target.value)} />
                                    <p>One-way</p>
                                </div>
                                <div className='outstationprice3'>
                                    <input type="radio" name="tripType" value="bothSide" onChange={(e) => setType(e.target.value)} />
                                    <p>Round Trip</p>
                                </div>
                            </div>

                        </div>
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
                            <button onClick={handlePostRequest}>Add Price</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Addoutstationpricing)