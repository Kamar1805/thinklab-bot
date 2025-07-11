// ✅ React ThinkLab Bot Chat Widget - Upgraded UI

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatWidget.css';
import logo from './thinklab-logo.png'; // Add your logo to /src/components/

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I’m ThinkLab Bot. Ask me anything about ThinkLab Group.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(
        'https://23ae887b-f1ac-442d-b2d0-0a6e75c0771a-00-1xssic8hb4mg4.spock.replit.dev/chat',
        { message: userInput }
      );
      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Sorry, something went wrong. Please try again.' }]);
    } finally {
      setUserInput('');
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <div className="chat-icon" onClick={toggleChat}>💬</div>

      {isOpen && (
        <div className={`chat-box ${darkMode ? 'dark' : ''}`}>
          <div className="chat-header">
            <img src={logo} alt="ThinkLab Logo" className="logo" />
            <span className="title">ThinkLab Bot</span>
            <div className="actions">
              <button onClick={toggleDarkMode} title="Toggle dark mode">🌓</button>
              <span onClick={toggleChat}>&times;</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.sender}`}>
                {msg.sender === 'bot' && <span className="bot-avatar">🤖</span>}
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-bubble bot">ThinkLab Bot is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
