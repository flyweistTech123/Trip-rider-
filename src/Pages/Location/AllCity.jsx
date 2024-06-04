import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LocatiolnType.css';
import Pagination from 'react-bootstrap/Pagination';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


import HOC from '../../Components/HOC/HOC';
import { debounce } from 'lodash';
import { useNavigate, Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";





const AllCity = () => {
    const navigate = useNavigate()
    const [cityData, setCityData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);



    const fetchCityData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/City/getAllCity/WithPaginate?page=${page}&limit=${limit}`, getAuthHeaders())
            .then(response => {
                setCityData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching City data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);


    useEffect(() => {
        fetchCityData();
    }, [limit, search, page]);


    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const getPageNumbers = () => {
        const maxVisiblePages = 5;
        let startPage, endPage;

        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const middlePage = Math.floor(maxVisiblePages / 2);
            if (page <= middlePage) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (page + middlePage >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = page - middlePage;
                endPage = page + middlePage;
            }
        }

        const pages = [];
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };



    const debouncedSearch = useCallback(
        debounce((query) => {
            if (query) {
                setLoading(true);
                axios.get(`${BaseUrl}api/v1/City/ByName/${query}`, getAuthHeaders())
                    .then(response => {
                        const data = response.data.data;
                        setCityData(Array.isArray(data) ? data : [data]);
                    })
                    .catch(error => {
                        console.error('Error fetching City data by name:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                fetchCityData();
            }
        }, 500),
        []
    );

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const deleteCity = (cityId) => {
        axios.delete(`${BaseUrl}api/v1/city/${cityId}`, getAuthHeaders())
            .then(response => {
                fetchCityData();
                toast.success("City deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting City:', error);
                toast.error("Error deleting City");
            });
    };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All City</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/alllocation')}>Back</button>
                            <button onClick={() => navigate('/addcity')}>Add City</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input
                                    type="search"
                                    placeholder='Search City'
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>City</th>
                                    <th>CountryCode</th>
                                    <th>StateCode</th>
                                    <th>Limit</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading city...</td>
                                    </tr>
                                ) : cityData.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>City not found</td>
                                    </tr>
                                ) : (
                                    cityData.map(city => (
                                        <tr key={city._id}>
                                            <td>{city?.city}</td>
                                            <td>{city?.countryCode}</td>
                                            <td>{city?.stateCode}</td>
                                            <td>{city?.limit}</td>
                                            <td>{city?.latitude}</td>
                                            <td>{city?.longitude}</td>
                                            <td style={{
                                                color:
                                                    city?.status === 'ACTIVE' ? '#609527' :
                                                        '#000'
                                            }}>
                                                {city?.status}
                                            </td>
                                            <td>
                                                <div className='rider9'>
                                                    <div className='rider10' onClick={() => deleteCity(city._id)}>
                                                        <RiDeleteBinLine color='#667085' size={20} />
                                                        <p>Delete</p>
                                                    </div>
                                                    <div className='rider10'>
                                                        <Link to={`/updatecity/${city._id}`} className='sidebar-link' >
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
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                        {getPageNumbers().map((number, index) => (
                            number === '...' ? (
                                <Pagination.Ellipsis key={index} />
                            ) : (
                                <Pagination.Item key={number} active={number === page} onClick={() => handlePageChange(number)}>
                                    {number}
                                </Pagination.Item>
                            )
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
                    </Pagination>
                </div>
            </div>
        </>
    );
}

export default HOC(AllCity);
