import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const UpdateBasepricing = () => {
    const { id } = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [citys, setCitys] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [cityId, setCityId] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [city, setCity] = useState('');
    const [taxrate, setTaxRate] = useState('')
    const [gstrate, setGstRate] = useState('');
    const [servicecharge, setServiceCharge] = useState('')
    const [nightcharge, setNightCharge] = useState('');
    const [waitingCharge, setWaitingCharge] = useState('');
    const [trafficcharge, setTrafficCharge] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/${id}`);
                const { vehicle, city, basePrice, taxRate, gstRate, serviceCharge, nightCharges, waitingCharge, trafficCharge } = response.data.data;
                setVehicleId(vehicle._id);
                setVehicle(vehicle.name);
                setCityId(city._id);
                setCity(city.city);
                setTaxRate(taxRate);
                setGstRate(gstRate);
                setServiceCharge(serviceCharge);
                setNightCharge(nightCharges);
                setWaitingCharge(waitingCharge);
                setTrafficCharge(trafficCharge);
                setPrice(basePrice)
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
            taxRate: taxrate,
            gstRate: gstrate,
            serviceCharge: servicecharge,
            nightCharges: nightcharge,
            waitingCharge: waitingCharge,
            trafficCharge: trafficcharge,
        }

        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/update/${id}`, data)
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
                                <label htmlFor="">Service Charge</label>
                                <input type="number" placeholder='Enter service charge' value={servicecharge} onChange={(e) => setServiceCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Night Charge</label>
                                <input type="number" placeholder='Enter night charge' value={nightcharge} onChange={(e) => setNightCharge(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Waiting Charge</label>
                                <input type="number" placeholder='Enter waiting charge' value={waitingCharge} onChange={(e) => setWaitingCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Traffic Charge</label>
                                <input type="number" placeholder='Enter traffic charge' value={trafficcharge} onChange={(e) => setTrafficCharge(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Tax</label>
                                <input type="number" placeholder='Enter Tax' value={taxrate} onChange={(e) => setTaxRate(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">GST</label>
                                <input type="number" placeholder='Enter GST' value={gstrate} onChange={(e) => setGstRate(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">price</label>
                                <input type="number" placeholder='Enter Base price' value={price} onChange={(e) => setPrice(e.target.value)} />
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