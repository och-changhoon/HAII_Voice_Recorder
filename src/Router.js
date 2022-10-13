import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Play } from './pages/Play/Play';
import { Record } from './pages/Record/Record';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/play" element={<Play />} />
        <Route path="/" element={<Record />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
