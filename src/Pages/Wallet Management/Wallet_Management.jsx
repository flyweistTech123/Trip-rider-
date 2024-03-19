import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Wallet_Management.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";


const Wallet_Management = () => {
    const [walletdata, setWalletData] = useState([]);

    const fetchWalletData = async () => {
        try {
            const response = await axios.get('https://rajiv-cab-mu.vercel.app/api/v1/getAllWalletTransaction');
            setWalletData(response.data.data);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };

    useEffect(() => {
        fetchWalletData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return `${formattedDate} `;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);


        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedTime = `${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}${ampm}`;

        // Combine date and time
        return `${formattedTime} `;
    };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Wallet Management</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Mode</th>
                                    <th>Cash In</th>
                                    <th>Wallet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {walletdata && walletdata.length > 0 ? (
                                    walletdata.map(Wallet => (
                                        <tr key={Wallet.id}>
                                            <td className='rider8'>{Wallet?.id}</td>
                                            <td>{Wallet?.user?.name}</td>
                                            <td>{formatDate(Wallet.date)}</td>
                                            <td>{formatTime(Wallet.date)}</td>
                                            <td>{Wallet.paymentMode}</td>
                                            <td style={{ color: '#F52D56' }}>{Wallet.amount}</td>
                                            <td>{Wallet?.user?.wallet}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Wallet_Management);
