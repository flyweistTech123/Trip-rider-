import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './LiveChart.css'
import HOC from '../../Components/HOC/HOC'
import { IoIosArrowDown } from "react-icons/io";
import plus from '../../Images/Vector.png'
import chat from '../../Images/chat.png'
import share from '../../Images/share.png'
import send from '../../Images/send.png'
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    orderBy,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db, auth } from "../../Components/Firebase/Firebase";



const LiveChart = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Create a reference to the messages collection
                
                const messagesRef = collection(db, 'chatwithadmin', '660d244d36c7dbb1fcae541f', 'messages');

                // Create a query to order messages by timestamp in descending order
                const q = query(messagesRef, orderBy('timestamp', 'desc'));

                // Fetch the documents based on the query
                const querySnapshot = await getDocs(q);

                // Process the query snapshot and extract document data
                const allMessages = [];
                querySnapshot.forEach(doc => {
                    allMessages.push({ id: doc.id, ...doc.data() });
                });

                // Set the fetched messages in state
                setMessages(allMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        // Call the fetchMessages function
        fetchMessages();
    }, ['660d244d36c7dbb1fcae541f']); //

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
                                    <p>12</p>
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

                            {messages.map(message => (
                                <div className='livechart6' key={message.id}>
                                    <div className='livechart7'>
                                        <div className='livechart8'>
                                            <div className='livechart852'>
                                                <img src={chat} alt="" />
                                            </div>
                                            <div className='livechart9'>
                                                <h6>{message.name}</h6>
                                                <p>Haha oh man<span>🔥</span></p>
                                            </div>
                                        </div>
                                        <div className='livechart10'>
                                            <p>12m</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                        <div className='livechart11'>
                            <div className='livechart12'>
                                <div className='livechart13'>
                                    <div className='livechart14'>
                                        <img src={chat} alt="" />
                                    </div>
                                    <div className='livechart15'>
                                        <h6>Florencio Dorrance</h6>
                                        <div className='livechart16'>
                                            <div className='livechart17'></div>
                                            <p>Online</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='livechart18'>
                                    <div className='livechart19'>
                                        <div className='livechart20'>
                                            <img src={chat} alt="" />
                                        </div>
                                        <div className='livechart21'>
                                            <div className='livechart22'><p>omg, this is amazing</p></div>
                                            <div className='livechart22'><p>perfect! ✅</p></div>
                                            <div className='livechart22'><p>Wow, this is really epic</p></div>
                                        </div>
                                    </div>

                                    <div className='livechart24'>
                                        <div className='livechart21'>
                                            <div className='livechart23'><p>How are you?</p></div>
                                        </div>
                                        <div className='livechart20'>
                                            <img src={chat} alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className='livechart25'>
                                    <div className='livechart26'>
                                        <div className='livechart27'>
                                            <img src={share} alt="" />
                                        </div>
                                        <div className='livechart28'>
                                            <input type="text" placeholder='Type a message' />
                                            <img src={send} alt="" />
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