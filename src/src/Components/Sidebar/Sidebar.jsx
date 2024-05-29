import React, { useMemo } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';





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
import img18 from '../../Images/img47.png'
import img19 from '../../Images/img48.png'
import img20 from '../../Images/img49.png'




const Sidebar = () => {

    const sidebarItems = [
        // { icon: img1, text: 'Dashboard', link: '/dashboard' },
        { icon: img2, text: 'All Users', link: '/users' },
        { icon: img3, text: 'All Drivers', link: '/drivers' },
        { icon: img20, text: 'All Drivers Earnings', link: '/earnings' },
        { icon: img20, text: 'All Earnings', link: '/allearning' },
        { icon: img4, text: 'All Vendors', link: '/vendors' },
        { icon: img5, text: 'Privileges', link: '/privileges' },
        { icon: img6, text: 'Push Notification', link: '/notification' },
        { icon: img7, text: 'Wallet Management', link: '/wallet_management' },
        { icon: img8, text: 'Payout Management', link: '/payout_management' },
        { icon: img9, text: 'Bookings', link: '/bookings' },
        // { icon: img12, text: 'All Referrals', link: '/all_referrals' },
        { icon: img10, text: 'Services', link: '/services' },
        { icon: img11, text: 'SOS Updates', link: '/sos' },
        { icon: img13, text: 'Update Banner', link: '/updatebanners' },
        { icon: img14, text: 'Promo Code', link: '/allpromocode' },
        { icon: img15, text: 'Live Chat', link: '/livechart' },
        { icon: img16, text: 'Location', link: '/alllocation' },
        { icon: img17, text: 'Pricing', link: '/pricing' },
        { icon: img14, text: 'Subscription Booking', link: '/settlebooking' },
        // { icon: img14, text: 'Admin', link: '/alladmin' },
        { icon: img14, text: 'Vehicle Types', link: '/vehicletype' },
        { icon: img14, text: 'Geofencing', link: '/geofencing_view' },
        { icon: img18, text: 'Terms and conditions', link: '/termsandconditions' },
        { icon: img19, text: 'Privacy policy', link: '/privacypolicy' },
    ];

    const cachedAdminData = localStorage.getItem('adminData');
    const adminData = JSON.parse(cachedAdminData);
    const role = localStorage.getItem('role');
    
    let permissionsArray = [];
    
    if (adminData && adminData.permissions) {
      permissionsArray = adminData.permissions;
    } else {
      console.log('Permissions array not found in adminData.');
    }
    
    // Include 'Dashboard' item in the sidebarItems array
    const filteredSidebarItems = [
      { icon: img1, text: 'Dashboard', link: '/dashboard' }, // Always include Dashboard
      ...(permissionsArray && role === 'superAdmin'
          ? sidebarItems // Show all items for superAdmin
          : sidebarItems.filter(item =>
              permissionsArray.some(permission => permission.name === item.text && permission.view)
          ))
    ];
    

    return (
        <>
            <div className='sidebar'>
                <div className='sidebar1'>
                    <div className='sidebar2'>
                        <img src={img} alt="" />
                    </div>

                    <div className='sidebar3'>
                        {filteredSidebarItems.map((item, index) => (
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

export default React.memo(Sidebar);