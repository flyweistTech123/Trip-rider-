import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PromoCode.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";



// import img from '../../Images/img5.png'



const AllPromoCode = () => {
    const navigate = useNavigate();
    const [promocodeData, setPromoCodeData] = useState([]);

    useEffect(() => {
        fetchPromoCodeData();
    }, []);

    const fetchPromoCodeData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/category')
            .then(response => {
                setPromoCodeData(response.data.category);
            })
            .catch(error => {
                console.error('Error fetching Promo code data:', error);
            });
    };

    const deletePromoCode = (promocodeId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/category/${promocodeId}`)
            .then(response => {
                // console.log('Rider deleted successfully');
                toast.success("Promo code deleted successfully");
                setPromoCodeData();
            })
            .catch(error => {
                console.error('Error deleting Promo code:', error);
                toast.error("Error deleting Promo code");
            });
    };


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Promo Code</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/addpromocode')}>Add Promo Code</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Promo Code' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>SR. No.</th>
                                    <th>Category</th>
                                    <th>Discount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promocodeData?.map((PromoCode, index) => (
                                    <tr key={PromoCode.id}>
                                        <td>{index + 1}</td>
                                        <td>{PromoCode.category}</td>
                                        <td className='vehicle12'>{PromoCode.discountPer}</td>
                                        <td className='vehicle3'>
                                            {PromoCode.isDiscount ? (
                                                <div className='vehicle'><p>Active</p></div>
                                            ) : (
                                                <div className='promo'><p>Not Active</p></div>
                                            )}

                                        </td>
                                        <td>
                                            <div className='service11'>
                                                <div className='rider10' onClick={() => deletePromoCode(PromoCode._id)}>
                                                    <RiDeleteBinLine color='#667085' size={20} />
                                                    <p>Delete</p>
                                                </div>
                                                <div className='rider10'>
                                                    <Link to={`/updatepromocode/${PromoCode._id}`} className='sidebar-link' >
                                                        <MdEdit color='#667085' size={20} />
                                                        <p>Edit</p>
                                                    </Link>
                                                </div>
                                            </div>

                                        </td>
                                        {/* <td>
                                            <div className='vehicle1'>
                                                <select name="" id="">
                                                    <option value="">Action</option>
                                                    <option value="">Edit</option>
                                                    <option value="">Inactive</option>
                                                </select>
                                            </div>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllPromoCode)