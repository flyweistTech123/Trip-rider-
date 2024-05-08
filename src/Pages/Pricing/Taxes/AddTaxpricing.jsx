import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';


// import img from '../../Images/img5.png'


const AddTaxpricing = () => {
    const navigate = useNavigate();


    const [taxpriceeData, setTaxpriceData] = useState([]);

    useEffect(() => {
        fetchTaxpriceData();
    }, []);

    const fetchTaxpriceData = () => {
        axios.get(`${BaseUrl}api/v1/Taxes/get`, getAuthHeaders())
            .then(response => {
                setTaxpriceData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Tax Price data:', error);
            });
    };





    return (
        <>
            {taxpriceeData.map(taxprice => (
                <div className='rider'>
                    <div className='rider1'>
                        <div className='rider2'>
                            <div className='rider3'>
                                <h6>Tax Pricing</h6>
                            </div>

                            <div className='rider4'>
                                <button onClick={() => navigate(`/updatetaxpricing/${taxprice._id}`)}>Update Pricing</button>
                            </div>
                        </div>
                        <div style={{ marginBottom: "50px", marginTop:"32px" }}>
                            <div className='taxprice1'>
                                <h6>Ride Fee = Fees + (Night charges)+(Surge charges)+(Service charges)+(Railway pick up charges)+(Toll charges)+(Airport pick up charges) <br />+(Cancellation charges)+(Insurance premium)+(Waiting charges)</h6>
                            </div>
                            <div className='dailyprice'>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Night Charges (11 pm to 5 am)</label>
                                        {/* <input type="number" placeholder='Enter night charges tax' value={taxprice.nightCharges} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.nightCharges}</h6>
                                            <span>(Night Charges*fee)</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Night Charges Tax</label>
                                        <input type="number" placeholder='Enter night charge' value={taxprice.nightChargesTax} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Service Charge</label>
                                        {/* <input type="number" placeholder='Enter service charge' value={taxprice.serviceCharge} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.serviceCharge}</h6>
                                            <span>(Service Charges*fee)</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Waiting Charge (More than wait 5 min)</label>
                                        {/* <input type="number" placeholder='Enter Waiting Charge' value={taxprice.waitingCharge} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.waitingCharge}</h6>
                                            <span>(Waiting Charge+fee)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Time Rate</label>
                                        {/* <input type="number" placeholder='Enter parking Rate' value={taxprice.timeRate} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.timeRate}</h6>
                                            <span>(Airport pick up charge+fee)</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Km Rate</label>
                                        {/* <input type="number" placeholder='Enter km rate' value={taxprice.kmRate} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.kmRate}</h6>
                                            <span>(Discount-Platform charges )</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Platform Charges</label>
                                        {/* <input type="number" placeholder='Enter time Rate' value={taxprice.plateFormCharges} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.plateFormCharges}</h6>
                                            <span>(Platform Charges*fee)</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Platform Charges Gst</label>
                                        <input type="number" placeholder='Enter plate Form Charges' value={taxprice.plateFormChargesGst} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Surge Charges  (Morning (8am to 10am),evening (5pm to 7pm) )</label>
                                        {/* <input type="number" placeholder='Enter surge Charges' value={taxprice.surgeCharges} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.surgeCharges}</h6>
                                            <span>(Surge Charges*fee)</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Surge Charges Tax</label>
                                        <input type="number" placeholder='Enter toll Charge' value={taxprice.surgeChargesTax} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Ride Time Charges</label>
                                        {/* <input type="number" placeholder='Enter ride time Charges' value={taxprice.ridetimeCharges} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.ridetimeCharges}</h6>
                                            <span>(GST 18%(CGST 9% + SGST 9% of platform charges))</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Parking Rate</label>
                                        <input type="number" placeholder='Enter cancellation Charges' value={taxprice.ParkingRate} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Toll Charge</label>
                                        {/* <input type="number" placeholder='Enter ride time Charges' value={taxprice.tollCharge} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.tollCharge}</h6>
                                            <span>(Toll Charges+fee)</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Railway PickUp Charge</label>
                                        {/* <input type="number" placeholder='Enter cancellation Charges' value={taxprice.railwayPickUpCharge} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.railwayPickUpCharge}</h6>
                                            <span>(Railway PickUp Charge+fee)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Insurance Premium</label>
                                        {/* <input type="number" placeholder='Enter ride time Charges' value={taxprice.otherCharge} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.otherCharge}</h6>
                                            <span>(Insurance Premium+fee)</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Cancellation Charges</label>
                                        {/* <input type="number" placeholder='Enter cancellation Charges' value={taxprice.cancellationCharges} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.cancellationCharges}</h6>
                                            <span>(Cancellation Charges+fee)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">GST</label>
                                        {/* <input type="number" placeholder='Enter other Charge' value={taxprice.basePrice} /> */}
                                        <div className='taxprice'>
                                            <h6>{taxprice.basePrice}</h6>
                                            <span>(GST 5%(CGST 2.5% + SGST 2.5% * ride fee))</span>
                                        </div>
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Description</label>
                                        <textarea name="" id="" cols="30" rows="5" value={taxprice.description} ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            ))}
        </>
    )
}

export default HOC(AddTaxpricing)