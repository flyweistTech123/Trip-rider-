import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './LiveChart.css'
import HOC from '../../Components/HOC/HOC'
import { collection, query, orderBy, getDocs, limit, addDoc } from 'firebase/firestore';
import { db } from "../../Components/Firebase/Firebase";
import { useNavigate } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-bootstrap/Pagination';



import img2 from '../../Images/user.webp'
import send from '../../Images/send.png'

import { IoIosArrowDown } from "react-icons/io";


const LiveChart = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [totalNewMessages, setTotalNewMessages] = useState(0); // State to track total new messages
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);


    const messageContainerRef = useRef(null);



    useEffect(() => {
        if (selectedUser) {
            fetchMessages();
        }
        scrollToBottom();
    }, [selectedUser, messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        fetchuserData();
        fetchAdminData();
    }, []);



    useEffect(() => {
        const totalNewMsg = messages.filter(msg => !msg.read && msg.type === 'user').length;
        setTotalNewMessages(totalNewMsg);
        const sortedUsers = [...users].sort((a, b) => {
            if (!a.lastMessageTime) return 1; // Put users with no messages at the bottom
            if (!b.lastMessageTime) return -1;
            return b.lastMessageTime - a.lastMessageTime; // Sort by descending order of message time
        });

        setUsers(sortedUsers);
    }, [messages])

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
        try {
            if (!selectedUser || !selectedUser._id) return;
            const messagesRef = collection(db, 'chatwithadmin', selectedUser._id, 'messages');
            const q = query(messagesRef, orderBy('timestamp', 'asc'));
            const querySnapshot = await getDocs(q);

            const allMessages = [];
            
            querySnapshot.forEach(doc => {
                allMessages.push({ id: doc.id, ...doc.data() });
            });

            // console.log('allMessages', "message ")

            if (allMessages.length > messages.length) {
                const newMessages = allMessages.filter(msg => !msg.read && msg.type === 'user');
                console.log(newMessages, "update")
                if (newMessages.length > 0) {
                    // toast.success("New message");
                }
            }

            setMessages(allMessages);
            // console.log("Messages fetched: ", allMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    const fetchuserData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/user?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders());
            const usersData = response?.data?.data?.docs;
            setTotalPages(response.data.data.totalPages);


            const updatedUsers = await Promise.all(usersData.map(async user => {
                const messagesRef = collection(db, 'chatwithadmin', user._id, 'messages');
                const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
                const querySnapshot = await getDocs(q);
                const lastMessageDoc = querySnapshot.docs[0];
                const lastMessage = lastMessageDoc ? lastMessageDoc.data().message : '';
                const lastMessageTime = lastMessageDoc ? lastMessageDoc.data().timestamp : null;

                return { ...user, lastMessage, lastMessageTime };
            }));

            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        finally {
            setLoading(false);
        };
    };


    


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUserData = users.filter(user =>
        user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };


    const handleSendMessage = async () => {
        if (!selectedUser || !newMessage.trim()) return;

        try {
            // Add the new message to Firebase
            const messagesRef = collection(db, 'chatwithadmin', selectedUser._id, 'messages');
            const newMessageDoc = {
                message: newMessage,
                type: 'admin',
                image: image,
                name: name, // You can replace 'Admin' with the actual admin name
                timestamp: new Date()
            };
            await addDoc(messagesRef, newMessageDoc);

            // Update local state with the new message
            setMessages(prevMessages => [newMessageDoc, ...prevMessages]);

            // Clear the input field after sending the message
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
                            <h6>Live Chat User</h6>
                        </div>
                        <div className='rider4'>
                            <button onClick={() => navigate('/liveChartWithDriver')}>Chat with driver</button>
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
                            </div>

                            <div className='livechart6'>
                                <hr />
                            </div>

                            <div className='livechart5'>
                                <input type="search" placeholder='Search user'
                                    onChange={handleSearch}
                                    value={searchQuery}
                                />
                            </div>


                            <div className='livechart6' >
                                {loading ? (
                                    <tr>
                                        <td style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading users...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredUserData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>User not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredUserData.map(user => (
                                                <div className='livechart7' key={user._id} onClick={() => handleUserClick(user)}>
                                                    <div className='livechart8'>
                                                        <div className='livechart852'>
                                                            <img src={user?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                        </div>
                                                        <div className='livechart9'>
                                                            <h6>{user?.name || "User"}</h6>
                                                            <p>{user?.lastMessage}</p>
                                                        </div>
                                                    </div>
                                                    <div className='livechart10'>
                                                        <p>{formatTimestamp(user?.lastMessageTime)}</p>
                                                    </div>
                                                </div>
                                            ))
                                            : users.map(user => (
                                                <div className='livechart7' key={user._id} onClick={() => handleUserClick(user)}>
                                                    <div className='livechart8'>
                                                        <div className='livechart852'>
                                                            <img src={user?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                        </div>
                                                        <div className='livechart9'>
                                                            <h6>{user?.name || "User"}</h6>
                                                            <p>{user?.lastMessage}</p>
                                                        </div>
                                                    </div>
                                                    <div className='livechart10'>
                                                        <p>{formatTimestamp(user?.lastMessageTime)}</p>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                            </div>

                        </div>

                        <div className='livechart11'>
                            {messages.length === 0 || !selectedUser ? (
                                <div className='no-messages'>
                                    <h6> Please select a user to view messages.</h6>
                                </div>
                            ) : (
                                <div className='livechart12'>
                                    {selectedUser && (
                                        <div className='livechart13'>
                                            <div className='livechart14'>
                                                <img src={selectedUser?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                            </div>
                                            <div className='livechart15'>
                                                <h6>{selectedUser.name}</h6>
                                            </div>
                                        </div>
                                    )}



                                    <div className='livechart18' ref={messageContainerRef}>
                                        {messages.map(message => (
                                            <div className={`${message.type === 'user' ? 'livechart19' : 'livechart24'}`} key={message.id}>
                                                {message.type === 'user' ? (
                                                    <div className='livechart20'>
                                                        {/* <img src={message.image} alt="" /> */}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className='livechart21'>
                                                    <div className={`${message.type === 'user' ? 'livechart22' : 'livechart23'}`}><p>{message.message}</p></div>
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
            </div >
        </>
    )
}

export default HOC(LiveChart)