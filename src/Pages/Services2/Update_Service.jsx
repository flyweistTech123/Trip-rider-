import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Services2.css';
import HOC from '../../Components/HOC/HOC';
import { useNavigate, useParams } from 'react-router-dom';
import img3 from '../../Images/img43.png';
import axios from 'axios';

const Update_Service = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // State
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [bannerimage, setBannerImage] = useState('');

    useEffect(() => {
        // Fetch service details by ID and populate the form
        const fetchServiceDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/serviceCategory/${id}`);
                const { category, type, description, banner, image } = response.data.data; // Assuming API response has these fields
                setCategory(category);
                setType(type);
                setDescription(description);
                setBannerImage(banner)
                setImage(image)
            } catch (error) {
                console.error('Error fetching service details:', error);
            }
        };
        fetchServiceDetails();
    }, [id]);

    const handlePostRequest = async () => {
        const formData = new FormData();
        formData.append('category', category);
        formData.append('type', type);
        formData.append('image', image);
        formData.append('banner', bannerimage);
        formData.append('description', description);

        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/serviceCategory/${id}`, formData);
            toast.success("Service Updated successfully");
            navigate('/services')
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error("Error updating service");
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const triggerFileInput1 = () => {
        document.getElementById('fileInput1').click();
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Service</h6>
                        </div>
                    </div>

                    <div className='service'>

                        <div className='service2'>
                            <div className='service1'>
                                <label htmlFor="">Category</label>
                                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div className='service1'>
                                <label htmlFor="">Type</label>
                                <select onChange={(e) => setType(e.target.value)}>
                                    <option value="hour" selected={type === "hour"}>Hourly</option>
                                    <option value="month" selected={type === "month"}>Monthly</option>
                                    <option value="superCar" selected={type === "superCar"}>superCar</option>
                                </select>
                            </div>
                        </div>
                        <div className='service2'>
                            <div className='service1'>
                                <label htmlFor="">Description</label>
                                <textarea name="" id="" cols="200" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>

                        <div className='service6'>
                            <div className='service4'>
                                <label htmlFor="">Upload Service Image</label>
                                <div className='service7' onClick={triggerFileInput}>
                                    <div className='vehicle14'>
                                        {image ? (
                                            <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="" />
                                        ) : (
                                            <img src={img3} alt="" />
                                        )}
                                    </div>
                                    <p>Drag and drop images here, or click to add image</p>
                                    <button>Add Images</button>
                                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            </div>
                            <div className='service4'>
                                <label htmlFor="">Upload Service Image</label>
                                <div className='service7' onClick={triggerFileInput1}>
                                    <div className='vehicle14'>
                                        {bannerimage ? (
                                            <img src={bannerimage instanceof File ? URL.createObjectURL(bannerimage) : bannerimage} alt="" />
                                        ) : (
                                            <img src={img3} alt="" />
                                        )}
                                    </div>
                                    <p>Drag and drop images here, or click to add image</p>
                                    <button>Add Images</button>
                                    <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={(e) => setBannerImage(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                        <div className='service3'>
                            <button onClick={() => navigate('/services')}>Cancel</button>
                            <button type='button' onClick={handlePostRequest}>Update Service</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Update_Service);
