import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import './PromoCode.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';





// import img from '../../Images/img5.png'


const UpdatePromoCode = () => {
    const { id } = useParams();
    const [category, setCategory] = useState('');
    const [discount, setDiscount] = useState('');
    const [active, setActive] = useState('')


    useEffect(() => {
        const fetchPromocodeDetails = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/category/${id}`, getAuthHeaders());
                const { category, discountPer, isDiscount } = response.data.data;
                setCategory(category);
                setDiscount(discountPer);
                setActive(isDiscount);
            } catch (error) {
                console.error('Error fetching Promo code details:', error);
            }
        };
        fetchPromocodeDetails();
    }, [id]);
    const handlePutRequest = async () => {
        const data = {
            category: category,
            discountPer: discount,
            isDiscount: active,
        }


        try {
            const response = await axios.put(`${BaseUrl}api/v1/category/${id}`, data, getAuthHeaders());
            toast.success("Promo code Updated successfully");
            navigate('/allpromocode');
        } catch (error) {
            console.error('Error updating Promo code:', error);
            toast.error("Error updating Promo code");
        }
    }

    const handleActiveChange = (event) => {
        setActive(event.target.value === "true"); // Convert the string value to boolean
    }


    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Update Promo code</h6>
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
                                    <input type="radio" name="active" value="true" checked={active === true} onChange={handleActiveChange} />
                                    <p>Active</p>
                                </div>
                                <div className='outstationprice3'>
                                    <input type="radio" name="active" value="false" checked={active === false} onChange={handleActiveChange} />
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
                            <button onClick={handlePutRequest}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UpdatePromoCode)