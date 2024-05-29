import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './All_Referrals.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";




// import img from '../../Images/img5.png'

const ReferData = [
    {
        id: 1,
        ReferID: "#039292",
        ReferTo: "Loreum Ipsum",
        ReferBy: "Loreum Ipsum",
        ReferPoints: "30 Z Points",
        Date: "29-Nov 2023",
        Status: "Recieved"
    },
    {
        id: 2,
        ReferID: "#039292",
        ReferTo: "Loreum Ipsum",
        ReferBy: "Loreum Ipsum",
        ReferPoints: "30 Z Points",
        Date: "29-Nov 2023",
        Status: "Recieved"
    },
    {
        id: 3,
        ReferID: "#039292",
        ReferTo: "Loreum Ipsum",
        ReferBy: "Loreum Ipsum",
        ReferPoints: "30 Z Points",
        Date: "29-Nov 2023",
        Status: "Recieved"
    },
];



const All_Referrals = () => {


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Referrals</h6>
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
                                    <th>Refer ID</th>
                                    <th>Refer To</th>
                                    <th>Refer By</th>
                                    <th>Refer Points</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ReferData.map(Refer  => (
                                    <tr key={Refer .id}>
                                        <td className='rider8'>{Refer.ReferID}</td>
                                        <td>{Refer.ReferTo}</td>
                                        <td>{Refer.ReferBy}</td>
                                        <td>{Refer.ReferPoints}</td>
                                        <td>{Refer.Date}</td>
                                        <td style={{ color: Refer.Status === 'Recieved' ? '#C3052C' : '#01BF6F' }}>{Refer.Status}</td>
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

export default HOC(All_Referrals)