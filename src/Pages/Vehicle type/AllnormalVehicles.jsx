import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";



// import img from '../../Images/img5.png'



const AllnormalVehicles = () => {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVehicleData();
    }, []);

    const fetchVehicleData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/vehicle')
            .then(response => {
                setVehicleData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Vehicle data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteVehicle = (vehicleId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/vehicle/${vehicleId}`)
            .then(response => {
                toast.success("Vehicle deleted successfully");
                fetchVehicleData();
            })
            .catch(error => {
                console.error('Error deleting Vehicle:', error);
                toast.error("Error deleting Vehicle");
            })
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVehiclesData = vehicleData.filter(vehicle =>
        vehicle?.name && vehicle?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Vehicle Category</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/addnormalvehicles')}>Add Vehicle</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id=""
                                    placeholder='Search Vehicle'
                                    onChange={handleSearch}
                                    value={searchQuery}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>SR. No.</th>
                                    <th>Name</th>
                                    <th>Icon</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading Vehicles...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredVehiclesData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Vehicle not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredVehiclesData.map((Vehicle, index) => (
                                                <tr key={Vehicle.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{Vehicle.name}</td>
                                                    <td className='vehicle12'><img src={Vehicle.image} alt="" /></td>
                                                    <td className='vehicle12'>{Vehicle.type}</td>
                                                    <td className='vehicle3'>
                                                        <div className='vehicle'><p>Active</p></div>
                                                    </td>
                                                    <td>
                                                        <div className='service11'>
                                                            <div className='rider10' onClick={() => deleteVehicle(Vehicle._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/updatenormalvehicles/${Vehicle._id}`} className='sidebar-link' >
                                                                    <MdEdit color='#667085' size={20} />
                                                                    <p>Edit</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            vehicleData.map((Vehicle, index) => (
                                                <tr key={Vehicle.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{Vehicle.name}</td>
                                                    <td className='vehicle12'><img src={Vehicle.image} alt="" /></td>
                                                    <td className='vehicle12'>{Vehicle.type}</td>
                                                    <td className='vehicle3'>
                                                        <div className='vehicle'><p>Active</p></div>
                                                    </td>
                                                    <td>
                                                        <div className='service11'>
                                                            <div className='rider10' onClick={() => deleteVehicle(Vehicle._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/updatenormalvehicles/${Vehicle._id}`} className='sidebar-link' >
                                                                    <MdEdit color='#667085' size={20} />
                                                                    <p>Edit</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>
                                            ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllnormalVehicles)