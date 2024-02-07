/*
import React, { useState } from 'react';

const ChatMessage = ({ isUser, text }) => (
  <div style={{ textAlign: isUser ? 'right' : 'left', margin: '10px' }}>
    <div style={{ background: isUser ? '#5bc0de' : '#d3d3d3', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
      {text}
    </div>
  </div>
);

const FakeChat = () => {
  const [messages, setMessages] = useState([
    { isUser: false, text: 'Hello! How can I help you?' },
    { isUser: true, text: 'Hi! I have a question.' },
    { isUser: false, text: 'Sure, go ahead and ask.' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, { isUser: true, text: newMessage }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} isUser={message.isUser} text={message.text} />
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export { FakeChat};
*/
/*
import React, { useState } from 'react';

const ChatMessage = ({ sender, text, time }) => (
  <div style={{ textAlign: 'left', margin: '10px' }}>
    <div style={{ background: '#d3d3d3', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
      <div style={{ marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>{sender}</div>
      <div>{text}</div>
      <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>{time}</div>
    </div>
  </div>
);

const FakeChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'Support', text: 'Hello! How can I help you?', time: '12:00 PM' },
    { sender: 'User', text: 'Hi! I have a question.', time: '12:05 PM' },
    { sender: 'Support', text: 'Sure, go ahead and ask.', time: '12:10 PM' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessages = [
        ...messages,
        { sender: 'User', text: newMessage, time: new Date().toLocaleTimeString() },
      ];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={message.text}
            time={message.time}
          />
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export { FakeChat};

*/



import React, { useState, useRef, useEffect } from 'react';
import API from '../API';



const ChatMessage = ({ sender, text }) => (
  <div className="message">
    <div className="message-box">
      <div className="sender-info">
        <i className="icon bi bi-person-fill"></i>
        {sender}
      </div>
      <div className="message-text">{text}</div>
    </div>
  </div>
);

const FakeChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const [posted,setposted]=useState(0);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const messaggiDB = await API.getChatMessage();
        setMessages(messaggiDB);
      } catch (error) {
        console.error("Errore durante il recupero dei messaggi:", error);
      }
    };
    
    fetchData();
  }
    
    ,[posted]);
    
  


  const  handleSendMessage =  (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessage =
        { sender: 'User', text: newMessage };
       API.sendChatMessage(updatedMessage);
      setNewMessage('');
      setposted(prev=>prev+1);
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="container-chat fixed-chat">
        <div className='community'>
            <p>Community</p>
        </div>
      <div ref={chatContainerRef} className="message-container">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={message.Text}
          />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="form-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {setNewMessage(e.target.value)}}
          className="input-box"
          placeholder="Type your message..."
        />
        <button type="submit" className="send-button">
        <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
};

export { FakeChat };

