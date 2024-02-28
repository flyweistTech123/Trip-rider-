import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'
import img from '../../Images/img44.png'
import img1 from '../../Images/img45.png'
import img2 from '../../Images/img46.png'

import { IoSearch } from "react-icons/io5";




// import img from '../../Images/img5.png'

const VehicleData = [
    {
        id: 1,
        SRno: 1,
        Name: "Auto",
        Icon: img,
    },
    {
        id: 2,
        SRno: 2,
        Name: "Mini",
        Icon: img1,
    },
    {
        id: 3,
        SRno: 3,
        Name: "Ambulance",
        Icon: img2,
    },
];



const Vehicletype = () => {


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Vehicle Category</h6>
                        </div>

                        <div className='rider4'>
                            <button>Add Type</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search vehicler' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>SR. No.</th>
                                    <th>Name</th>
                                    <th>Icon</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {VehicleData.map(Vehicle => (
                                    <tr key={Vehicle.id}>
                                        <td>{Vehicle.SRno}</td>
                                        <td>{Vehicle.Name}</td>
                                        <td><img src={Vehicle.Icon} alt="" /></td>
                                        <td className='vehicle3'>
                                            <div className='vehicle'><p>Active</p></div>
                                        </td>
                                        <td className='vehicle1'>
                                            <select name="" id="">
                                                <option value="">Action</option>
                                                <option value="">Edit</option>
                                                <option value="">Inactive</option>
                                            </select>
                                        </td>
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

export default HOC(Vehicletype)