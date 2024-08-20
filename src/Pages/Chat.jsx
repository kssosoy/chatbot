import React, { useState } from 'react';
import './Chat.css';
import aiIcon from '../assets/ai.png';  // 이미지 파일을 import
import send from '../assets/image.png';

export default function Chat() {
  const questions = [
    '도움이 필요하신가요?',
    '사람들은 요즘 지구가 멸망하면 무엇을 해야 할지에 대한 질문을 많이 해요.',
    '매미처럼 맴맴맴 울라고 대답합니다.'
  ];

  const [messages, setMessages] = useState([{ sender: 'AI', text: questions[0] }]);
  const [userInput, setUserInput] = useState('');
  const [step, setStep] = useState(1); // 질문 단계
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages([...messages, { sender: 'user', text: userInput }]);
      setUserInput('');

      // 기존 로직: 마지막 질문 이후 로딩 애니메이션 표시
      if (step < questions.length) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'AI', text: questions[step] }
          ]);
          setStep(step + 1);
        }, 1000);
      } else {
        setLoading(true); // 마지막 질문 이후 로딩 상태 활성화

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'AI', text: 'loading' } // AI 로딩 메시지 추가
          ]);
        }, 1000);
      }
    }
  };

  const handleMoreButtonClick = () => {
    // ... 버튼을 누르면 추가적인 로딩 애니메이션 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'AI', text: 'loading' } // AI 로딩 메시지 추가
    ]);

    
  };

  return (
    <div className="chat-container">
      <header>
        <button className="back-button">←</button>
        <h2>인공지능과 대화하기</h2>
      </header>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'AI' ? 'ai' : 'user'}`}
          >
            {message.sender === 'AI' && (
              <div className="avatar">
                <img src={aiIcon} alt="AI" /> {/* AI 이미지 */}
              </div>
            )}
            <div className="text">
              {message.text === 'loading' ? (
                <div className="loading-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
      </div>

      <footer>
        <button className="more-button" onClick={handleMoreButtonClick}>...</button>
        <div className="input-container">
          <input
            type="text"
            placeholder="무엇이든 물어보세요!"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-button" onClick={handleSendMessage}>
            <img src={send} />
          </button>
        </div>
      </footer>
    </div>
  );
}
