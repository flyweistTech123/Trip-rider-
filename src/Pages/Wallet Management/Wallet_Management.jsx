import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Wallet_Management.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";




// import img from '../../Images/img5.png'

const WalletData = [
    {
        id: 1,
        Transactionid: "#SGSV039292",
        Date: "26/10/2023",
        From: "Qashwah",
        To: "Mukesh Raj",
        Mode: "UPI",
        Cashin: 850,
        CashOut: 4000,
        Balance: 4850,
        Status: "Refunded"
    },
    {
        id: 2,
        Transactionid: "#SGSV039292",
        Date: "26/10/2023",
        From: "Qashwah",
        To: "Mukesh Raj",
        Mode: "UPI",
        Cashin: 850,
        CashOut: 4000,
        Balance: 4850,
        Status: "Refunded"
    },
    {
        id: 3,
        Transactionid: "#SGSV039292",
        Date: "26/10/2023",
        From: "Qashwah",
        To: "Mukesh Raj",
        Mode: "UPI",
        Cashin: 850,
        CashOut: 4000,
        Balance: 4850,
        Status: "Completed"
    },
];



const Wallet_Management = () => {


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Wallet Management</h6>
                        </div>

                        <div className='rider4'>
                            <button>Add Driver</button>
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
                                    <th>Transaction ID</th>
                                    <th>Date</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Mode</th>
                                    <th>Cash In</th>
                                    <th>Cash Out</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {WalletData.map(Wallet  => (
                                    <tr key={Wallet .id}>
                                        <td className='rider8'>{Wallet.Transactionid}</td>
                                        <td>{Wallet.Date}</td>
                                        <td style={{ color: '#F52D56' }}>{Wallet.From}</td>
                                        <td>{Wallet.To}</td>
                                        <td>{Wallet.Mode}</td>
                                        <td style={{ color: '#F52D56' }}>{Wallet.Cashin}</td>
                                        <td>{Wallet.CashOut}</td>
                                        <td>{Wallet.Balance}</td>
                                        <td style={{ color: Wallet.Status === 'Refunded' ? '#F52D56' : 'green' }}>{Wallet.Status}</td>
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

export default HOC(Wallet_Management)