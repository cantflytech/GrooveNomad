import React from 'react';
import ChatBot from './ChatBot';

export default function PageWrapper({ children }) {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}
