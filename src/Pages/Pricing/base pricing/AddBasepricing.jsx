import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const AddBasepricing = () => {

    const [vehicles, setVehicles] = useState([]);
    const [citys, setCitys] = useState([]);
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


    const handlePostRequest = async () => {
        const data = {
            city: city,
            vehicle: vehicle,
            taxRate: taxrate,
            gstRate: gstrate,
            serviceCharge: servicecharge,
            nightCharges: nightcharge,
            waitingCharge: waitingCharge,
            trafficCharge: trafficcharge,
        }

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/BasePricing/add', data)
            toast.success("Base Pricing add successfully");
            navigate('/allbasepricing')
            setCity('');
            setVehicle('');
            setTaxRate('');
            setGstRate('');
            setWaitingCharge('')
            setServiceCharge('');
            setNightCharge('');
            setTrafficCharge('');
            setPrice('');

        } catch (error) {
            console.log('Error to add Base Pricing:', error)
            toast.error("Error to add Base Pricing")
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
                                <label htmlFor="">Service Charge</label>
                                <input type="number" placeholder='Enter service charge' value={servicecharge} onChange={(e) => setServiceCharge(e.target.value)}  />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Night Charge</label>
                                <input type="number" placeholder='Enter night charge' value={nightcharge} onChange={(e) => setNightCharge(e.target.value)}  />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Waiting Charge</label>
                                <input type="number" placeholder='Enter waiting charge' value={waitingCharge} onChange={(e) => setWaitingCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Traffic Charge</label>
                                <input type="number" placeholder='Enter traffic charge' value={trafficcharge} onChange={(e) => setTrafficCharge(e.target.value)}  />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Tax</label>
                                <input type="number" placeholder='Enter Tax' value={taxrate} onChange={(e) => setTaxRate(e.target.value)}  />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">GST</label>
                                <input type="number" placeholder='Enter GST' value={gstrate} onChange={(e) => setGstRate(e.target.value)}  />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">price</label>
                                <input type="number" placeholder='Enter Base price' value={price} onChange={(e) => setPrice(e.target.value)}  />
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