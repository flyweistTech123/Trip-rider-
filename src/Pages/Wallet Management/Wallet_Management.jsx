import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Wallet_Management.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";

import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';



const Wallet_Management = () => {
    const [walletdata, setWalletData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchWalletData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getAllWalletTransaction`, getAuthHeaders());
            setWalletData(response.data.data);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
        finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchWalletData();
    }, []);


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredWalletData = walletdata.filter(wallet =>
        wallet?.user?.name && wallet?.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                <input type="search" name="" id="" placeholder='Search' onChange={handleSearch} />
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

                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading wallet...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredWalletData.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>detail not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?

                                            filteredWalletData.map(Wallet => (
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
                                            :
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
