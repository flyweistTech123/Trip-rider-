import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import img3 from '../../Images/img43.png';


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



// import img from '../../Images/img5.png'


const UpdatenormalVehicles = () => {
    const { id } = useParams();
    const [vehiclename, setVehicleName] = useState('');
    const [type, SetType] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/vehicle/${id}`);
                const { name, image, type } = response.data.data;
                setVehicleName(name);
                setImage(image);
                SetType(type);
            } catch (error) {
                console.error('Error fetching Vehicle details:', error);
            }
        };
        fetchVehicleDetails();
    }, [id]);

    const handlePutRequest = async () => {
        const formData = new FormData();
        formData.append('name', vehiclename);
        formData.append('type', type);
        formData.append('image', image);

        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/vehicle/${id}`, formData)
            toast.success("Vehicle Updated successfully");
            navigate('/allnormalvehicles')
        } catch (error) {
            console.log('Error to updating Vehicle:', error)
            toast.error("Error to updating Vehicle")
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
                                    <option name="auto" value="auto" selected={type === "auto"}>Auto</option>
                                    <option name="bike" value="bike" selected={type === "bike"}>Bike</option>
                                    <option name="car" value="car" selected={type === "car"}>Car</option>
                                </select>
                            </div>
                        </div>
                        <div className='vehicle13'>
                            <label htmlFor="">Updated Vehicle Image</label>
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


                        <div className='dailyprice5'>
                            <button onClick={() => navigate('/allnormalvehicles')}>Cancel</button>
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdatenormalVehicles)