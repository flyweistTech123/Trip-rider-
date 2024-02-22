import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaRegHandshake } from "react-icons/fa6";
import { TbNotification } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";
import { BsListCheck } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa6";
import { GoCrossReference } from "react-icons/go";
import { GrServices } from "react-icons/gr";
import { TbNotes } from "react-icons/tb";
import { MdWeb } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { BsChatRightText } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { BiSolidCoupon } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";



import img from '../../Images/img4.png'



const Sidebar = () => {

    const sidebarItems = [
        { icon: <MdOutlineDashboardCustomize />, text: 'Dashboard', link: '/dashboard' },
        { icon: <FiUsers />, text: 'All Riders', link: '/riders' },
        { icon: <FaRegHandshake />, text: 'All Drivers', link: '/drivers' },
        { icon: <FaShop />, text: 'All Vendors', link: '/vendors' },
        { icon: <FaCarSide />, text: 'Privileges' },
        { icon: <TbNotification />, text: 'Push Notification' },
        { icon: <LuWallet />, text: 'Wallet Management' },
        { icon: <BsListCheck />, text: 'Payout Management' },
        { icon: <FaRegCalendar />, text: 'All Bookings' },
        { icon: <GoCrossReference />, text: 'All Referrals' },
        { icon: <GrServices />, text: 'Services' },
        { icon: <TbNotes />, text: 'SOS Updates' },
        { icon: <MdWeb />, text: 'Update Banner' },
        { icon: <BiSolidDiscount />, text: 'Promo Code' },
        { icon: <BsChatRightText />, text: 'Live Chat' },
        { icon: <IoLocation />, text: 'Location' },
        { icon: <TbCoinRupeeFilled />, text: 'Pricing' },
        { icon: <BiSolidCoupon />, text: 'Subscription Booking ' },
        { icon: <BiSolidCoupon />, text: 'Service Location' },
        { icon: <BiSolidCoupon />, text: 'Manage Owners' },
        { icon: <BiSolidCoupon />, text: 'Admin' },
        { icon: <BiSolidCoupon />, text: 'Vehicle Types' },
        { icon: <BiSolidCoupon />, text: 'Master Data' },
        { icon: <BiSolidCoupon />, text: 'Geofencing' },
    ];

    return (
        <>
            <div className='sidebar'>
                <div className='sidebar1'>
                    <div className='sidebar2'>
                        <img src={img} alt="" />
                    </div>

                    <div className='sidebar3'>
                        {sidebarItems.map((item, index) => (
                            <Link to={item.link} key={index} className='sidebar-link'>
                                <div className='sidebar4'>
                                    <div className='sidebar5'>{item.icon}</div>
                                    <p>{item.text}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar