import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import chatbotAnimation from '../assets/chatbot.json'; 

const ChatAvatar = () => {
  return (
    <div className="flex items-center justify-center">
      <Player
        autoplay
        loop
        src={chatbotAnimation}
        style={{ height: '100px', width: '100px' }}
      />
    </div>
  );
};

export default ChatAvatar;
