import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payout_Management.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";




// import img from '../../Images/img5.png'

const payoutData = [
    {
        id: 1,
        TransactionNo: "#RGS039292",
        TransferFrom: "Loreum Ipsum",
        FromAccount: "Loreum Ipsum",
        PaymentMethod: "Razorpay",
        Date: "26 Oct 2023",
        Time: "23 :45",
        Amount: 4000,
        Status: "Refunded"
    },
    {
        id: 2,
        TransactionNo: "#RGS039292",
        TransferFrom: "Loreum Ipsum",
        FromAccount: "Loreum Ipsum",
        PaymentMethod: "Razorpay",
        Date: "26 Oct 2023",
        Time: "23 :45",
        Amount: 4000,
        Status: "Refunded"
    },
    {
        id: 3,
        TransactionNo: "#RGS039292",
        TransferFrom: "Loreum Ipsum",
        FromAccount: "Loreum Ipsum",
        PaymentMethod: "Razorpay",
        Date: "26 Oct 2023",
        Time: "23 :45",
        Amount: 4000,
        Status: "N/A"
    },
];



const Payout_Management = () => {


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Payout Management</h6>
                        </div>

                        <div className='rider4'>
                            <button>Pay User</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction No.</th>
                                    <th>Transfer From</th>
                                    <th>From Account</th>
                                    <th>Payment Method</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payoutData.map(payout  => (
                                    <tr key={payout .id}>
                                        <td className='rider8'>{payout.TransactionNo}</td>
                                        <td>{payout.TransferFrom}</td>
                                        <td>{payout.FromAccount}</td>
                                        <td>{payout.PaymentMethod}</td>
                                        <td>{payout.Date}</td>
                                        <td>{payout.Time}</td>
                                        <td style={{ color: '#800000' }}>{payout.Amount}</td>
                                        <td style={{ color: payout.Status === 'Refunded' ? '#800000' : '#01BF6F' }}>{payout.Status}</td>
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

export default HOC(Payout_Management)