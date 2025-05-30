import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Clock, Trash2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { AIMessage } from '../types'; // Ensure AIMessage type has { id, sender, content, timestamp }

const AICounselor = () => {
  const { user, assessment } = useUser();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How do I prepare for a job interview?",
    "What skills should I develop for a career in tech?",
    "Should I pursue further education?",
    "How do I negotiate salary?",
    "How can I improve my resume?"
  ];

  useEffect(() => {
    if (messages.length === 0) {
      fetchInitialMessage();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchInitialMessage = async () => {
    setIsTyping(true);
    try {
      const response = await fetch('http://localhost:3000/api/mentorbotics-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'initialize chat' })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const aiMessage: AIMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        content: data.html,
        timestamp: new Date()
      };
      setMessages([aiMessage]);
    } catch (error) {
      console.error("Initial AI message error:", error);
      setMessages([{
        id: Date.now().toString(),
        sender: 'ai',
        content: "Oops! I can't connect right now. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (customContent?: string) => {
    const content = customContent ?? input;
    if (!content.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:3000/api/mentorbotics-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const aiMessage: AIMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        content: data.html,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI message error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        content: "Something went wrong. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearConversation = async () => {
    try {
      const response = await fetch('https://mentor-botics.vercel.app/api/mentorbotics-clear-chat', {
        method: 'POST'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setMessages([]);
      await fetchInitialMessage();
    } catch (error) {
      console.error("Clear chat error:", error);
      alert("Failed to clear chat. Please try again.");
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(timestamp));
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-12rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Career Counselor</h1>
        <p className="mt-2 text-gray-600">Ask anything about your career, and I'll help you out.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md h-[calc(100%-4rem)] flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary-100 text-primary-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="ml-2 text-lg font-medium text-gray-900">Career Assistant</h2>
          </div>
          <button
            onClick={clearConversation}
            className="text-gray-500 hover:text-gray-700"
            title="Clear conversation"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative max-w-xl px-4 py-3 rounded-lg shadow-sm ${
                msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}>
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                <div className={`text-xs mt-1 flex items-center ${
                  msg.sender === 'user' ? 'text-primary-100 justify-end' : 'text-gray-500 justify-end'
                }`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimestamp(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-lg shadow-sm bg-gray-100 text-gray-800">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && messages[0]?.sender === 'ai' && (
          <div className="p-4 border-t bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Questions</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isTyping}
            className={`ml-2 p-2 rounded-full transition ${
              !input.trim() || isTyping
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICounselor;
