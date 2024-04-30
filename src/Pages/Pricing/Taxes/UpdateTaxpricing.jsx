import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const UpdateTaxpricing = () => {
    const { id } = useParams();
    const [baseprice, setBasePrice] = useState('');
    const [nightcharge, setNightCharge] = useState('');
    const [nightchargestax, setnightchargestax] = useState('');
    const [servicecharge, setServiceCharge] = useState('')
    const [waitingCharge, setWaitingCharge] = useState('');
    const [parkingRate, setParkingRate] = useState('');
    const [kmRate, setKmRate] = useState('')
    const [timeRate, setTimeRate] = useState('');
    const [plateFormCharges, setPlateFormCharges] = useState('');
    const [plateFormChargesGst, setPlateFormChargesGst] = useState('');
    const [otherCharge, setOtherCharge] = useState('');
    const [surgeCharges, setSurgeCharges] = useState('');
    const [surgeChargesTax, setSurgeChargesTax] = useState('');
    const [tollCharge, setTollCharge] = useState('');
    const [ridetimeCharges, setRidetimeCharges] = useState('');
    const [cancellationCharges, setCancellationCharges] = useState('');
    const [railwayPickUpCharge, setRailwayPickUpCharge] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/Taxes/${id}`, getAuthHeaders());
                const { basePrice,
                    serviceCharge,
                    nightCharges,
                    nightChargesTax, 
                    waitingCharge,
                    ParkingRate,
                    kmRate,
                    timeRate,
                    plateFormCharges,
                    plateFormChargesGst,
                    otherCharge,
                    surgeCharges,
                    surgeChargesTax,
                    tollCharge,
                    ridetimeCharges,
                    cancellationCharges,
                    railwayPickUpCharge,
                    description } = response.data.data;
                setBasePrice(basePrice)
                setNightCharge(nightCharges);
                setnightchargestax(nightChargesTax);
                setServiceCharge(serviceCharge);
                setWaitingCharge(waitingCharge);
                setParkingRate(ParkingRate);
                setKmRate(kmRate);
                setTimeRate(timeRate);
                setPlateFormCharges(plateFormCharges);
                setPlateFormChargesGst(plateFormChargesGst);
                setOtherCharge(otherCharge);
                setSurgeCharges(surgeCharges);
                setSurgeChargesTax(surgeChargesTax);
                setTollCharge(tollCharge);
                setRidetimeCharges(ridetimeCharges);
                setCancellationCharges(cancellationCharges);
                setRailwayPickUpCharge(railwayPickUpCharge);
                setDescription(description)
            } catch (error) {
                console.error('Error fetching Tax Pricing details:', error);
            }
        };
        fetchPriceDetails();
    }, [id]);
    const handlePutRequest = async () => {
        const data = {
            basePrice: baseprice,
            nightCharges: nightcharge,
            nightChargesTax: nightchargestax,
            serviceCharge: servicecharge,
            waitingCharge: waitingCharge,
            ParkingRate: parkingRate,
            kmRate: kmRate,
            timeRate: timeRate,
            plateFormCharges: plateFormCharges,
            plateFormChargesGst: plateFormChargesGst,
            otherCharge: otherCharge,
            surgeCharges: surgeCharges,
            surgeChargesTax:surgeChargesTax,
            tollCharge: tollCharge,
            ridetimeCharges: ridetimeCharges,
            cancellationCharges: cancellationCharges,
            railwayPickUpCharge: railwayPickUpCharge,
            description: description
        }

        try {
            const response = await axios.put(`${BaseUrl}api/v1/Taxes/update/${id}`, data, getAuthHeaders())
            toast.success("Tax Pricing Updated successfully");
            navigate('/taxpricing')
        } catch (error) {
            console.log('Error to updating Tax Pricing:', error)
            toast.error("Error to updating Tax Pricing")
        }
    }

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Tax Pricing</h6>
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
                                <label htmlFor="">Night Charges</label>
                                <input type="number" placeholder='Enter Base price' value={nightcharge} onChange={(e) => setNightCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Night Charges Tax</label>
                                <input type="number" placeholder='Enter night charge tax' value={nightchargestax} onChange={(e) => setnightchargestax(e.target.value)} />
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
                                <label htmlFor="">Time Rate</label>
                                <input type="number" placeholder='Enter time Rate' value={timeRate} onChange={(e) => setTimeRate(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Km Rate</label>
                                <input type="number" placeholder='Enter km rate' value={kmRate} onChange={(e) => setKmRate(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Plate Form Charges</label>
                                <input type="number" placeholder='Enter platfrom charge' value={plateFormCharges} onChange={(e) => setPlateFormCharges(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Plate Form Charges Gst</label>
                                <input type="number" placeholder='Enter plate Form Charges gst' value={plateFormChargesGst} onChange={(e) => setPlateFormChargesGst(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Surge Charges</label>
                                <input type="number" placeholder='Enter surge Charges' value={surgeCharges} onChange={(e) => setSurgeCharges(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Surge Charges Tax</label>
                                <input type="number" placeholder='Enter surge Charges tax' value={surgeChargesTax} onChange={(e) =>setSurgeChargesTax(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Ride Time Charges</label>
                                <input type="number" placeholder='Enter ride time Charges' value={ridetimeCharges} onChange={(e) => setRidetimeCharges(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Parking Rate</label>
                                <input type="number" placeholder='Enter parking rate' value={parkingRate} onChange={(e) => setParkingRate(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Toll Charge</label>
                                <input type="number" placeholder='Enter ride time Charges' value={tollCharge} onChange={(e) => setTimeRate(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Railway PickUp Charge</label>
                                <input type="number" placeholder='Enter railway pickup charges' value={railwayPickUpCharge} onChange={(e) => setRailwayPickUpCharge(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Insurance Premium</label>
                                <input type="number" placeholder='Enter insurance premium' value={otherCharge} onChange={(e) => setOtherCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Cancellation Charges</label>
                                <input type="number" placeholder='Enter cancellation Charges' value={cancellationCharges} onChange={(e) => setCancellationCharges(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">GST</label>
                                <input type="number" placeholder='Enter gst Charge' value={baseprice} onChange={(e) => setBasePrice(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Description</label>
                                <textarea name="" id="" cols="30" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                            </div>
                        </div>

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/taxpricing')}>Cancel</button>
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdateTaxpricing)