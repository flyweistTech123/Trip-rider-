import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import HOC from '../../../Components/HOC/HOC'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img3 from '../../../Images/img43.png';


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


// import img from '../../Images/img5.png'


const UpdateSuperCarPricing = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [price, setPrice] = useState('');
    const [kmLimit, setKmLimit] = useState('');
    const [kmPrice, setKmPrice] = useState('')
    const [hrPrice, setHrPrice] = useState('');
    const [hrLimit, setHrLimit] = useState('');


    useEffect(() => {
        const fetchSuperCarDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/SuperCarPricing/${id}`);
                const { name, image, price, kmLimit, kmPrice, hrPrice, hrLimit } = response.data.data;
                setName(name);
                setImage(image[0].img);
                setPrice(price);
                setKmLimit(kmLimit);
                setKmPrice(kmPrice);
                setHrPrice(hrPrice);
                setHrLimit(hrLimit);
            } catch (error) {
                console.error('Error fetching Super car Pricing details:', error);
            }
        };
        fetchSuperCarDetails();
    }, [id]);
    const handlePutRequest = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('kmLimit', kmLimit);
        formData.append('kmPrice', kmPrice);
        formData.append('hrPrice', hrPrice);
        formData.append('hrLimit', hrLimit);



        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/SuperCarPricing/${id}`, formData);
            toast.success("Super Car Pricing Updated successfully");
            navigate('/allsupercarpricing');
        } catch (error) {
            console.error('Error updating Super Car Pricing:', error);
            toast.error("Error updating Super Car Pricing");
        }
    }

    // useEffect(() => {
    //     const fetchSuperCar = async () => {
    //         try {
    //             const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/SuperCar`);
    //             setSuperCars(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching Super car:', error);
    //         }
    //     };

    //     fetchSuperCar();
    // }, []);

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Super Car Pricing</h6>
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
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">km Limit</label>
                                <input type="number" placeholder='Enter Km Limit' value={kmLimit} onChange={(e) => setKmLimit(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">km Price</label>
                                <input type="number" placeholder='Enter Km Price' value={kmPrice} onChange={(e) => setKmPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Hours Limit</label>
                                <input type="number" placeholder='Enter Hours limit' value={hrLimit} onChange={(e) => setHrLimit(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Hours Price</label>
                                <input type="number" placeholder='Enter Hours Price' value={hrPrice} onChange={(e) => setHrPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            {/* <div className='dailyprice2'>
                                <label htmlFor="">Super Cars</label>
                                <select value={superCar} onChange={(e) => {
                                    const selectedSupercar = superCars.find(supercar => supercar.name === e.target.value);
                                    setSuperCarID(selectedSupercar._id);
                                    setSuperCar(e.target.value);
                                }}>
                                    <option>Select Super Cars</option>
                                    {superCars?.map(Supercar => (
                                        <option key={Supercar._id} value={Supercar.name}>{Supercar.name}</option>
                                    ))}
                                </select>
                            </div> */}
                        </div>

                        <div className='vehicle13'>
                            <label htmlFor="">Updated Super Car Image</label>
                            <div className='service7' onClick={triggerFileInput}>
                                <div className='vehicle14'>
                                    {image ? (
                                        <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="" />
                                    ) : (
                                        <img src={img3} alt="" />
                                    )}
                                </div>
                                <p>Drag and drop images here, or click to add image</p>
                                <button>Update Image</button>
                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>


                        <div className='promo1'>
                            <button onClick={() => navigate('/allsupercarpricing')}>Cancel</button>
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdateSuperCarPricing)