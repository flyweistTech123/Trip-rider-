import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img3 from '../../Images/img43.png';


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


// import img from '../../Images/img5.png'


const UpdatesuperCarVehicles = () => {
    const { id } = useParams();
    const [supercarname, setSuperCarName] = useState('');
    const [image, setImage] = useState('');
    // const [serviceCategory, setServiceCategory] = useState('');
    // const [serviceCategorys, setServiceCategorys] = useState([]);
    // const [serviceCategoryId, setServiceCategoryID] = useState('');


    useEffect(() => {
        const fetchSuperCarDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/SuperCar/${id}`);
                const { name, image, serviceCategory } = response.data.data;
                setSuperCarName(name);
                setImage(image);
                // setServiceCategory(serviceCategory)
                // serviceCategoryId(serviceCategory._id)
            } catch (error) {
                console.error('Error fetching Super car details:', error);
            }
        };
        fetchSuperCarDetails();
    }, [id]);
    const handlePutRequest = async () => {
        const formData = new FormData();
        formData.append('name', supercarname);
        formData.append('image', image);
        // formData.append('serviceCategory', serviceCategoryId)



        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/SuperCar/${id}`, formData);
            toast.success("Super Car Updated successfully");
            navigate('/allsuperCarvehicles');
        } catch (error) {
            console.error('Error updating Super Car:', error);
            toast.error("Error updating Super Car");
        }
    }

    // useEffect(() => {
    //     const fetchServiceCategory = async () => {
    //         try {
    //             const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/serviceCategory`);
    //             setServiceCategorys(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching Service Category:', error);
    //         }
    //     };

    //     fetchServiceCategory();
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
                            <h6>Add Super Car</h6>
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
                                <label htmlFor="">Super Car Name</label>
                                <input type="text" placeholder='Enter category' value={supercarname} onChange={(e) => setSuperCarName(e.target.value)} />
                            </div>
                            {/* <div className='dailyprice2'>
                                <label htmlFor="">Category</label>
                                <select value={serviceCategory} onChange={(e) => {
                                    const selectedCategory = serviceCategorys.find(category => category.category === e.target.value);
                                    setServiceCategoryID(selectedCategory._id);
                                    setServiceCategory(e.target.value);
                                }}>
                                    <option>Select Category</option>
                                    {serviceCategorys?.map(category => (
                                        <option key={category._id} value={category.category}>{category.category}</option>
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
                            <button onClick={() => navigate('/allsuperCarvehicles')}>Cancel</button>
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdatesuperCarVehicles)