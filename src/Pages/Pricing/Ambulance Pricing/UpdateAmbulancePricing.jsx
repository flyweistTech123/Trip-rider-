import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import img3 from '../../../Images/img43.png';
import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const UpdateAmbulancePricing = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [perkm, setPerKm] = useState('');
    const [baseprice, setBaseprice] = useState('');
    const [taxrate, setTaxRate] = useState('')
    const [gstrate, setGstRate] = useState('');
    const [servicecharge, setServiceCharge] = useState('')
    const [nightcharge, setNightCharge] = useState('');
    const [waitingCharge, setWaitingCharge] = useState('');
    const [trafficcharge, setTrafficCharge] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/ambulanceVehicle/${id}`, getAuthHeaders());
                const { name, perKm, basePrice, taxRate, gstRate, serviceCharge, nightCharges, waitingCharge, trafficCharge, image } = response.data.data;
                setName(name);
                setImage(image);
                setPerKm(perKm);
                setBaseprice(basePrice);
                setTaxRate(taxRate);
                setGstRate(gstRate);
                setServiceCharge(serviceCharge);
                setNightCharge(nightCharges);
                setWaitingCharge(waitingCharge);
                setTrafficCharge(trafficCharge);
            } catch (error) {
                console.error('Error fetching Ambulance Pricing details:', error);
            }
        };
        fetchPriceDetails();
    }, [id]);

    const handlePutRequest = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('perKm', perkm);
        formData.append('basePrice', baseprice);
        formData.append('taxRate', taxrate);
        formData.append('gstRate', gstrate);
        formData.append('serviceCharge', servicecharge);
        formData.append('nightCharges', nightcharge);
        formData.append('waitingCharge', waitingCharge);
        formData.append('trafficCharge', trafficcharge);

        try {
            const response = await axios.put(`${BaseUrl}api/v1/ambulanceVehicle/${id}`, getAuthHeaders(), formData)
            toast.success("Base Ambulance price Updated successfully");
            navigate('/allambulancepricing')
        } catch (error) {
            console.log('Error to updating Ambulance Pricing:', error)
            toast.error("Error to updating Ambulance Pricing")
        }
    }

    const triggerFileInput1 = () => {
        document.getElementById('fileInput1').click();
    };


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
                        <div className='outstationprice1'>
                            <p>Ambulance Type:</p>
                            <div className='outstationprice2'>
                                <div className='outstationprice3'>
                                    <input type="radio" name="ambulanceType" value="Normal" checked={name === "Normal"} onChange={(e) => setName(e.target.value)} />
                                    <p>Normal</p>
                                </div>
                                <div className='outstationprice3'>
                                    <input type="radio" name="ambulanceType" value="Configuration" checked={name === "Configuration"} onChange={(e) => setName(e.target.value)} />
                                    <p>Configuration</p>
                                </div>
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
                            <div className='dailyprice4'>
                                <label htmlFor="">Waiting Charge</label>
                                <input type="number" placeholder='Enter waiting charge' value={waitingCharge} onChange={(e) => setWaitingCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Traffic Charge</label>
                                <input type="number" placeholder='Enter traffic charge' value={trafficcharge} onChange={(e) => setTrafficCharge(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Tax</label>
                                <input type="number" placeholder='Enter Tax' value={taxrate} onChange={(e) => setTaxRate(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">GST</label>
                                <input type="number" placeholder='Enter GST' value={gstrate} onChange={(e) => setGstRate(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">price/Km</label>
                                <input type="number" placeholder='Enter price' value={perkm} onChange={(e) => setPerKm(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Base Price</label>
                                <input type="number" placeholder='Enter Base price' value={baseprice} onChange={(e) => setBaseprice(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Upload Ambulance Image</label>
                                <div className='ambulance2' onClick={triggerFileInput1}>
                                    <div className='vehicle14'>
                                        <img src={image} alt="" />
                                    </div>
                                    <p>Drag and drop images here, or click to add image</p>
                                    <button>Add Images</button>
                                    <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                    

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allambulancepricing')}>Cancel</button>
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdateAmbulancePricing)