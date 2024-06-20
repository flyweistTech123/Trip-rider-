import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import HOC from '../../../Components/HOC/HOC'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { BaseUrl, getAuthHeaders } from '../../../Components/BaseUrl/BaseUrl';




import img3 from '../../../Images/img43.png';



// import img from '../../Images/img5.png'


const UpdateSuperCarPricing = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    // const [images, setImages] = useState([]);
    // const [previewImages, setPreviewImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [price, setPrice] = useState('');
    const [kmLimit, setKmLimit] = useState('');
    const [kmPrice, setKmPrice] = useState('')
    const [hrPrice, setHrPrice] = useState('');
    const [hrLimit, setHrLimit] = useState('');
    const [pricePerKmGreater, setPricePerKmGreater] = useState('');
    const [pricePerMinGreater, SetPricePerMinGreater] = useState('');

    useEffect(() => {
        const fetchSuperCarDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/SuperCarPricing/${id}`, getAuthHeaders());
                const { name, image, price, kmLimit, kmPrice, hrPrice, hrLimit, pricePerKmGreater, pricePerMinGreater } = response.data.data;
                setName(name);
                // setPreviewImages(image.map(imgObj => imgObj.img));
                // setImages(image.map(imgObj => imgObj.img));
                setExistingImages(image.map(imgObj => imgObj.img));
                setPreviewImages(image.map(imgObj => imgObj.img));
                setPrice(price);
                setKmLimit(kmLimit);
                setKmPrice(kmPrice);
                setHrPrice(hrPrice);
                setHrLimit(hrLimit);
                setPricePerKmGreater(pricePerKmGreater);
                SetPricePerMinGreater(pricePerMinGreater);
            } catch (error) {
                console.error('Error fetching Super car Pricing details:', error);
            }
        };
        fetchSuperCarDetails();
    }, [id]);
    const handlePutRequest = async () => {
        const formData = new FormData();
        formData.append('name', name);
        existingImages.forEach((image, index) => {
            formData.append(`image`, image);
        });
        newImages.forEach((image, index) => {
            formData.append('image', image.file);
        })
        formData.append('price', price);
        formData.append('kmLimit', kmLimit);
        formData.append('kmPrice', kmPrice);
        formData.append('hrPrice', hrPrice);
        formData.append('hrLimit', hrLimit);
        formData.append('pricePerKmGreater', pricePerKmGreater);
        formData.append('pricePerMinGreater', pricePerMinGreater);


        try {
            const response = await axios.put(`${BaseUrl}api/v1/SuperCarPricing/${id}`, formData, getAuthHeaders());
            toast.success("Super Car Pricing Updated successfully");
            navigate('/allsupercarpricing');
        } catch (error) {
            console.error('Error updating Super Car Pricing:', error);
            toast.error("Error updating Super Car Pricing");
        }
    }

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newImagesData = selectedFiles.map(file => ({
            img: URL.createObjectURL(file),
            file
        }));
        setPreviewImages(prev => [...prev, ...newImagesData.map(imgObj => imgObj.img)]);
        setNewImages(prev => [...prev, ...newImagesData]);
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
                            <div className='vehicle13'>
                                <label htmlFor="">Updated Super Car Image</label>
                                <div className='service7' onClick={triggerFileInput}>
                                    <div className='vehicle14'>
                                        {previewImages.length > 0 ? (
                                            previewImages.map((img, index) => (
                                                <img key={index} src={img} alt={`Preview ${index}`} />
                                            ))
                                        ) : (
                                            <img src={img3} alt="" />
                                        )}
                                    </div>
                                    <p>Drag and drop images here, or click to add image</p>
                                    <button>Update Images</button>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>
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