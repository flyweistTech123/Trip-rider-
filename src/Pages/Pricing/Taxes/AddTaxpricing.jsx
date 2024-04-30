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
                                {/* <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
                            </div> */}
                            </div>
                        </div>
                        <div style={{ marginBottom: "50px" }}>
                            <div className='dailyprice'>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Night Charges</label>
                                        <input type="number" placeholder='Enter night charges tax' value={taxprice.nightCharges} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Night Charges Tax</label>
                                        <input type="number" placeholder='Enter night charge' value={taxprice.nightChargesTax} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Service Charge</label>
                                        <input type="number" placeholder='Enter service charge' value={taxprice.serviceCharge} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Waiting Charge</label>
                                        <input type="number" placeholder='Enter Waiting Charge' value={taxprice.waitingCharge} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Time Rate</label>
                                        <input type="number" placeholder='Enter parking Rate' value={taxprice.timeRate} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Km Rate</label>
                                        <input type="number" placeholder='Enter km rate' value={taxprice.kmRate} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Plate Form Charges</label>
                                        <input type="number" placeholder='Enter time Rate' value={taxprice.plateFormCharges} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Plate Form Charges Gst</label>
                                        <input type="number" placeholder='Enter plate Form Charges' value={taxprice.plateFormChargesGst} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Surge Charges</label>
                                        <input type="number" placeholder='Enter surge Charges' value={taxprice.surgeCharges} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Surge Charges Tax</label>
                                        <input type="number" placeholder='Enter toll Charge' value={taxprice.surgeChargesTax} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Ride Time Charges</label>
                                        <input type="number" placeholder='Enter ride time Charges' value={taxprice.ridetimeCharges} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Parking Rate</label>
                                        <input type="number" placeholder='Enter cancellation Charges' value={taxprice.ParkingRate} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Toll Charge</label>
                                        <input type="number" placeholder='Enter ride time Charges' value={taxprice.tollCharge} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Railway PickUp Charge</label>
                                        <input type="number" placeholder='Enter cancellation Charges' value={taxprice.railwayPickUpCharge} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Insurance Premium</label>
                                        <input type="number" placeholder='Enter ride time Charges' value={taxprice.otherCharge} />
                                    </div>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">Cancellation Charges</label>
                                        <input type="number" placeholder='Enter cancellation Charges' value={taxprice.cancellationCharges} />
                                    </div>
                                </div>
                                <div className='dailyprice3'>
                                    <div className='dailyprice4'>
                                        <label htmlFor="">GST</label>
                                        <input type="number" placeholder='Enter other Charge' value={taxprice.basePrice} />
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