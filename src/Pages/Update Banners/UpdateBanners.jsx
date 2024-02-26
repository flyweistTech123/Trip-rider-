import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateBanners.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";


import img from '../../Images/img40.png'
import img1 from '../../Images/img41.png'
import img2 from '../../Images/img42.png'
import img3 from '../../Images/img43.png'

const UpdateBanners = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Banner</h6>
                        </div>

                        <div className='rider4'>
                            <div className='services'>
                                <p>Disable</p>
                                <label className="services1">
                                    <input type="checkbox" />
                                    <div class="services2"></div>
                                </label>

                            </div>


                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>

                    <div className='banner'>
                        <div className='banner1'>
                            <p>Current Banners</p>
                            <div className='banner2'>
                                <img src={img} alt="" />
                                <img src={img1} alt="" />
                                <img src={img2} alt="" />
                            </div>
                        </div>

                        <div className='banner3'>
                            <p>Upload New Banners</p>

                            <div className='banner4'>
                                <div className='banner5'>
                                    <img src={img3} alt="" />
                                </div>
                                <p>Drag and drop images here , or click to add image </p>
                                <button>Add Images</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdateBanners)