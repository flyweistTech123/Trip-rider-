import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './UpdateBanners.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";


import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

import img3 from '../../Images/img43.png'

const UpdateBanners = () => {
    const [modalShow, setModalShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const navigate = useNavigate()
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        fetchDriverData();
    }, []);

    const fetchDriverData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/banner')
            .then(response => {
                setBannerData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching driver data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBannerData = bannerData.filter(banner =>
        banner.name && banner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const deleteDriver = (driverId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/banner/${driverId}`)
            .then(response => {
                fetchDriverData();
                toast.success("Banner deleted successfully");
            })
            .catch(error => {
                console.error('Error delete banner:', error);
                toast.error("Error Delete Banner");
            });
    };


    // add banner 

    const [name, setName] = useState('');
    const [bannerImage, setBanneImage] = useState("");

    const handlepostBanner = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', bannerImage);

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/banner', formData)
            toast.success("Banner Added successfully");
            setName('')
            setBanneImage(null)
            handleClose()
        } catch (error) {
            console.error('Error Adding Service:', error);
            toast.error("Error Adding Banner");
        }
    }
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Banner</h6>
                        </div>

                        <div className='rider4'>
                            {/* <div className='services'>
                                <p>Disable</p>
                                <label className="services1">
                                    <input type="checkbox" />
                                    <div class="services2"></div>
                                </label>

                            </div> */}


                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Banner'
                                    value={searchQuery} onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='banner'>
                        {loading ? (
                            <tr>
                                <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading banners...</td>
                            </tr>
                        ) :
                            searchQuery && filteredBannerData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Banner not found</td>
                                </tr>
                            ) : (
                                searchQuery
                                    ?
                                    <div className='banner1'>
                                        <p>Search Banners</p>
                                        <div className='banner212'>
                                            {filteredBannerData.map(banner => (
                                                <div className='banner2'>
                                                    <div className='banner10'>
                                                        <img src={banner.image} alt={banner.name} />
                                                    </div>
                                                    <div className='banner253'>
                                                        <IoIosCloseCircle size={25} color='red' onClick={() => deleteDriver(banner._id)} />
                                                    </div>
                                                    <h6>{banner.name}</h6>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    :
                                    <div className='banner1'>
                                        <p>Current Banners</p>
                                        <div className='banner212'>
                                            {bannerData.map(banner => (
                                                <div className='banner2'>
                                                    <div className='banner10'>
                                                        <img src={banner.image} alt={banner.name} />
                                                    </div>
                                                    <div className='banner253'>
                                                        <IoIosCloseCircle size={25} color='red' onClick={() => deleteDriver(banner._id)} />
                                                    </div>
                                                    <h6>{banner.name}</h6>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                            )}

                        <div className='banner3'>
                            <p>Upload New Banners</p>

                            <div className='banner4'>
                                <div className='banner5'>
                                    <img src={img3} alt="" />
                                </div>
                                <p>Drag and drop images here , or click to add image </p>
                                <button onClick={handleShow}>Add Banner</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={modalShow} onHide={handleClose} className="custom-modal">
                <Modal.Header className="custom-modal-header" closeButton>
                    <Modal.Title>Add Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='banner6'>
                        <div className='banner7'>
                            <div className='banner8'>
                                <label htmlFor="">Banner Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='banner8'>
                                <label htmlFor="">Banner Image</label>
                                <input type="file" onChange={(e) => setBanneImage(e.target.files[0])} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <div className='banner9'>
                        <button onClick={handlepostBanner}>Add Banner</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default HOC(UpdateBanners)