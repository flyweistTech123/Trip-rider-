import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './LiveChart.css'
import HOC from '../../Components/HOC/HOC'
import { IoIosArrowDown } from "react-icons/io";
import plus from '../../Images/Vector.png'
import chat from '../../Images/chat.png'
import share from '../../Images/share.png'
import send from '../../Images/send.png'
import { collection, query, orderBy, getDocs, limit, addDoc } from 'firebase/firestore';
import { db, auth } from "../../Components/Firebase/Firebase";

import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import axios from 'axios';



const LiveChart = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [totalNewMessages, setTotalNewMessages] = useState(0); // State to track total new messages


    useEffect(() => {
        if (selectedUser) {
            fetchMessages();
        }
    }, [selectedUser, messages]);

    useEffect(() => {
        fetchRiderData();
        fetchAdminData();
    }, []);
    useEffect(() => {
        const totalNewMsg = messages.filter(msg => !msg.read).length;
        setTotalNewMessages(totalNewMsg);
    }, [messages]);

    const fetchAdminData = async () => {
        try {
            // const token = localStorage.getItem("token"); 
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
            if (!selectedUser || !selectedUser._id) return;

            // Fetch messages based on the selected user
            console.log(selectedUser._id)
            const messagesRef = collection(db, 'chatwithadmin', selectedUser._id, 'messages');
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

    const fetchRiderData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/admin/all/user`, getAuthHeaders());
            const usersData = response.data.category;

            // Fetch and attach last message for each user from Firebase
            const usersWithLastMessage = await Promise.all(usersData.map(async user => {
                const messagesRef = collection(db, 'chatwithadmin', user._id, 'messages');
                const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
                const querySnapshot = await getDocs(q);
                const lastMessageDoc = querySnapshot.docs[0];
                const lastMessage = lastMessageDoc ? lastMessageDoc.data().message : ''; // Get last message or empty string if no message
                return { ...user, lastMessage };
            }));

            setUsers(usersWithLastMessage);
        } catch (error) {
            console.error('Error fetching rider data:', error);
        }
    };


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






    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Live Chat</h6>
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

                                <div className='livechart4'>
                                    <img src={plus} alt="" />
                                </div>
                            </div>

                            <div className='livechart6'>
                                <hr />
                            </div>

                            <div className='livechart5'>
                                <input type="search" placeholder='Search messages' />
                            </div>


                            <div className='livechart6' >
                                {users.map(user => (
                                    <div className='livechart7' key={user.id} onClick={() => handleUserClick(user)}>
                                        <div className='livechart8'>
                                            <div className='livechart852'>
                                                <img src={user.profilePicture} alt="" />
                                            </div>
                                            <div className='livechart9'>
                                                <h6>{user.name}</h6>
                                                <p>{user.lastMessage}<span>🔥</span></p>
                                            </div>
                                        </div>
                                        <div className='livechart10'>
                                            <p>12m</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className='livechart11'>
                            <div className='livechart12'>
                                {selectedUser && (
                                    <div className='livechart13'>
                                        <div className='livechart14'>
                                            <img src={selectedUser.profilePicture} alt="" />
                                        </div>
                                        <div className='livechart15'>
                                            <h6>{selectedUser.name}</h6>
                                            <div className='livechart16'>
                                                <div className='livechart17'></div>
                                                <p>Online</p>
                                            </div>
                                        </div>
                                    </div>
                                )}



                                <div className='livechart18'>
                                    {messages.map(message => (
                                        <div className={`${message.type === 'user' ? 'livechart19' : 'livechart24'}`} key={message.id}>
                                            {message.type === 'user' ? (
                                                <div className='livechart20'>
                                                    <img src={message.image} alt="" />
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className='livechart21'>
                                                <div className={`${message.type === 'user' ? 'livechart22' : 'livechart23'}`}><p>{message.message}</p></div>
                                            </div>
                                            {message.type === 'admin' ? (
                                                <div className='livechart20'>
                                                    <img src={message.image} alt="" />
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className='livechart25'>
                                    <div className='livechart26'>
                                        <div className='livechart27'>
                                            <img src={share} alt="" />
                                        </div>
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
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(LiveChart)