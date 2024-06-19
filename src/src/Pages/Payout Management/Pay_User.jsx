import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Payout_Management.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate, useParams } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';
import img3 from '../../Images/img43.png';


const Pay_User = () => {
    const { id } = useParams();
    const [username, setUserName] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [message, setMessage] = useState('')
    const [upiId, setUPIID] = useState('');
    const [accountnumber, setAccountNumber] = useState('');
    const [ifsc, setIFSC] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');


    useEffect(() => {
        const fetchPayoutDetails = async () => {
            try {
                const response = await axios.get(`https://rajiv-cab-mu.vercel.app/api/v1/getPayoutRefundTransactionById/${id}`);
                const { name, accountNumber, ifsc, upiId, mobileNumber, message, status, paymentMethod, amount } = response.data.data;
                setUserName(name);
                setMobileNumber(mobileNumber);
                setMessage(message);
                setUPIID(upiId);
                setAccountNumber(accountNumber)
                setIFSC(ifsc);
                setStatus(status);
                setPaymentMethod(paymentMethod);
                setAmount(amount);
            } catch (error) {
                console.error('Error fetching payout details:', error);
            }
        };
        fetchPayoutDetails();
    }, [id]);


    const handlePutRequest = async () => {
        const formData = new FormData();
        formData.append('status', status)
        formData.append('image', image);

        try {
            const response = await axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/withdrawApprove/${id}`, formData)
            toast.success("Payout status Updated successfully");
            navigate('/payout_management')
        } catch (error) {
            console.log('Error to updating Payout status:', error)
            toast.error("Error to updating Payout status")
        }
    }


    const navigate = useNavigate();

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };



    return (
        <>
            <div className='rider'>
                <div className='payusercotainer'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Pay User</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/refundtransaction')}>Refund list</button>
                            <button onClick={() => navigate('/payout_management')}>Payout list</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>
                    <div className='payuser'>
                        <div className='payuser1'>
                            <div className='payuser2'>
                                <label htmlFor="">User Name</label>
                                <input type="text" value={username} />
                            </div>
                            <div className='payuser2'>
                                <label htmlFor="">Mobile Number</label>
                                <input type="text" value={mobilenumber} />
                            </div>
                            <div className='payuser2'>
                                <label htmlFor="">UPI ID</label>
                                <input type="text" value={upiId} />
                            </div>
                            <div className='payuser2'>
                                <label htmlFor="">Account Number</label>
                                <input type="text" value={accountnumber} />
                            </div>
                            {/* <div className='payuser2'>
                                <label htmlFor="">Accountant Name</label>
                                <input type="text" />
                            </div>
                            <div className='payuser2'>
                                <label htmlFor="">Branch</label>
                                <input type="text" />
                            </div> */}
                            <div className='payuser2'>
                                <label htmlFor="">IFSC Code</label>
                                <input type="text" value={ifsc} />
                            </div>
                            <div className='payuser2'>
                                <label htmlFor="">Amount To Pay</label>
                                <input type="text" value={amount} />
                            </div>

                            <div className='outstationprice1'>
                                <p>Status</p>
                                <div className='outstationprice2'>
                                    <div className='outstationprice3'>
                                        <input type="radio" name="status" value="PAID" checked={status === "PAID"} onChange={() => setStatus("PAID")} />
                                        <p>PAID</p>
                                    </div>
                                    <div className='outstationprice3'>
                                        <input type="radio" name="status" value="PENDING" checked={status === "PENDING"} onChange={() => setStatus("PENDING")} />
                                        <p>PENDING</p>
                                    </div>
                                    <div className='outstationprice3'>
                                        <input type="radio" name="status" value="FAILED" checked={status === "FAILED"} onChange={() => setStatus("FAILED")} />
                                        <p>FAILED</p>
                                    </div>
                                </div>
                            </div>

                            <div className='payuser2'>
                                <label htmlFor="">Upload Payment Image</label>
                                <div className='service7'  onClick={triggerFileInput}>
                                    <div className='vehicle14'>
                                        {image ? (
                                            <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="" />
                                        ) : (
                                            <img src={img3} alt="" />
                                        )}
                                    </div>
                                    <p>Drag and drop images here, or click to add image</p>
                                    <button>Add Images</button>
                                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            </div>

                            <div className='payuser3'>
                                <button onClick={handlePutRequest}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Pay_User);
