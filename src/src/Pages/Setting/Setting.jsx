import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Setting.css'
import HOC from '../../Components/HOC/HOC'
import { Link, Navigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const Setting = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    // Trip setting 
    const [admincommission, setAdminCommission] = useState('');
    const [discounttype, setDisCountType] = useState('');
    const [servicetax, setServiceTax] = useState('');
    const [driversearchradius, setDriverSearchRadius] = useState('');
    const [usercanschedulebookaftermin, setUserCanScheduleBookAfterMin] = useState('')
    const [minimumtimedriverfindinminutes, setMinimumTimeDriverFindInMinutes] = useState('');
    const [maximumtimefindinminutesdriverforregularride, setMaximumTimeFindInMinutesDriverForRegularRide] = useState('')


    const fetchtripsettingDetails = async () => {
        try {
            const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/commission`);
            const { adminCommission, disCountType, serviceTax, driverSearchRadius, userCanScheduleBookAfterMin, minimumTimeDriverFindInMinutes, maximumTimeFindInMinutesDriverForRegularRide } = response.data.data;
            setAdminCommission(adminCommission)
            setDisCountType(disCountType)
            setServiceTax(serviceTax)
            setDriverSearchRadius(driverSearchRadius)
            setUserCanScheduleBookAfterMin(userCanScheduleBookAfterMin)
            setMinimumTimeDriverFindInMinutes(minimumTimeDriverFindInMinutes)
            setMaximumTimeFindInMinutesDriverForRegularRide(maximumTimeFindInMinutesDriverForRegularRide)

        } catch (error) {
            console.error('Error fetching Trip setting details:', error);
        }
    };




    const handletrippostrequest = async () => {
        const data = {
            adminCommission: admincommission,
            disCountType: discounttype,
            serviceTax: servicetax,
            driverSearchRadius: driversearchradius,
            userCanScheduleBookAfterMin: usercanschedulebookaftermin,
            minimumTimeDriverFindInMinutes: minimumtimedriverfindinminutes,
            maximumTimeFindInMinutesDriverForRegularRide: maximumtimefindinminutesdriverforregularride,
        }

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/commission/add', data)
            toast.success("Trip Setting Updated successfully");
        } catch (error) {
            console.log('Error to update Trip setting:', error)
            toast.error("Error to update Trip setting")
        }
    }

    // walletSetting
    const [walletminimumamount, setWalletMinimumAmount] = useState('');
    const [walletminimumamounttoadd, setWalletMinimumAmountToAdd] = useState('');
    const [walletmaximumamounttoadd, setWalletMaximumAmountToAdd] = useState('');
    const [driverWalletMinimumAmountToGetOrder, setDriverWalletMinimumAmountToGetOrder] = useState('');

    const fetchWalletsettingDetails = async () => {
        try {
            const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/walletSetting`);
            const { walletMinimumAmount, walletMinimumAmountToAdd, walletMaximumAmountToAdd, driverWalletMinimumAmountToGetOrder } = response.data.data;
            setWalletMinimumAmount(walletMinimumAmount);
            setWalletMinimumAmountToAdd(walletMinimumAmountToAdd);
            setWalletMaximumAmountToAdd(walletMaximumAmountToAdd);
            setDriverWalletMinimumAmountToGetOrder(driverWalletMinimumAmountToGetOrder)
        } catch (error) {
            console.error('Error fetching Wallet setting details:', error);
        }
    };


    const handlewalletpostrequest = async () => {
        const data = {
            walletMinimumAmount: walletminimumamount,
            walletMinimumAmountToAdd: walletminimumamounttoadd,
            walletMaximumAmountToAdd: walletmaximumamounttoadd,
            driverWalletMinimumAmountToGetOrder: driverWalletMinimumAmountToGetOrder,
        }

        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/walletSetting/add', data)
            toast.success("wallet Setting Updated successfully");
        } catch (error) {
            console.log('Error to update wallet setting:', error)
            toast.error("Error to update wallet setting")
        }
    }




    // appSetting
    const [logo, setLogo] = useState('');
    const [favicon, setFavicon] = useState('');
    const [appname, setAppName] = useState('');
    const [currencyname, setCurrencyName] = useState('');
    const [countrycode, setCountryCode] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');



    const fetchAppsettingDetails = async () => {
        try {
            const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/appSetting`);
            const { logo, favicon, appName, currencyName, countryCode, latitude, longitude } = response.data.data;
            setLogo(logo);
            setFavicon(favicon);
            setAppName(appName);
            setCurrencyName(currencyName);
            setCountryCode(countryCode);
            setLatitude(latitude);
            setLongitude(longitude);
        } catch (error) {
            console.error('Error fetching App setting details:', error);
        }
    };


    const handleapppostrequest = async () => {
        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('favicon', favicon);
        formData.append('appName', appname);
        formData.append('currencyName', currencyname);
        formData.append('countryCode', countrycode);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/appSetting/add', formData)
            toast.success("App Setting Updated successfully");
        } catch (error) {
            console.log('Error to update App setting:', error)
            toast.error("Error to update App setting")
        }
    }



    // ReferralSetting
    const [referralfordriver, setReferralForDriver] = useState('');
    const [referralforuser, setReferralForUser] = useState('');



    const fetchReferralpsettingDetails = async () => {
        try {
            const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/referralSetting`);
            const { referralForDriver, referralForUser } = response.data.data;
            setReferralForDriver(referralForDriver);
            setReferralForUser(referralForUser)
        } catch (error) {
            console.error('Error fetching Referral setting details:', error);
        }
    };


    const handlereferralpostrequest = async () => {
        const data = {
            referralForDriver: referralfordriver,
            referralForUser: referralforuser,
        }
        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/referralSetting/add', data)
            toast.success("Referral Setting Updated successfully");
        } catch (error) {
            console.log('Error to update Referral setting:', error)
            toast.error("Error to update Referral setting")
        }
    }



    // MapSetting
    const [googlemapkeyforwebapp, setGoogleMapKeyForWebApp] = useState('');
    const [googlemapKeyfordistancematrix, setGoogleMapKeyForDistanceMatrix] = useState('');
    const [googlesheetId, setGoogleSheetId] = useState('')



    const fetchMapsettingDetails = async () => {
        try {
            const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/mapSetting`);
            const { googleMapKeyForWebApp, googleMapKeyForDistanceMatrix, googleSheetId } = response.data.data;
            setGoogleMapKeyForWebApp(googleMapKeyForWebApp);
            setGoogleMapKeyForDistanceMatrix(googleMapKeyForDistanceMatrix);
            setGoogleSheetId(googleSheetId)
        } catch (error) {
            console.error('Error fetching Map setting details:', error);
        }
    };


    const handlemappostrequest = async () => {
        const data = {
            googleMapKeyForWebApp: googlemapkeyforwebapp,
            googleMapKeyForDistanceMatrix: googlemapKeyfordistancematrix,
            googleSheetId: googlesheetId,
        }
        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/mapSetting/add', data)
            toast.success("Map Setting Updated successfully");
        } catch (error) {
            console.log('Error to update Map setting:', error)
            toast.error("Error to update Map setting")
        }
    }

    // EmergencySetting
    const [phone, setPhone] = useState('');
    const [phonetext, setPhoneText] = useState('');
    const [policenumber, setPoliceNumber] = useState('')
    const [policenumbertext, setPoliceNumberText] = useState('')
    const [ambulancenumber, setAmbulancenumber] = useState('')
    const [ambulanceNumbertext, setAmbulanceNumberText] = useState('')


    const fetchEmergencysettingDetails = async () => {
        try {
            const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/emergencyDetails`);
            const { phone, phoneText, policeNumber, policeNumberText, ambulanceNumber, ambulanceNumberText } = response.data.data;
            setPhone(phone);
            setPhoneText(phoneText);
            setPoliceNumber(policeNumber);
            setPoliceNumberText(policeNumberText);
            setAmbulancenumber(ambulanceNumber);
            setAmbulanceNumberText(ambulanceNumberText);
        } catch (error) {
            console.error('Error fetching Emergency setting details:', error);
        }
    };


    const handleemergencypostrequest = async () => {
        const data = {
            phone: phone,
            phoneText: phonetext,
            policeNumber: policenumber,
            policeNumberText:policenumbertext,
            ambulanceNumber:ambulancenumber,
            ambulanceNumbertext:ambulanceNumbertext,
        }
        try {
            const response = await axios.post('https://rajiv-cab-mu.vercel.app/api/v1/emergencyDetails/add', data)
            toast.success("Emergency Setting Updated successfully");
        } catch (error) {
            console.log('Error to update Emergency setting:', error)
            toast.error("Error to update Emergency setting")
        }
    }


    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const triggerFileInput1 = () => {
        document.getElementById('fileInput1').click();
    };


    useEffect(() => {
        fetchtripsettingDetails();
        fetchWalletsettingDetails();
        fetchAppsettingDetails();
        fetchReferralpsettingDetails();
        fetchMapsettingDetails();
        fetchEmergencysettingDetails();
    }, []);

    return (
        <>
            <div className='rider'>
                <div className='setting'>
                    <div className="setting1">
                        <div
                            className={step === 0 ? "setting2" : "setting3"}
                            onClick={() => setStep(0)}>
                            <p>Trip Settings</p>
                        </div>
                        <div
                            className={step === 1 ? "setting2" : "setting3"}
                            onClick={() => setStep(1)}>
                            <p>Wallet Settings</p>
                        </div>

                        <div
                            className={step === 2 ? "setting2" : "setting3"}
                            onClick={() => setStep(2)}>
                            <p>App Settings</p>
                        </div>
                        <div
                            className={step === 3 ? "setting2" : "setting3"}
                            onClick={() => setStep(3)}>
                            <p>Referral</p>
                        </div>
                        <div
                            className={step === 4 ? "setting2" : "setting3"}
                            onClick={() => setStep(4)}>
                            <p>Map Settings</p>
                        </div>
                        <div
                            className={step === 5 ? "setting2" : "setting3"}
                            onClick={() => setStep(5)}>
                            <p>Emergency Details</p>
                        </div>
                    </div>

                    <div>
                        <hr />
                    </div>


                    <div>
                        {step === 0 ? (
                            <div>
                                <div className='payuser'>
                                    <div className='payuser1'>
                                        <div className='payuser2'>
                                            <label htmlFor="">Service Tax</label>
                                            <input type="text" value={servicetax} onChange={(e) => setServiceTax(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Admin Commission Type</label>
                                            <select name="" id="" onChange={(e) => setDisCountType(e.target.value)}>
                                                <option name="PERCENTAGE" value="PERCENTAGE">PERCENTAGE</option>
                                                <option name="FLAT" value="FLAT" >FLAT</option>
                                            </select>
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Admin Commission</label>
                                            <input type="text" value={admincommission} onChange={(e) => setAdminCommission(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Driver Search Radius in Kilometers</label>
                                            <input type="text" value={driversearchradius} onChange={(e) => setDriverSearchRadius(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">User Can Schedule A Ride After “X” minutes</label>
                                            <input type="text" value={usercanschedulebookaftermin} onChange={(e) => setUserCanScheduleBookAfterMin(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Minimum time to find Drivers for schedule rides in minutes</label>
                                            <input type="text" value={minimumtimedriverfindinminutes} onChange={(e) => setMinimumTimeDriverFindInMinutes(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Maximum time for find Driver for Regular Rides</label>
                                            <input type="text" value={maximumtimefindinminutesdriverforregularride} onChange={(e) => setMaximumTimeFindInMinutesDriverForRegularRide(e.target.value)} />
                                        </div>
                                        <div className='setting4'>
                                            <button onClick={handletrippostrequest}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : step === 1 ? (
                            <div>
                                <div className='payuser'>
                                    <div className='payuser1'>
                                        <div className='payuser2'>
                                            <label htmlFor="">Wallet Minimum Amount</label>
                                            <input type="text" value={walletminimumamount} onChange={(e) => setWalletMinimumAmount(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Wallet Minimum Amount to Add</label>
                                            <input type="text" value={walletminimumamounttoadd} onChange={(e) => setWalletMinimumAmountToAdd(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Wallet Maximum Amount to Add</label>
                                            <input type="text" value={walletmaximumamounttoadd} onChange={(e) => setWalletMaximumAmountToAdd(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Driver Wallet Minimum Amount t Get An Order</label>
                                            <input type="text" value={driverWalletMinimumAmountToGetOrder} onChange={(e) => setDriverWalletMinimumAmountToGetOrder(e.target.value)} />
                                        </div>
                                        <div className='setting4'>
                                            <button onClick={handlewalletpostrequest} >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : step === 2 ? (
                            <div>
                                <div className='payuser'>
                                    <div className='payuser1'>

                                        <div className='setting5'>
                                            <div className='setting6'>
                                                <label htmlFor="">Logo</label>
                                                <div className='setting7' onClick={triggerFileInput}>
                                                    {logo ? (
                                                        <img src={logo instanceof File ? URL.createObjectURL(logo) : logo} alt="" />
                                                    ) : (
                                                        " "
                                                    )}
                                                </div>
                                                <button onClick={triggerFileInput}>Browse</button>
                                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setLogo(e.target.files[0])} />
                                            </div>

                                            <div className='setting6'>
                                                <label htmlFor="">Favicon</label>
                                                <div className='setting7' onClick={triggerFileInput1}>
                                                    {favicon ? (
                                                        <img src={favicon instanceof File ? URL.createObjectURL(favicon) : favicon} alt="" />
                                                    ) : (
                                                        " "
                                                    )}
                                                </div>
                                                <button onClick={triggerFileInput1}>Browse</button>
                                                <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={(e) => setFavicon(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">App Name</label>
                                            <input type="text" value={appname} onChange={(e) => setAppName(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Currency Code</label>
                                            <select name="" id="" onChange={(e) => setDisCountType(e.target.value)}>
                                                <option name="INR" value="INR">INR</option>
                                                <option name="INR" value="INR">INR</option>
                                            </select>
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Country Code</label>
                                            <input type="text" value={countrycode} onChange={(e) => setCountryCode(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Default Latitude</label>
                                            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Default Longitude</label>
                                            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                                        </div>
                                        <div className='setting4'>
                                            <button onClick={handleapppostrequest} >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : step === 3 ? (
                            <div>
                                <div className='payuser'>
                                    <div className='payuser1'>
                                        <div className='payuser2'>
                                            <label htmlFor="">Referral Commission Amount for User</label>
                                            <input type="text" value={referralforuser} onChange={(e) => setReferralForUser(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Referral Commission Amount for Driver</label>
                                            <input type="text" value={referralfordriver} onChange={(e) => setReferralForDriver(e.target.value)} />
                                        </div>
                                        <div className='setting4'>
                                            <button onClick={handlereferralpostrequest}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : step === 4 ? (
                            <div>
                                <div className='payuser'>
                                    <div className='payuser1'>
                                        <div className='payuser2'>
                                            <label htmlFor="">Google Map Key for Web App</label>
                                            <input type="text" value={googlemapkeyforwebapp} onChange={(e) => setGoogleMapKeyForWebApp(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Google Map Key for Distance Matrix</label>
                                            <input type="text" value={googlemapKeyfordistancematrix} onChange={(e) => setGoogleMapKeyForDistanceMatrix(e.target.value)} />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Google Sheet Id</label>
                                            <input type="text" value={googlesheetId} onChange={(e) => setGoogleSheetId(e.target.value)} />
                                        </div>
                                        <div className='setting4'>
                                            <button onClick={handlemappostrequest}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : step === 5 ? (
                            <div>
                                <div className='payuser'>
                                    <div className='payuser1'>
                                        <div className='setting8'>
                                            <h6>Emergency Contact Details</h6>
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Phone Call</label>
                                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Add text</label>
                                            <input type="text" value={phonetext} onChange={(e) => setPhoneText(e.target.value)}/>
                                        </div>
                                        <div>
                                            <hr />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Police Helpline Number</label>
                                            <input type="text"  value={policenumber} onChange={(e) => setPoliceNumber(e.target.value)}/>
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Add text</label>
                                            <input type="text"  value={policenumbertext} onChange={(e) => setPoliceNumberText(e.target.value)}/>
                                        </div>
                                        <div>
                                            <hr />
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Ambulance Helpline Number</label>
                                            <input type="text"  value={ambulancenumber} onChange={(e) => setAmbulancenumber(e.target.value)}/>
                                        </div>
                                        <div className='payuser2'>
                                            <label htmlFor="">Add text</label>
                                            <input type="text" value={ambulanceNumbertext} onChange={(e) => setAmbulanceNumberText(e.target.value)}/>
                                        </div>
                                        <div className='setting4'>
                                            <button onClick={handleemergencypostrequest}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Setting);
