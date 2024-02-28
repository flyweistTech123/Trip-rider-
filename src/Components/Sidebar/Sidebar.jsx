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
import img1 from '../../Images/img10.png'
import img2 from '../../Images/img11.png'
import img3 from '../../Images/img12.png'
import img4 from '../../Images/img13.png'
import img5 from '../../Images/img14.png'
import img6 from '../../Images/img15.png'
import img7 from '../../Images/img16.png'
import img8 from '../../Images/img17.png'
import img9 from '../../Images/img18.png'
import img10 from '../../Images/img19.png'
import img11 from '../../Images/img20.png'
import img12 from '../../Images/img21.png'
import img13 from '../../Images/img22.png'
import img14 from '../../Images/img23.png'
import img15 from '../../Images/img24.png'
import img16 from '../../Images/img25.png'
import img17 from '../../Images/img26.png'




const Sidebar = () => {

    const sidebarItems = [
        { icon: img1, text: 'Dashboard', link: '/dashboard' },
        { icon: img2, text: 'All Riders', link: '/riders' },
        { icon: img3, text: 'All Drivers', link: '/drivers' },
        { icon: img4, text: 'All Vendors', link: '/vendors' },
        { icon: img5, text: 'Privileges' },
        { icon: img6, text: 'Push Notification' },
        { icon: img7, text: 'Wallet Management', link: '/wallet_management' },
        { icon: img8, text: 'Payout Management' , link: '/payout_management' },
        { icon: img9, text: 'All Bookings' , link: '/bookings'},
        { icon: img12, text: 'All Referrals' , link: '/all_referrals' },
        { icon: img10, text: 'Services', link: '/services' },
        { icon: img11, text: 'SOS Updates' },
        { icon: img13, text: 'Update Banner' , link: '/updatebanners'},
        { icon: img14, text: 'Promo Code' },
        { icon: img15, text: 'Live Chat' },
        { icon: img16, text: 'Location' },
        { icon: img17, text: 'Pricing' , link: '/pricing'},
        { icon: img14, text: 'Subscription Booking ' },
        { icon: img14, text: 'Service Location' },
        { icon: img14, text: 'Manage Owners' },
        { icon: img14, text: 'Admin' },
        { icon: img14, text: 'Vehicle Types' , link: '/vehicletype' },
        { icon: img14, text: 'Master Data' },
        { icon: img14, text: 'Geofencing' },
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
                                    <div className='sidebar5'><img src={item.icon} alt="" /></div>
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