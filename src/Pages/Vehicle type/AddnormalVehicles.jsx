import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import img3 from '../../Images/img43.png';


import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const AddnormalVehicles = () => {
    const [vehiclename, setVehicleName] = useState('');
    const [type, SetType] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();


    const handlePostRequest = async () => {
        const formData = new FormData();
        formData.append('name', vehiclename);
        formData.append('type', type);
        formData.append('image', image);

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/vehicle', formData)
            toast.success("Vehicle added successfully");
            navigate('/allnormalvehicles')
            setVehicleName('');
            setImage('');
            SetType('')

        } catch (error) {
            console.log('Error to adding Vehicle:', error)
            toast.error("Error to adding Vehicle")
        }
    }
    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Vehicle</h6>
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
                                <label htmlFor="">Vehicle Name</label>
                                <input type="text" placeholder='Enter Vehicle Name' value={vehiclename} onChange={(e) => setVehicleName(e.target.value)} />
                            </div>
                            <div className='dailyprice2'>
                                <label htmlFor="">Vehicle Type</label>
                                <select onChange={(e) => SetType(e.target.value)}>
                                <option value="">Select vehicle Type</option>
                                    <option name="auto" value="auto">Auto</option>
                                    <option name="bike" value="bike">Bike</option>
                                    <option name="car" value="car">Car</option>
                                </select>
                            </div>
                        </div>

                        <div className='vehicle13'>
                            <label htmlFor="">Upload Vehicle Image</label>
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


                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allnormalvehicles')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add Vehicle</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddnormalVehicles)