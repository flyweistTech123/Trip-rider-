import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './LiveChart.css'
import HOC from '../../Components/HOC/HOC'
import { collection, query, orderBy, getDocs, limit, addDoc } from 'firebase/firestore';
import { db, auth } from "../../Components/Firebase/Firebase";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



// import plus from '../../Images/Vector.png'
import send from '../../Images/send.png'
import img2 from '../../Images/user.webp'


import { IoIosArrowDown } from "react-icons/io";



const LiveChartWithDriver = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selecteddriver, setSelectedDriver] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [totalNewMessages, setTotalNewMessages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);


    const messageContainerRef = useRef(null);


    useEffect(() => {
        if (selecteddriver) {
            fetchMessages();
        }
        scrollToBottom();
    }, [selecteddriver, messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        fetchDriverData();
        fetchAdminData();
    }, []);


    useEffect(() => {
        const totalNewMsg = messages.filter(msg => !msg.read).length;
        setTotalNewMessages(totalNewMsg);
    }, [messages]);

    const fetchAdminData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/me`, getAuthHeaders())
            const AdminName = response.data.data.name;
            const AdminImage = response.data.data.profilePicture;
            setName(AdminName);
            setImage(AdminImage);
        } catch (error) {
            console.error('Error fetching Admin data:', error);
        }
    };

    const fetchMessages = async () => {
        console.log('boss')
        try {
            if (!selecteddriver || !selecteddriver._id) return;
            const messagesRef = collection(db, 'chatwithadmin', selecteddriver._id, 'messages');
            const q = query(messagesRef, orderBy('timestamp', 'asc'));
            const querySnapshot = await getDocs(q);

            const allMessages = [];
            querySnapshot.forEach(doc => {
                allMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(allMessages);
            console.log("hello", allMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchDriverData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/user`, getAuthHeaders());
            const usersData = response.data.category;
            const usersWithLastMessage = await Promise.all(usersData.map(async driver => {
                const messagesRef = collection(db, 'chatwithadmin', driver._id, 'messages');
                const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
                const querySnapshot = await getDocs(q);
                const lastMessageDoc = querySnapshot.docs[0];
                const lastMessage = lastMessageDoc ? lastMessageDoc.data().message : ''; // Get last message or empty string if no message
                return { ...driver, lastMessage };
            }));

            setDrivers(usersWithLastMessage);
        } catch (error) {
            console.error('Error fetching rider data:', error);
        }
        finally {
            setLoading(false);
        };
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredDriverData = drivers.filter(driver =>
        driver.name && driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserClick = (driver) => {
        setSelectedDriver(driver);
    };


    const handleSendMessage = async () => {
        if (!selecteddriver || !newMessage.trim()) return;

        try {
            // Add the new message to Firebase
            const messagesRef = collection(db, 'chatwithadmin', selecteddriver._id, 'messages');
            const newMessageDoc = {
                message: newMessage,
                type: 'admin',
                image: image,
                name: name,
                timestamp: new Date()
            };
            await addDoc(messagesRef, newMessageDoc);

            setMessages(prevMessages => [newMessageDoc, ...prevMessages]);

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };






    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Live Chat With Driver</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/livechart')}>Chat with user</button>
                        </div>
                    </div>

                    <div className='livechart'>
                        <div className='livechart1'>
                            <div className='livechart2'>
                                <div className='livechart3'>
                                    <h5>Messages</h5>
                                    <IoIosArrowDown color='#000000' size={20} />
                                    <p>{totalNewMessages}</p>
                                </div>

                                {/* <div className='livechart4'>
                                    <img src={plus} alt="" />
                                </div> */}
                            </div>

                            <div className='livechart6'>
                                <hr />
                            </div>

                            <div className='livechart5'>
                                <input type="search" placeholder='Search driver'
                                    onChange={handleSearch}
                                    value={searchQuery}
                                />
                            </div>


                            <div className='livechart6' >
                                {loading ? (
                                    <tr>
                                        <td style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading drivers...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredDriverData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Driver not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredDriverData.map(driver => (
                                                <div className='livechart7' key={driver.id} onClick={() => handleUserClick(driver)}>
                                                    <div className='livechart8'>
                                                        <div className='livechart852'>
                                                            <img src={driver?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                        </div>
                                                        <div className='livechart9'>
                                                            <h6>{driver.name}</h6>
                                                            <p>{driver.lastMessage}<span>🔥</span></p>
                                                        </div>
                                                    </div>
                                                    <div className='livechart10'>
                                                        <p>12m</p>
                                                    </div>
                                                </div>
                                            ))
                                            : drivers.map(driver => (
                                                <div className='livechart7' key={driver?.id} onClick={() => handleUserClick(driver)}>
                                                    <div className='livechart8'>
                                                        <div className='livechart852'>
                                                            <img src={driver?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                        </div>
                                                        <div className='livechart9'>
                                                            <h6>{driver?.name || "User"}</h6>
                                                            <p>{driver?.lastMessage}</p>
                                                            {console.log(driver?.name)}
                                                        </div>
                                                    </div>
                                                    <div className='livechart10'>
                                                        <p>12m</p>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                            </div>

                        </div>

                        <div className='livechart11'>
                            {messages.length === 0 || !selecteddriver ? (
                                <div className='no-messages'>
                                    <h6> Please select a driver to view messages.</h6>
                                </div>
                            ) : (
                                <div className='livechart12'>
                                    {selecteddriver && (
                                        <div className='livechart13'>
                                            <div className='livechart14'>
                                                <img src={selecteddriver?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                            </div>
                                            <div className='livechart15'>
                                                <h6>{selecteddriver.name}</h6>
                                            </div>
                                        </div>
                                    )}



                                    <div className='livechart18' ref={messageContainerRef}>
                                        {messages.map(message => (
                                            <div className={`${message.type === 'driver' ? 'livechart19' : 'livechart24'}`} key={message.id}>
                                                {message.type === 'driver' ? (
                                                    <div className='livechart20'>
                                                        <img src={message.image} alt="" />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className='livechart21'>
                                                    <div className={`${message.type === 'driver' ? 'livechart22' : 'livechart23'}`}><p>{message.message}</p></div>
                                                </div>
                                                {message.type === 'admin' ? (
                                                    <div className='livechart20'>
                                                        <img src={message.image} alt="" />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        ))
                                        }
                                    </div>

                                    <div className='livechart25'>
                                        <div className='livechart28'>
                                            <input
                                                type="text"
                                                placeholder='Type a message'
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                            />
                                            <img src={send} alt="" onClick={handleSendMessage} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default HOC(LiveChartWithDriver)