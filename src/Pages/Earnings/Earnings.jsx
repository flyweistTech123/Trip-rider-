import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Earnings.css'
import HOC from '../../Components/HOC/HOC'


import { IoSearch } from "react-icons/io5";


const Earnings = () => {
    const [earningdata, setEarningData] = useState([]);

    const fetchEarningData = async () => {
        try {
            const response = await axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/all/driver');
            setEarningData(response?.data?.category);
        } catch (error) {
            console.error('Error fetching Earning data:', error);
        }
    };

    useEffect(() => {
        fetchEarningData();
    }, []);




    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Earnings</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search admin' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Wallet</th>
                                    <th>Cash In Hand</th>
                                    <th>Admin Cash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earningdata.map(earn => (
                                    <tr key={earn.id}>
                                        <td className='rider8'>
                                            <img src={earn.profilePicture}  style={{width:"50px"}} />
                                            {earn.name}
                                        </td>
                                        <td>{earn.email}</td>
                                        <td>{earn.mobileNumber}</td>
                                        <td>₹ {earn.wallet}</td>
                                        <td>₹ {earn.cashInHand}</td>
                                        <td>₹ {earn.adminCash}</td>
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

export default HOC(Earnings);
