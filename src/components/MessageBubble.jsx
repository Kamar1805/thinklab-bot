import React from 'react';
import './ChatWidget.css'; // Using same styles for consistency

const MessageBubble = ({ sender, text }) => {
  return (
    <div className={`chat-bubble ${sender}`}>
      {text}
    </div>
  );
};

export default MessageBubble;
