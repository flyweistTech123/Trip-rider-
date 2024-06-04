import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';



// import img from '../../Images/img5.png'



const AllnormalVehicles = () => {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchVehicleData();
    }, [limit, search, page]);

    const fetchVehicleData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/getVehicleWithPaginate?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setVehicleData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching Vehicle data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);


    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }



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
                            <button onClick={() => navigate('/vehicletype')}>Back</button>
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

                <div className='rider_details555'>
                    <Pagination >
                        <Pagination.First onClick={() => handlePageChange(1)} />
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item key={number + 1} active={number + 1 === page} onClick={() => handlePageChange(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default HOC(AllnormalVehicles)