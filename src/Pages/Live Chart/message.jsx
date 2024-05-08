// // ChatComponent.js
// import React, { useState, useEffect } from 'react';
// import { db } from "../../Components/Firebase/Firebase";

// function ChatComponent({ userID }) {
//   const [adminMessages, setAdminMessages] = useState([]);
//   const [isChatLoading, setIsChatLoading] = useState(false);

//   useEffect(() => {
//     const unsubscribe = db
//       .collection('chatwithadmin')
//       .doc(userID)
//       .collection('messages')
//       .orderBy('timestamp', 'desc')
//       .onSnapshot(snapshot => {
//         setIsChatLoading(true);
//         const messages = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setAdminMessages(messages);
//         setIsChatLoading(false);
//       });

//     return () => unsubscribe();
//   }, [userID]);

//   const sendAdminMessage = async (message, userData) => {
//     setIsChatLoading(true);
//     await db
//       .collection('chatwithadmin')
//       .doc(userData.sId)
//       .collection('messages')
//       .add({
//         message: message,
//         timestamp: new Date(),
//         type: 'user',
//         name: userData.name,
//         image: userData.profilePicture,
//       });
//     setIsChatLoading(false);
//   };

//   return (
//     <div>
//       {/* Render chat messages */}
//       {isChatLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {adminMessages.map(message => (
//             <li key={message.id}>
//               <p>{message.name}</p>
//               <p>{message.message}</p>
//               <p>{new Date(message.timestamp.seconds * 1000).toString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Input form to send messages */}
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           const message = e.target.message.value;
//           sendAdminMessage(message, { sId: userID, name: 'User', profilePicture: 'URL' });
//           e.target.reset();
//         }}
//       >
//         <input type="text" name="message" required />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default ChatComponent;
