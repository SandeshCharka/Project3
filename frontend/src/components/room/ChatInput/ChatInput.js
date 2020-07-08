import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.scss';

const ChatInput = ({ onSend }) => {
  const textareaEl = useRef(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    // console.log('handleChange', e);

    const message = e.target.value.trim();
    setMessage(message);
  };

  const handleKeyDown = (e) => {
    // console.log('handleKeyDown', e);
    const ENTER = e.key === 'Enter';
    const SHIFT = e.shiftKey;

    if (ENTER && !SHIFT) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSubmit = (e) => {
    console.log('handleSubmit', e);
    e.preventDefault();
    handleSend();
  };

  const handleSend = () => {
    if (message) {
      onSend(message);
    }
    handleReset();
  };

  const handleReset = () => {
    textareaEl.current.value = '';
    setMessage(null);
  };

  return (
    <form id="chat-form" method="post" action="/message" onSubmit={handleSubmit}>
      <textarea
        name="message"
        placeholder="Type message"
        maxLength="200"
        ref={textareaEl}
        onChange={handleChange}
        onKeyPress={handleKeyDown}
      />
      <button type="submit" className={message ? 'active' : ''}>
        <i className="material-icons">send</i>
      </button>
    </form>
  );
};

export default ChatInput;
