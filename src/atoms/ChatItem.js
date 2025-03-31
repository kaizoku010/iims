import React from 'react';
import "./ChatItem.css"

const MessageListItem = ({ message, sender }) => {
  return (
    <div className={`message ${sender} holder`}>
      {sender === 'user' ? (
        <p className='user-chat-title'>User</p>
      ) : (
        <p className='bot-chat-title'>Narrow AI</p>
      )}
      <p className='msg-text'>{message}</p>
    </div>
  );
};

export default MessageListItem;
