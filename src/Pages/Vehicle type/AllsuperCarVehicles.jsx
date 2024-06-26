import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import CustomPagination from '../../Components/Pagination/Pagination';


import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";



// import img from '../../Images/img5.png'



const AllsuperCarVehicles = () => {
    const navigate = useNavigate();
    const [supercarData, setSuperCarData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        fetchSuperCarData();
    }, [limit, search, page]);

    const fetchSuperCarData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/getSuperCarWithPaginate?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setSuperCarData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching Super Car data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);


    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setLoading(true);
    };

    const deleteSuperCar = (supercarId) => {
        axios.delete(`${BaseUrl}api/v1/SuperCar/${supercarId}`, getAuthHeaders())
            .then(response => {
                toast.success("Super Car deleted successfully");
                fetchSuperCarData();
            })
            .catch(error => {
                console.error('Error deleting Super Car:', error);
                toast.error("Error deleting Super Car");
            });
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVehiclesData = supercarData.filter(vehicle =>
        vehicle?.name && vehicle?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Super Car Category</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/vehicletype')}>Back</button>
                            <button onClick={() => navigate('/addsupercarvehicles')}>Add Super Car</button>
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
                                    <th>Super car Name</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Loading Super cars...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredVehiclesData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ color: "#000000", fontWeight: "600", fontSize: "18px" }}>Super cars not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredVehiclesData.map((supercar, index) => (
                                                <tr key={supercar.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{supercar?.name}</td>
                                                    <td><img src={supercar?.image} style={{ width: '50px' }} /></td>
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deleteSuperCar(supercar._id)}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                        <div className='rider10'>
                                                            <Link to={`/updatesupercarvehicles/${supercar._id}`} className='sidebar-link' >
                                                                <MdEdit color='#667085' size={20} />
                                                                <p>Edit</p>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :

                                            supercarData.map((supercar, index) => (
                                                <tr key={supercar.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{supercar?.name}</td>
                                                    <td><img src={supercar?.image} style={{ width: '50px' }} /></td>
                                                    <td className='rider9'>
                                                        <div className='rider10' onClick={() => deleteSuperCar(supercar._id)}>
                                                            <RiDeleteBinLine color='#667085' size={20} />
                                                            <p>Delete</p>
                                                        </div>
                                                        <div className='rider10'>
                                                            <Link to={`/updatesupercarvehicles/${supercar._id}`} className='sidebar-link' >
                                                                <MdEdit color='#667085' size={20} />
                                                                <p>Edit</p>
                                                            </Link>
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
                    <CustomPagination
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

export default HOC(AllsuperCarVehicles)