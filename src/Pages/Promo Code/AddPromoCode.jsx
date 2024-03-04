import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import './PromoCode.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





// import img from '../../Images/img5.png'


const AddPromoCode = () => {

    const [category, setCategory] = useState('');
    const [discount, setDiscount] = useState('');
    const [active, setActive] = useState('')

    const handlePostRequest = async () => {
        const data = {
            category: category,
            discountPer: discount,
            isDiscount: active,
        }


        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/category', data);
            const message = response.data.message;
            toast.success(message);

            // Reset state variables to clear input fields
            setCategory('');
            setDiscount('');
            setActive('');
            navigate('/allpromocode')
        } catch (error) {
            console.error('Error to Promo code:', error);
            toast.error('Error to add Promo code');
        }
    }


    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Add Promo code</h6>
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
                        <div className='outstationprice1'>
                            <p>Status</p>
                            <div className='outstationprice2'>
                                <div className='outstationprice3'>
                                    <input type="radio" name="active" value={true}  onChange={() => setActive(true)} />
                                    <p>Active</p>
                                </div>
                                <div className='outstationprice3'>
                                    <input type="radio" name="active" value= {false} onChange={() => setActive(false)} />
                                    <p>Not Active</p>
                                </div>
                            </div>

                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Category</label>
                                <input type="text" placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Discount</label>
                                <input type="number" placeholder='Enter Discount' value={discount} onChange={(e) => setDiscount(e.target.value)} />
                            </div>
                        </div>

                        <div className='promo1'>
                            <button onClick={() => navigate('/allpromocode')}>Cancel</button>
                            <button onClick={handlePostRequest}>Add Promo code</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddPromoCode)