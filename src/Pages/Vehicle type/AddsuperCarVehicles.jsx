import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img3 from '../../Images/img43.png';





// import img from '../../Images/img5.png'


const AddsuperCarVehicles = () => {

    const [supercarname, setSuperCarName] = useState('');
    const [image, setImage] = useState('');
    // const [serviceCategory, setServiceCategory] = useState('');
    // const [serviceCategorys, setServiceCategorys] = useState([]);

    const handlePostRequest = async () => {
        const formData = new FormData();
        formData.append('name', supercarname);
        formData.append('image', image);
        // formData.append('serviceCategory', serviceCategory)


        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/SuperCar', formData);
            const message = response.data.message;
            toast.success("Super car added successfully");
            setSuperCarName('');
            setImage('');
            navigate('/allsuperCarvehicles')
        } catch (error) {
            console.error('Error to Super Car:', error);
            toast.error('Error to add Super Car');
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
                                <select onChange={(e) => setServiceCategory(e.target.value)}>
                                    <option value="">Select Categorys</option>
                                    {serviceCategorys?.map(Categorys => (
                                        <option key={Categorys.id} value={Categorys._id}>{Categorys.category}</option>
                                    ))}
                                </select>
                            </div> */}
                        </div>
                        <div className='vehicle13'>
                            <label htmlFor="">Upload Super Car Image</label>
                            <div className='service7' onClick={triggerFileInput}>
                                <div className='vehicle14'>
                                    {image ? (
                                        <img src={URL.createObjectURL(image)} alt="" />
                                    ) : (
                                        <img src={img3} alt="" />
                                    )}
                                </div>
                                <p>Drag and drop images here, or click to add image</p>
                                <button>Add Images</button>
                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>

                        <div className='promo1'>
                            <button onClick={() => navigate('/allsuperCarvehicles')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add Super Car</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddsuperCarVehicles)