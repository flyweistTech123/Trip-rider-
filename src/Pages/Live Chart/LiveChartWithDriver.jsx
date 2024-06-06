import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './LiveChart.css'
import HOC from '../../Components/HOC/HOC'
import { collection, query, orderBy, getDocs, limit, addDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from "../../Components/Firebase/Firebase";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CustomPagination from '../../Components/Pagination/Pagination';


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
    const [limit1, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);


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
    }, [limit1, search, page]);


    // useEffect(() => {
    //     const totalNewMsg = messages.filter(msg => !msg.read).length;
    //     setTotalNewMessages(totalNewMsg);
    // }, [messages]);


    useEffect(() => {
        const totalNewMsg = messages.filter(msg => !msg.read).length;
        setTotalNewMessages(totalNewMsg);
        const sortedDrivers = [...drivers].sort((a, b) => {
            if (!a.lastMessageTime) return 1; // Put users with no messages at the bottom
            if (!b.lastMessageTime) return -1;
            return b.lastMessageTime - a.lastMessageTime; // Sort by descending order of message time
        });

        setDrivers(sortedDrivers);
    }, [messages]);


    useEffect(() => {
        if (selecteddriver) {
            const unsubscribe = onSnapshot(collection(db, 'chatwithadmin', selecteddriver._id, 'messages'), (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added" && change.doc.data().type === "user") {
                        // Show browser notification for new user messages
                        showNotification("New Message", change.doc.data().message);
                        // toast.success("City added successfully");
                    }
                });
            });

            return () => unsubscribe();
        }
    }, [selecteddriver]);

    const showNotification = (title, body) => {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            console.error("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            // If it's okay, let's create a notification
            new Notification(title, { body });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    new Notification(title, { body });
                }
            });
        }
    };

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
            // console.log("hello", allMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };



    const fetchDriverData = useCallback(async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/driver?page=${page}&limit=${limit1}&search=${search}`, getAuthHeaders());
            const driverData = response?.data?.data?.docs;
            setTotalPages(response.data.data.totalPages);
            // console.log(usersData, "users")


            const updatedDriver = await Promise.all(driverData.map(async user => {
                const messagesRef = collection(db, 'chatwithadmin', user._id, 'messages');
                const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
                const querySnapshot = await getDocs(q);
                const lastMessageDoc = querySnapshot.docs[0];
                const lastMessage = lastMessageDoc ? lastMessageDoc.data().message : '';
                const lastMessageTime = lastMessageDoc ? lastMessageDoc.data().timestamp : null;

                return { ...user, lastMessage, lastMessageTime };
            }));

            setDrivers(updatedDriver);
        } catch (error) {
            console.error('Error fetching driver data:', error);
        }
        finally {
            setLoading(false);
        };
    }, [page, limit1, search]);


    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setLoading(true);
    };


    const handleSearch = (event) => {
        setPage(1);
        setSearch(event.target.value);
    };

    const handleDriverClick = (driver) => {
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


    const formatTimestamp = (timestamp) => {
        if (!timestamp) return ''; // Handle case where timestamp is null or undefined

        // Convert Firestore Timestamp to Date object
        const date = timestamp.toDate();

        // Get current date
        const currentDate = new Date();

        // Calculate time difference in milliseconds
        const timeDifference = currentDate - date;
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        if (timeDifference < oneDayInMilliseconds) {
            // If message was sent today or yesterday, show time
            return formatTime(date);
        } else {
            // Otherwise, show date
            return formatDate(date);
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        // Format date as DD/MM/YYYY (adjust based on your locale)
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
                                />
                            </div>


                            <div className='livechart6' >
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading drivers...</td>
                                    </tr>
                                ) : drivers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Drivers not found</td>
                                    </tr>
                                ) : (drivers.map(driver => (
                                    <div className='livechart7' key={driver?.id} onClick={() => handleDriverClick(driver)}>
                                        <div className='livechart8'>
                                            <div className='livechart852'>
                                                <img src={driver?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                            </div>
                                            <div className='livechart9'>
                                                <h6>{driver?.name || "User"}</h6>
                                                <p>{driver?.lastMessage}</p>
                                            </div>
                                        </div>
                                        <div className='livechart10'>
                                            <p>{formatTimestamp(driver?.lastMessageTime)}</p>
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
                                                        {/* <img src={message.image} alt="" /> */}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className='livechart21'>
                                                    <div className={`${message.type === 'driver' ? 'livechart22' : 'livechart23'}`}><p>{message.message}</p></div>
                                                </div>
                                                {message.type === 'admin' ? (
                                                    <div className='livechart20'>
                                                        {/* <img src={message.image} alt="" /> */}
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
                <div className='rider_details555'>
                    <CustomPagination
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div >
        </>
    )
}

export default HOC(LiveChartWithDriver)