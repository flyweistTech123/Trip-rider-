import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../Pricing.css'
import HOC from '../../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';



import img3 from '../../../Images/img43.png';






// import img from '../../Images/img5.png'


const AddSuperCarPricing = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [superCar, setSuperCar] = useState('');
    const [superCars, setSuperCars] = useState([]);
    const [price, setPrice] = useState('');
    const [kmLimit, setKmLimit] = useState('');
    const [kmPrice, setKmPrice] = useState('')
    const [hrPrice, setHrPrice] = useState('');
    const [hrLimit, setHrLimit] = useState('');
    const [pricePerKmGreater, setPricePerKmGreater] = useState('');
    const [pricePerMinGreater, SetPricePerMinGreater] = useState('');
    const navigate = useNavigate();


    const handlePostRequest = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('superCar', superCar);
        formData.append('price', price);
        formData.append('kmLimit', kmLimit);
        formData.append('kmPrice', kmPrice);
        formData.append('hrPrice', hrPrice);
        formData.append('hrLimit', hrLimit);
        formData.append('pricePerKmGreater', pricePerKmGreater);
        formData.append('pricePerMinGreater', pricePerMinGreater);


        try {
            const response = await axios.post(`${BaseUrl}api/v1/SuperCarPricing`, formData, getAuthHeaders())
            const message = response.data.message;
            toast.success("Super car Pricing added successfully");
            navigate('/allsupercarpricing')
            setName('');
            setImage('');
            setPrice('');
            setKmLimit('');
            setKmPrice('');
            setHrPrice('');
            setHrLimit('')
            setSuperCar('')
            setPricePerKmGreater()
            SetPricePerMinGreater()

        } catch (error) {
            console.log('Error to add Super car Pricing:', error)
            toast.error("Error to add Super car Pricing")
        }
    }

    useEffect(() => {
        const fetchSuperCar = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/SuperCar`, getAuthHeaders());
                setSuperCars(response.data.data);
            } catch (error) {
                console.error('Error fetching Super car:', error);
            }
        };

        fetchSuperCar();
    }, []);

    const triggerFileInput1 = () => {
        document.getElementById('fileInput1').click();
    };


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Super car Pricing</h6>
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
                                <label htmlFor="">Super car Name</label>
                                <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price</label>
                                <input type="number" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">km Limit</label>
                                <input type="number" placeholder='Enter Km Limit' value={kmLimit} onChange={(e) => setKmLimit(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">km Price</label>
                                <input type="number" placeholder='Enter Km Price' value={kmPrice} onChange={(e) => setKmPrice(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Hours Limit</label>
                                <input type="number" placeholder='Enter Hours limit' value={hrLimit} onChange={(e) => setHrLimit(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Hours Price</label>
                                <input type="number" placeholder='Enter Hours Price' value={hrPrice} onChange={(e) => setHrPrice(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price/KmGreater</label>
                                <input type="number" placeholder='Enter Price/KmGreater' value={pricePerKmGreater} onChange={(e) => setPricePerKmGreater(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Price/MinGreater</label>
                                <input type="number" placeholder='Enter Price/MinGreater' value={pricePerMinGreater} onChange={(e) => SetPricePerMinGreater(e.target.value)} />
                            </div>
                            <div className='dailyprice2'>
                                <label htmlFor="">Super Cars</label>
                                <select onChange={(e) => setSuperCar(e.target.value)}>
                                    <option value="">Select Super Cars</option>
                                    {superCars?.map(Supercar => (
                                        <option key={Supercar.id} value={Supercar._id}>{Supercar.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='vehicle13'>
                                <label htmlFor="">Upload Super car Image</label>
                                <div className='ambulance2' onClick={triggerFileInput1}>
                                    <div className='vehicle14'>
                                        {image ? (
                                            <img src={URL.createObjectURL(image)} alt="" />
                                        ) : (
                                            <img src={img3} alt="" />
                                        )}
                                    </div>
                                    <p>Drag and drop images here, or click to add image</p>
                                    <button>Add Images</button>
                                    <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                

                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allsupercarpricing')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add Price</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddSuperCarPricing)