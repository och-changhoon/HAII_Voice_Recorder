import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioRecorder } from './pages/AudioRecorder/AudioRecorder';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AudioRecorder />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
