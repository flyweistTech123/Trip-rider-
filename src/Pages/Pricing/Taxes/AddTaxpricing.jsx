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


const AddTaxpricing = () => {
    const [baseprice, setBasePrice] = useState('');
    const [nightcharge, setNightCharge] = useState('');
    const [servicecharge, setServiceCharge] = useState('')
    const [waitingCharge, setWaitingCharge] = useState('');
    const [parkingRate, setParkingRate] = useState('');
    const [kmRate, setKmRate] = useState('')
    const [timeRate, setTimeRate] = useState('');
    const [plateFormCharges, setPlateFormCharges] = useState('');
    const [otherCharge, setOtherCharge] = useState('');
    const [surgeCharges, setSurgeCharges] = useState('');
    const [tollCharge, setTollCharge] = useState('');
    const [ridetimeCharges, setRidetimeCharges] = useState('');
    const [cancellationCharges, setCancellationCharges] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();


    const handlePostRequest = async () => {
        const data = {
            basePrice: baseprice,
            nightCharges: nightcharge,
            serviceCharge: servicecharge,
            waitingCharge: waitingCharge,
            ParkingRate: parkingRate,
            kmRate: kmRate,
            timeRate: timeRate,
            plateFormCharges: plateFormCharges,
            otherCharge: otherCharge,
            surgeCharges: surgeCharges,
            tollCharge: tollCharge,
            ridetimeCharges: ridetimeCharges,
            cancellationCharges: cancellationCharges,
            description: description
        }

        try {
            const response = await axios.post(`${BaseUrl}api/v1/Taxes/add`, data, getAuthHeaders())
            toast.success("Tax Pricing add successfully");
            navigate('/alltaxpricing')
            setBasePrice('')
            setNightCharge('')
            setServiceCharge('')
            setWaitingCharge('')
            setParkingRate('')
            setKmRate('')
            setTimeRate('')
            setPlateFormCharges('')
            setOtherCharge('')
            setSurgeCharges('')
            setTollCharge('')
            setRidetimeCharges('')
            setCancellationCharges('')
            setDescription('')

        } catch (error) {
            console.log('Error to add Tax Pricing:', error)
            toast.error("Error to add Tax Pricing")
        }
    }

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Tax Pricing</h6>
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
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Base Price</label>
                                <input type="number" placeholder='Enter Base price' value={baseprice} onChange={(e) => setBasePrice(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Night Charge</label>
                                <input type="number" placeholder='Enter night charge' value={nightcharge} onChange={(e) => setNightCharge(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Service Charge</label>
                                <input type="number" placeholder='Enter service charge' value={servicecharge} onChange={(e) => setServiceCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Waiting Charge</label>
                                <input type="number" placeholder='Enter Waiting Charge' value={waitingCharge} onChange={(e) => setWaitingCharge(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Parking Rate</label>
                                <input type="number" placeholder='Enter parking Rate' value={parkingRate} onChange={(e) => setParkingRate(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Km Rate</label>
                                <input type="number" placeholder='Enter km rate' value={kmRate} onChange={(e) => setKmRate(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Time Rate</label>
                                <input type="number" placeholder='Enter time Rate' value={timeRate} onChange={(e) => setTimeRate(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Plate Form Charges</label>
                                <input type="number" placeholder='Enter plate Form Charges' value={plateFormCharges} onChange={(e) => setPlateFormCharges(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Surge Charges</label>
                                <input type="number" placeholder='Enter surge Charges' value={surgeCharges} onChange={(e) => setSurgeCharges(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Toll Charge</label>
                                <input type="number" placeholder='Enter toll Charge' value={tollCharge} onChange={(e) => setTollCharge(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Ride Time Charges</label>
                                <input type="number" placeholder='Enter ride time Charges' value={ridetimeCharges} onChange={(e) => setRidetimeCharges(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Cancellation Charges</label>
                                <input type="number" placeholder='Enter cancellation Charges' value={tollCharge} onChange={(e) => setCancellationCharges(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Other Charge</label>
                                <input type="number" placeholder='Enter other Charge' value={otherCharge} onChange={(e) => setOtherCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Description</label>
                                <textarea name="" id="" cols="30" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/alltaxpricing')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add Price</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddTaxpricing)